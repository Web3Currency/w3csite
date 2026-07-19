export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface SEOConfig {
  default: MetaConfig;
  home: MetaConfig;
  about: MetaConfig;
  services: MetaConfig;
  projects: MetaConfig;
  community: MetaConfig;
  contact: MetaConfig;
  cryptoP2P: MetaConfig;
  webDev: MetaConfig;
  digitalConsulting: MetaConfig;
  communityService: MetaConfig;
}

export const seo: SEOConfig = {
  default: {
    title: "W3C Digital Network",
    description: "Practical digital solutions built around your needs. Consulting, crypto P2P trading, AI-powered web development, and a Web3 community.",
    keywords: ["Web3", "Crypto P2P", "OTC Trading", "Web Development", "AI Development", "Consulting", "Jake", "W3C"]
  },
  home: {
    title: "W3C Digital Network",
    description: "Practical digital solutions built around your needs. Consulting, crypto P2P trading, AI-powered web development, and a Web3 community."
  },
  about: {
    title: "About JAKE | W3C Digital Network",
    description: "The story, principles, and verified track record behind JAKE and W3C Digital Network."
  },
  services: {
    title: "Services | W3C Digital Network",
    description: "Digital consulting, secure crypto P2P trading, AI-powered web development, and a Web3 community, all delivered personally by JAKE."
  },
  projects: {
    title: "Projects & Outcomes | Digital Network",
    description: "Explore a selection of verified digital solutions, web infrastructure, OTC operations, and community milestones built by JAKE."
  },
  community: {
    title: "Community Hub | W3C Digital Network",
    description: "Join JAKE's private WhatsApp network for Web3 education, networking, and digital skill building."
  },
  contact: {
    title: "Contact JAKE | W3C Digital Network",
    description: "Get in touch with JAKE for consulting, development, crypto operations, or community access."
  },
  cryptoP2P: {
    title: "W3C DESK, Crypto P2P Trading | W3C Digital Network",
    description: "A secure, transparent peer-to-peer desk for converting crypto to Naira and back, coordinated directly on WhatsApp with JAKE."
  },
  webDev: {
    title: "Website Design & Development | W3C Digital Network",
    description: "Professional business websites, school websites, and custom web apps built cleanly and delivered fast by JAKE."
  },
  digitalConsulting: {
    title: "Digital Consulting | W3C Digital Network",
    description: "Independent, honest digital and Web3 consulting from JAKE. Strategic guidance and problem solving without the corporate jargon."
  },
  communityService: {
    title: "W3C Community | W3C Digital Network",
    description: "A free, WhatsApp-based Web3 learning community founded by JAKE, built to make crypto and Web3 easy, safe, and educational."
  }
};
