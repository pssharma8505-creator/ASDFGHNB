import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import ProductSection from "./components/ProductSection";
import CustomPanelSection from "./components/CustomPanelSection";
import OrderSection from "./components/OrderSection";
import AboutExpertise from "./components/AboutExpertise";
import AboutOwners from "./components/AboutOwners";
import IndustriesSection from "./components/IndustriesSection";
import ContactSection from "./components/ContactSection";
import Chatbot from "./components/Chatbot";
import InquiryViewer from "./components/InquiryViewer";
import Footer from "./components/Footer";
import GalleryPage from "./components/GalleryPage";
import DynamicIsland from "./components/DynamicIsland";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeRipple } from "./components/ThemeRipple";
import { Zap, MessageSquare, ArrowUp } from "lucide-react";

function MainApp() {
  const [currentPage, setCurrentPage] = useState<"home" | "gallery">("home");
  const [activeSection, setActiveSection] = useState("home");
  const [preselectedItem, setPreselectedItem] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const animateScrollTo = useCallback((targetY: number, duration: number = 750) => {
    const startY = window.scrollY || window.pageYOffset;
    const difference = targetY - startY;
    if (difference === 0) return;
    
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
      }
    };

    requestAnimationFrame(step);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (id === "gallery_page") {
      setCurrentPage("gallery");
      animateScrollTo(0, 600);
      setActiveSection("gallery_page");
      return;
    }

    if (id === "home") {
      if (currentPage !== "home") {
        setCurrentPage("home");
      }
      animateScrollTo(0, 750);
      setActiveSection("home");
      return;
    }

    if (currentPage !== "home") {
      setCurrentPage("home");
      setActiveSection(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          animateScrollTo(offsetPosition, 850);
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        animateScrollTo(offsetPosition, 750);
      }
    }
  }, [currentPage, animateScrollTo]);

  useEffect(() => {
    let lastScrollTime = 0;
    let frameId: number | null = null;

    const handleScroll = () => {
      const now = Date.now();
      
      const currentScrollY = window.scrollY;
      if (currentScrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (currentPage !== "home") {
        setActiveSection("gallery_page");
        return;
      }

      if (now - lastScrollTime >= 100) {
        lastScrollTime = now;
        
        if (frameId) {
          cancelAnimationFrame(frameId);
        }

        frameId = requestAnimationFrame(() => {
          const sections = [
            "home",
            "services",
            "products",
            "custom-control-panel",
            "order",
            "about-us",
            "contact-us",
          ];
          
          const scrollPosition = window.scrollY + 220;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [currentPage]);

  const handleOrderProduct = (productName: string) => {
    setPreselectedItem(productName);
    scrollToSection("order");
  };

  const handleQuoteService = (serviceName: string) => {
    setPreselectedItem(serviceName);
    scrollToSection("order");
  };

  return (
    <div className="bg-[#fbfbfd] text-slate-900 min-h-screen font-sans transition-colors duration-300 overflow-x-hidden selection:bg-slate-200">
      <ThemeRipple />

      {/* Dynamic SEO JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Eastern Alliance Automation LLP",
          "image": "https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-5-scaled.jpg",
          "telephone": "+91-9457585950",
          "email": "info@easternallianceautomation.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kh. No. 2563, Gausala Road, Indraprastha Marg, near Metro Power House, Karhera colony, Mohan Nagar",
            "addressLocality": "Ghaziabad",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "201007",
            "addressCountry": "IN"
          },
          "foundingDate": "2022",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "28.6692",
            "longitude": "77.4538"
          },
          "url": "https://easternallianceautomation.in",
          "sameAs": [
            "https://www.linkedin.com/company/eastern-alliance-automation",
            "https://www.facebook.com/easternallianceautomation"
          ],
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "knowsAbout": [
            "Industrial Automation Systems",
            "PLC Programing",
            "AC Drives 1000KW",
            "MCC PCC Panel boards",
            "Servo Stabilization"
          ]
        })}
      </script>

      {/* Main sticky navigation bar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {currentPage === "home" ? (
        <>
          {/* Hero section */}
          <Hero scrollToSection={scrollToSection} />

          {/* Main Business Services and Capabilities */}
          <ServicesSection onQuoteService={handleQuoteService} />

          {/* High precision dynamic products catalog */}
          <ProductSection
            onOrderProduct={handleOrderProduct}
            onViewGallery={() => {
              setCurrentPage("gallery");
              window.scrollTo({ top: 0, behavior: "instant" });
              setActiveSection("gallery_page");
            }}
          />

          {/* Dedicated enterprise custom panel design studio */}
          <CustomPanelSection />

          {/* Standard client inquiry submission system */}
          <OrderSection preselectedItem={preselectedItem} />

          {/* Corporate profile and authorized partner credentials */}
          <AboutExpertise />

          {/* About owners section */}
          <AboutOwners />

          {/* Market sectors and target industrial domains */}
          <IndustriesSection />

          {/* Live Active Database Terminal */}
          <InquiryViewer />

          {/* Embedded Google mapping and queries center */}
          <ContactSection />
        </>
      ) : (
        <GalleryPage
          onBackToHome={() => {
            setCurrentPage("home");
            setActiveSection("home");
          }}
        />
      )}

      {/* Complete Footer Links matrices */}
      <Footer scrollToSection={scrollToSection} />

      {/* AI Assistance module connected directly to Gemini on the server-side */}
      <Chatbot />

      {/* Interactive fluid Dynamic Island at the bottom center */}
      <DynamicIsland scrollToSection={scrollToSection} currentPage={currentPage} />

      {/* Sticky floating CTAs */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col space-y-3" id="sticky-floating-ctas">
        <a
          href="https://wa.me/919457585950"
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
          title="Direct talk to Sales Head"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
        </a>
        
        <button
          onClick={() => scrollToSection("custom-control-panel")}
          className="p-3.5 rounded-full bg-slate-900 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Consult custom assembly calculator"
        >
          <Zap className="w-5 h-5 text-amber-400 fill-current animate-pulse" />
        </button>
      </div>

      {/* Scroll to Top floating shortcut */}
      {showScrollTop && (
        <button
          onClick={() => animateScrollTo(0, 600)}
          className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          id="sticky-scroll-top-button"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4.5 h-4.5 font-bold" />
        </button>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
