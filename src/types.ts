export interface Product {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  features: string[];
  applications: string[];
  specifications: Record<string, string>;
  industriesServed: string[];
  benefits: string[];
  category: "panel" | "drive" | "stabilizer" | "service" | "spares";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  industriesServed: string[];
}

export interface Inquiry {
  id?: string;
  name: string;
  companyName?: string;
  productOrService: string;
  quantity: string;
  mobile: string;
  email: string;
  requirement?: string;
  type?: "standard" | "custom_panel";
  budget?: string;
  projectDescription?: string;
  status?: string;
  createdAt?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}
