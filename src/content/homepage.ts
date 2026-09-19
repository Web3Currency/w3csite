import { branding } from "../config/branding";
import { contact } from "../config/contact";
import { metrics } from "../config/metrics";

export interface FeatureCard {
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  href: string;
  delay: number;
  iconName: string;
  iconStyle: { backgroundColor: string };
  accentColorClass: string;
}

export interface TrustPillar {
  pillar: string;
  meaning: string;
  badge?: string;
  fact?: string;
  iconName: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    description: string;
    list: FeatureCard[];
  };
  trust: {
    title: string;
    description: string;
    metrics: {
      totalVolume: string;
      avgMonthly: string;
      avgDaily: string;
    };
    pillars: TrustPillar[];
  };
  projectsTeaser: {
    title: string;
    description: string;
    subNote: string;
    ctaText: string;
  };
  communityTeaser: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    sidebarTitle: string;
    sidebarSubtitle: string;
    sidebarStatus: string;
    sidebarItems: { label: string; sub: string }[];
    sidebarMembers: string;
    sidebarPrice: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    title: "Practical Digital Solutions Built Around Your Needs",
    description: "Whether you're building your business online, looking for a trusted crypto P2P partner, or simply need a practical guidance in the digital space, you'll be working with me to find the right solution for your needs",
    primaryCta: "Start the Conversation",
    secondaryCta: "Explore All Services"
  },
  features: {
    title: "What I Do",
    description: "I help business owners, creators, and traders navigate the digital space cleanly and securely. Explore our core operations below.",
    list: [
      {
        title: "Digital Consulting",
        tagline: "Need a second opinion before making an important digital decision?",
        description: "I help individuals, creators, and businesses understand their options, avoid costly mistakes, and choose practical solutions across Web3, AI tools, websites, and digital systems.",
        ctaText: "Get Advisory Support",
        href: "/services?tab=consulting",
        delay: 0.1,
        iconName: "headphones",
        iconStyle: { backgroundColor: "#22c55e" },
        accentColorClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      },
      {
        title: "W3C DESK",
        tagline: "Safe, direct peer-to-peer trading.",
        description: "Buy and sell digital assets directly with a verified merchant through a simple WhatsApp conversation.\n\nNo unnecessary complexity. Just a transparent process, clear communication, and support from start to finish.",
        ctaText: "Check Current Rates",
        href: "/services?tab=desk",
        delay: 0.2,
        iconName: "wallet",
        iconStyle: { backgroundColor: "#f97316" },
        accentColorClass: "bg-orange-500/20 text-orange-400 border-orange-500/30"
      },
      {
        title: "Website Design & Development",
        tagline: "Professional websites built for real business results.",
        description: "I design and build websites that help businesses look professional, earn trust, and make it easier for customers to reach them.\n\nWhether you're starting from scratch or replacing an outdated website, every project is built around your goals, not a template.",
        ctaText: "Build My Website",
        href: "/services?tab=web",
        delay: 0.3,
        iconName: "terminal",
        iconStyle: { backgroundColor: "#facc15" },
        accentColorClass: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      },
      {
        title: "W3C Community",
        tagline: "Learn Web3 and crypto safely, together.",
        description: "A free WhatsApp community where people learn about Web3, cryptocurrency, AI tools, and the digital economy through practical discussions and shared experiences.\n\nWhether you're just getting started or already have some experience, you'll always have people to learn with and ask questions.",
        ctaText: "Join the Community",
        href: "/services?tab=community",
        delay: 0.4,
        iconName: "users",
        iconStyle: { backgroundColor: "#8b5cf6" },
        accentColorClass: "bg-primary/20 text-primary border-primary/30"
      }
    ]
  },
  trust: {
    title: "Why People Trust W3C",
    description: "Here is exactly what you can expect when working with me, backed by verified numbers and official registration.",
    metrics: {
      totalVolume: metrics.totalVolume,
      avgMonthly: metrics.avgMonthlyVolume,
      avgDaily: metrics.avgDailyVolume
    },
    pillars: [
      {
        iconName: "shield",
        pillar: "Registered Business",
        meaning: "You are dealing with an official entity, not an anonymous internet profile.",
        badge: branding.rcNumber
      },
      {
        iconName: "wallet",
        pillar: "Proven Transaction Record",
        meaning: "Safe, compliant peer-to-peer cryptocurrency handling.",
        fact: `Over ${metrics.totalVolume} in total P2P volume handled in ${metrics.activeSince}`
      },
      {
        iconName: "headset",
        pillar: "Real Human Support",
        meaning: "You deal directly with me, getting clear answers and practical guidance.",
        fact: `Direct access to ${branding.founderName} for continuous learning`
      }
    ]
  },
  projectsTeaser: {
    title: "Recent Projects",
    description: "Here are a few examples of the work I have been building. Every project tells a story of collaboration, problem-solving, and clean execution.",
    subNote: "",
    ctaText: "View all projects"
  },
  communityTeaser: {
    badge: "LEARN • EXPLORE • EARN",
    title: "Learn. Connect. Grow.",
    description: `The W3C Community is part of W3C Digital Network and currently operates primarily on WhatsApp. It is a private, vetted group where people learn about crypto, Web3, AI tools, and the digital opportunities shaping our future. If you want a space where you can ask questions freely, discover active testnets, and build your digital skills alongside others, you belong here. We are building, learning, and earning together.`,
    ctaText: "Join W3C Community",
    sidebarTitle: "W3C Community",
    sidebarSubtitle: "Primary Platform: WhatsApp",
    sidebarStatus: "Active",
    sidebarItems: [
      { label: "Learn crypto & Web3 basics", sub: "Beginner-friendly explanations" },
      { label: "Discover active testnets", sub: "Early access opportunities" },
      { label: "Build digital skills together", sub: "Practical, real-world focus" },
      { label: "Ask questions freely", sub: "No judgment, just help" }
    ],
    sidebarMembers: `${metrics.communitySize} members`,
    sidebarPrice: "Free to join"
  },
  cta: {
    title: "Let's Start with a Conversation.",
    description: "Every project begins with understanding your goals. Whether you are looking for guidance, a website, crypto support, or simply exploring an idea, I am always open to a conversation. No pressure, no aggressive sales pitch, just real human support to help you figure out your next steps.",
    primaryCta: "Start the Conversation",
    secondaryCta: "View All Contact Options"
  }
};
