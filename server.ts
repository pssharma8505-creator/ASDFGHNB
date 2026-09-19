import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization for Google GenAI SDK to prevent crash if GEMINI_API_KEY is undefined on boot
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security Hardening: Body limit protection against large payload DoS attacks
app.use(express.json({ limit: "500kb" }));

// Security Hardening Middleware: HTTP Defense Headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Content Security Policy (CSP)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https:; " +
    "frame-src 'self' https://maps.google.com https://drive.google.com; " +
    "media-src 'self' https://res.cloudinary.com blob:;"
  );

  next();
});

// Security Hardening: Application-Level Rate Limiter ("Firewall")
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function createRateLimiter(maxRequests = MAX_REQUESTS_PER_WINDOW) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    const record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({
        error: "Too many requests. Please wait a moment before sending more inquiries.",
      });
    }

    record.count += 1;
    next();
  };
}

// Input Sanitization Helper against XSS / injection attacks
function sanitizeString(str: any, maxLen = 1000): string {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .slice(0, maxLen)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Store temporary inquiry data in writable /tmp directory for container compatibility
const INQUIRIES_FILE = path.join(process.env.TMPDIR || "/tmp", "inquiries.json");

// Memory fallback store in case filesystem write is disabled
let memoryInquiries: any[] = [];

// Helper to read current inquiries
function readInquiries(): any[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      return JSON.parse(data || "[]");
    }
  } catch (error) {
    console.error("Error reading inquiries file", error);
  }
  return memoryInquiries;
}

// Helper to write current inquiries
function writeInquiries(inquiries: any[]) {
  memoryInquiries = inquiries;
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing inquiries file (falling back to memory)", error);
  }
}

// Ensure the inquiries file exists on startup safely
try {
  if (!fs.existsSync(INQUIRIES_FILE)) {
    writeInquiries([]);
  }
} catch (e) {
  console.warn("Could not check/create inquiries file at startup, using memory store", e);
}

// API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: Save Inquiry (Protected by Rate Limiter and Input Sanitization)
app.post("/api/inquiries", createRateLimiter(10), (req, res) => {
  try {
    const { name, companyName, productOrService, quantity, mobile, email, requirement, type, budget, projectDescription } = req.body;

    const cleanName = sanitizeString(name, 100);
    const cleanProductOrService = sanitizeString(productOrService, 200);
    const cleanMobile = sanitizeString(mobile, 50);
    const cleanEmail = sanitizeString(email, 100);

    if (!cleanName || !cleanProductOrService || !cleanMobile || !cleanEmail) {
      return res.status(400).json({ error: "Missing required fields: name, productOrService, mobile, email" });
    }

    const inquiries = readInquiries();
    const newInquiry = {
      id: "INQ-" + Date.now().toString().slice(-6),
      name: cleanName,
      companyName: sanitizeString(companyName, 150) || "N/A",
      productOrService: cleanProductOrService,
      quantity: sanitizeString(quantity, 20) || "1",
      mobile: cleanMobile,
      email: cleanEmail,
      requirement: sanitizeString(requirement, 2000) || "",
      type: sanitizeString(type, 50) || "standard",
      budget: budget ? sanitizeString(budget, 50) : null,
      projectDescription: sanitizeString(projectDescription, 2000) || "",
      status: "Received",
      createdAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    writeInquiries(inquiries);

    res.json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error. Failed to process inquiry." });
  }
});

// API: Fetch Inquiries
app.get("/api/inquiries", (req, res) => {
  try {
    const inquiries = readInquiries();
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
});

// API: Delete Inquiries
app.delete("/api/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = sanitizeString(id, 50);
    let inquiries = readInquiries();
    inquiries = inquiries.filter((inq: any) => inq.id !== cleanId);
    writeInquiries(inquiries);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete inquiry." });
  }
});

// API: Chat assistant using @google/genai (Protected by Rate Limiter)
app.post("/api/chat", createRateLimiter(10), async (req, res) => {
  try {
    const { message, history } = req.body;

    const cleanMessage = sanitizeString(message, 1500);

    if (!cleanMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const formattedHistory = (Array.isArray(history) ? history : []).slice(-10).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: sanitizeString(m.text, 1000) }],
    }));

    const ai = getGenAI();
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are the AI Engineering Expert Assistant for Eastern Alliance Automation LLP (EAA).
EAA is an ultra-premium industrial automation and engineering company founded in 2022 and based in Ghaziabad, India.
Your mission is to represent the brand's supreme industrial craftsmanship—combining Siemens precision, Schneider-electric reliability, and Apple/Tesla high-fidelity design standards.

Key Company Specifications to know:
- Founded: 2022
- Main Facility Address: Ghaziabad, Uttar Pradesh, India
- WhatsApp Live Contact: +91 9457585950
- Core Focus: Electrical Control Panels, Automation Systems, PLCs, AC/DC Industrial Drives, Servo Systems, stabilized power, commissioning Services.
- Partner/Integration Brands: Siemens, ABB, Parker, Danfoss, Schneider Electric, Control Techniques
- Trust Credentials: High Quality (100% QA Tested), Precision Engineering, Global Standards (IEC compliant), 24x7 Emergency Support.

Product Catalog Specifications:
1. AC DRIVE PANEL UPTO 1000 KW: Utilizes Siemens/ABB/Danfoss premium frequency converters. Fully ventilated IP54 customised enclosures, copper busbars, and comprehensive thermal modeling.
2. DC DRIVE PANEL UPTO 4000 AMP: High-current silicon-controlled rectifier (SCR) configurations for heavy manufacturing, rolling mills, and wire drawings.
3. MCC & PCC PANEL: Motor Control Centers and Power Control Centers. Form 4b separation, type-tested assembly, elegant terminal cabling access.
4. DISTRIBUTION PANEL: Intelligent electrical distribution boards with breaker status signaling and power quality telemetry.
5. SERVO VOLTAGE STABILIZER: High precison single/three phase air & oil-cooled linear control stabilizers with fast response times.
6. SERVICES & REPAIRING: Specialized field commissioning, preventative maintenance sweeps, and deep component reparability on high-capacity electronic cards.
7. ENGINEERING TOOLS & PRODUCTS: Customised process controller systems.
8. SPARES: Ready access to OEM contactors, overload relays, premium semiconductor fuses, and terminals.
9. PLC & CUSTOMISED CONTROL PANEL: Seamlessly combining customised PLC racks with modular electrical panel work.

Service Lines:
- Automation Systems Integration
- Custom PLC Programming (Siemens STEP7 / TIA Portal, Rockwell Studio 5000, Schneider EcoStruxure)
- SCADA and HMI panel engineering
- Variable Frequency Drive (VFD) & DC Commisioning
- Turnkey onsite installation work
- Engineering consultancy and facility speed auditing
- Legacy Industrial Automation Upgrades (migrating obsolete systems to modern high-reliability architecture)

Business Rules & Inquiries:
- Maintain Siemens-standard, high-reliability design and construction for all fabricated cabinets and engineering works of EAA.
- Give highly authoritative, detailed technical answers. Do not hesitate to describe the technical engineering terms (e.g. regenerative braking, harmonic distortion mitigators, busbar sizing, active harmonic filtering, etc.) so EAA looks extremely knowledgeable and competent.
- Boldly direct users to the 'Products', 'Inquiry Form', 'Custom Panel' sections, or invite them to submit an inquiry right inside our system, or contact our engineers via WhatsApp (+91 9457585950) if they want immediate human scheduling.
- Be concise but powerful. Keep responses elegant, structured, using bullet points for technical specs if needed. Do not output code blocks unless specific PLC/ladder logic queries are prompted. Always focus on premium professional execution.`,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message: cleanMessage });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini chatbot error:", error);
    res.status(500).json({ error: "Our industrial AI core is currently performing grid maintenance. Please utilize our direct WhatsApp channel (+91 9457585950) for live assistance." });
  }
});

// Handle Vite middleware inside server.ts for Express + Vite runtime
async function init() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Middlewares loaded for development (Vite).");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EAA Ultra-Premium Server listening at http://localhost:${PORT}`);
  });
}

init();

/*
RECOMMENDED DEPLOYMENT / HOSTING SECURITY CONFIGURATION:
1. Cloudflare WAF / AWS WAF: Enable Web Application Firewall for Layer 7 DDoS mitigation and bot detection.
2. NGINX Reverse Proxy: Configure rate limiting (`limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;`).
3. SSL/TLS: Enforce HTTPS using TLS 1.3 certificates (e.g. via Let's Encrypt / Certbot).
4. Environment Variables: Store GEMINI_API_KEY and secrets securely in host environment variables; never commit keys.
*/
