import { branding } from "../config/branding";
import { metrics } from "../config/metrics";

export interface CommunityModule {
  title: string;
  description: string;
  iconName: string;
}

export interface CommunityMetric {
  value: string;
  label: string;
}

export interface CommunityContent {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  modules: CommunityModule[];
  quote: string;
  stats: CommunityMetric[];
  membership: {
    title: string;
    description: string;
    ctaText: string;
  };
  sidebar: {
    title: string;
    subtitle: string;
    status: string;
    items: string[];
    footerLeft: string;
    footerRight: string;
  };
}

export const communityContent: CommunityContent = {
  hero: {
    badge: "The Network",
    title: "Learn with the operators.",
    description: `The W3C Community is part of W3C Digital Network and currently operates primarily on WhatsApp. It is a private, vetted group of builders, traders, and founders. We focus on practical learning, meaningful discussion, and building together.`
  },
  modules: [
    {
      title: "Market Alpha",
      description: "Real-time insights into crypto markets, emerging narratives, and actionable setups curated by active traders.",
      iconName: "flame"
    },
    {
      title: "Skill Building",
      description: "Live technical workshops covering smart contract interactions, web development, and digital security.",
      iconName: "graduation"
    },
    {
      title: "Vetted Network",
      description: "A strict no-spam environment. Connect with high-agency individuals who are actively building and investing.",
      iconName: "vetted"
    }
  ],
  quote: '"Building confidence and navigating Web3 together."',
  stats: [
    { value: metrics.communitySize, label: "COMMUNITY MEMBERS" },
    { value: metrics.testnetsCompleted, label: "TESTNET EXPLORED" },
    { value: metrics.clientsSupported, label: "USERS SUPPORTED" }
  ],
  membership: {
    title: "Membership is currently invite or application only.",
    description: "To maintain the quality of discussion, the community is gated. If you're serious about mastering Web3 and leveling up your digital operations, you can apply directly through our central Contact Hub to get in touch.",
    ctaText: "Join W3C Community"
  },
  sidebar: {
    title: "W3C Operators Group",
    subtitle: "Primary Platform: WhatsApp",
    status: "Active",
    items: [
      "Vetted for builders, traders & founders",
      "Daily market alpha & testnet alerts",
      "Direct access to JAKE for guidance"
    ],
    footerLeft: "Invite / application only",
    footerRight: branding.rcNumber
  }
};
