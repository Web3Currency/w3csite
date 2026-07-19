import { contact } from "./contact";

/**
 * Generates a WhatsApp URL with a prefilled, url-encoded message to our centralized phone number
 */
export function getWhatsAppLink(message?: string): string {
  const baseNum = contact.whatsappNumber;
  if (!message) {
    return `https://wa.me/${baseNum}`;
  }
  return `https://wa.me/${baseNum}?text=${encodeURIComponent(message)}`;
}

export const prefilledMessages = {
  general: "Hi JAKE, I saw W3C Digital Network and I'd like to ask a question.",
  consulting: "Hi JAKE, I'm interested in Digital Consulting and Strategy. Let's connect.",
  p2p: (type: "BUY" | "SELL" | string, amount: string, asset: string) => {
    const formattedAmount = amount ? amount : "[Enter Amount]";
    return `Hi JAKE, I'd like to ${type} ${formattedAmount} ${asset} through the W3C DESK. Can I get your current rate?`;
  },
  webDev: (type?: string) => {
    const typeStr = type ? ` for a ${type}` : "";
    return `Hi JAKE, I'd like to build a website${typeStr} for my business. Can we talk about it?`;
  },
  community: "Hi JAKE, I'd like to join the W3C Web3 learning community on WhatsApp.",
  businessEssentials: (serviceName: string) => {
    return `Hi JAKE, I'm interested in the Business Essentials add-on: ${serviceName}. Can you give me more details?`;
  }
};
