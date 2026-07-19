export interface ThemeConfig {
  colors: {
    primary: string;
    primaryRgb: string;
    background: string;
    surface: string;
    border: string;
    whatsapp: string;
    whatsappHover: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  transitions: {
    default: string;
    slow: string;
    fast: string;
  };
}

export const theme: ThemeConfig = {
  colors: {
    primary: "#a855f7", // Purple 500
    primaryRgb: "168, 85, 247",
    background: "#000000",
    surface: "#09090b", // Zinc 950
    border: "rgba(255, 255, 255, 0.08)",
    whatsapp: "#25D366",
    whatsappHover: "#20c05a"
  },
  borderRadius: {
    small: "0.375rem", // 6px
    medium: "0.75rem",  // 12px
    large: "1.5rem",    // 24px
    full: "9999px"
  },
  transitions: {
    default: "all 0.3s ease",
    slow: "all 0.5s ease",
    fast: "all 0.15s ease"
  }
};

export interface ServiceBrandColor {
  name: string;
  hex: string;
  colorName: string;
  twText: string;
  twBg: string;
  twBorder: string;
  twDot: string;
  twBorderHover: string;
  twBgHover: string;
  twTextHover: string;
  twBorderFocus: string;
  twRingFocus: string;
  twShadow: string;
}

export const serviceBrandColors = {
  desk: {
    name: "W3C DESK",
    hex: "#F97316",
    colorName: "orange",
    twText: "text-[#F97316]",
    twBg: "bg-[#F97316]/10",
    twBorder: "border-[#F97316]/20",
    twDot: "bg-[#F97316]",
    twBorderHover: "hover:border-[#F97316]/40",
    twBgHover: "hover:bg-[#F97316]/20",
    twTextHover: "group-hover:text-[#F97316]",
    twBorderFocus: "focus:border-[#F97316]/50",
    twRingFocus: "focus:ring-[#F97316]/50",
    twShadow: "shadow-[#F97316]/25",
  },
  webDev: {
    name: "Website Design & Development",
    hex: "#FACC15",
    colorName: "yellow",
    twText: "text-[#FACC15]",
    twBg: "bg-[#FACC15]/10",
    twBorder: "border-[#FACC15]/20",
    twDot: "bg-[#FACC15]",
    twBorderHover: "hover:border-[#FACC15]/40",
    twBgHover: "hover:bg-[#FACC15]/20",
    twTextHover: "group-hover:text-[#FACC15]",
    twBorderFocus: "focus:border-[#FACC15]/50",
    twRingFocus: "focus:ring-[#FACC15]/50",
    twShadow: "shadow-[#FACC15]/25",
  },
  consulting: {
    name: "Digital Consulting",
    hex: "#22C55E",
    colorName: "green",
    twText: "text-[#22C55E]",
    twBg: "bg-[#22C55E]/10",
    twBorder: "border-[#22C55E]/20",
    twDot: "bg-[#22C55E]",
    twBorderHover: "hover:border-[#22C55E]/40",
    twBgHover: "hover:bg-[#22C55E]/20",
    twTextHover: "group-hover:text-[#22C55E]",
    twBorderFocus: "focus:border-[#22C55E]/50",
    twRingFocus: "focus:ring-[#22C55E]/50",
    twShadow: "shadow-[#22C55E]/25",
  },
  community: {
    name: "Web3 Community & Learning",
    hex: "#8B5CF6",
    colorName: "purple",
    twText: "text-[#8B5CF6]",
    twBg: "bg-[#8B5CF6]/10",
    twBorder: "border-[#8B5CF6]/20",
    twDot: "bg-[#8B5CF6]",
    twBorderHover: "hover:border-[#8B5CF6]/40",
    twBgHover: "hover:bg-[#8B5CF6]/20",
    twTextHover: "group-hover:text-[#8B5CF6]",
    twBorderFocus: "focus:border-[#8B5CF6]/50",
    twRingFocus: "focus:ring-[#8B5CF6]/50",
    twShadow: "shadow-[#8B5CF6]/25",
  },
} as const;

export function getServiceBrandColor(serviceName: string) {
  const normalized = serviceName.toLowerCase();
  if (normalized.includes("desk") || normalized.includes("p2p") || normalized.includes("crypto")) {
    return serviceBrandColors.desk;
  }
  if (normalized.includes("community") || normalized.includes("learn") || normalized.includes("group")) {
    return serviceBrandColors.community;
  }
  if (normalized.includes("dev") || normalized.includes("web") || normalized.includes("site") || normalized.includes("design")) {
    return serviceBrandColors.webDev;
  }
  if (normalized.includes("consult") || normalized.includes("guidance")) {
    return serviceBrandColors.consulting;
  }
  return serviceBrandColors.community;
}

