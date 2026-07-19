export interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  headerLinks: NavLink[];
  footerQuickLinks: NavLink[];
  footerLegalLinks: NavLink[];
  ctaText: string;
}

export const navigation: NavigationConfig = {
  headerLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "Meet JAKE" },
    { href: "/services", label: "What I Do" },
    { href: "/projects", label: "Projects" },
    { href: "/#homepage-faq-section", label: "FAQ" },
    { href: "/ledger", label: "P2P Ledger" }
  ],
  footerQuickLinks: [
    { href: "/about", label: "Meet JAKE" },
    { href: "/services", label: "What I Do" },
    { href: "/projects", label: "Projects" },
    { href: "/#homepage-faq-section", label: "FAQ" },
    { href: "/contact#community", label: "Community" },
    { href: "/ledger", label: "P2P Ledger" },
    { href: "/contact", label: "Contact" }
  ],
  footerLegalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" }
  ],
  ctaText: "Let's Talk"
};
