import { milestones, Milestone } from "../data/milestones";
import { branding } from "../config/branding";

export interface Principle {
  title: string;
  body: string;
  iconName: string;
}

export interface AboutContent {
  hero: {
    title: string;
    description: string;
  };
  journey: {
    title: string;
    paragraphs: string[];
    timeline: Milestone[];
  };
  brandPhilosophy: {
    title: string;
    paragraphs: string[];
  };
  principles: {
    title: string;
    list: Principle[];
  };
  collaboration: {
    title: string;
    paragraphs: string[];
  };
  achievementsHeader: {
    title: string;
    paragraphs: string[];
  };
  growth: {
    title: string;
    paragraphs: string[];
  };
  cta: {
    title: string;
    paragraphs: string[];
  };
}

export const aboutContent: AboutContent = {
  hero: {
    title: "Why Should You Trust JAKE With Your Project?",
    description: "When choosing someone to build your website, secure your crypto trades, or guide your digital strategy, you aren't just choosing a network. You are choosing the person behind it. Let's look past the corporate summaries and explore exactly who I am, why I built W3C Digital Network, and how I work."
  },
  journey: {
    title: "The Journey to W3C",
    paragraphs: branding.longBioParagraphs,
    timeline: milestones
  },
  brandPhilosophy: {
    title: "Bringing It All Under One Trusted Brand",
    paragraphs: [
      branding.whyExists,
      "I wanted to bridge that gap. By bringing community learning, secure P2P trading, and modern web development under one single, structured ecosystem, I can provide comprehensive support while maintaining a direct, human connection. W3C Digital Network exists to make complex systems transparent and accessible, ensuring you always have a trusted partner to call when making your next digital move."
    ]
  },
  principles: {
    title: "The Principles That Guide My Work",
    list: [
      {
        title: "People First, Sales Second",
        body: "A transaction is only successful if it genuinely serves your goals. I never push unnecessary services, overstate my expertise, or promise unrealistic outcomes just to close a deal.",
        iconName: "users"
      },
      {
        title: "Absolute Transparency",
        body: "Whether it is a clear breakdown of web development timelines or completely open crypto transaction handling with zero hidden fees, you will always know exactly what is happening and why.",
        iconName: "eye"
      },
      {
        title: "Practicality Over Hype",
        body: "The digital space is full of buzzwords and empty marketing trends. I focus strictly on what works, delivering clean code, functional websites, and secure assets that provide real-world utility.",
        iconName: "zap"
      },
      {
        title: "Continuous Learning",
        body: "Technology moves fast. I constantly test new AI-powered workflows, participate in active testnets, and refine my systems so that the guidance and platforms I provide remain ahead of the curve.",
        iconName: "lightbulb"
      }
    ]
  },
  collaboration: {
    title: "What You Can Expect When We Collaborate",
    paragraphs: [
      "Working with me is a straightforward, collaborative process. There are no layers of account managers or automated support tickets to navigate. You deal directly with me.",
      "We start with a conversation to understand your specific challenges and goals. From there, I outline a practical path forward with clear milestones. Throughout the project, I maintain open communication lines, giving you frequent updates so you are never left wondering about the status of your website build or trade execution. The final outcome is always built to match your exact requirements, ensuring a clean, reliable delivery every single time."
    ]
  },
  achievementsHeader: {
    title: "A Verified Infrastructure for Ambitious Minds",
    paragraphs: [
      `Today, W3C Digital Network is an officially registered business (${branding.rcNumber}) built on a foundation of verified achievements. It serves independent creators, modern businesses, and crypto traders who value security and clear execution over corporate talk.`,
      "In 2026 alone, our systems successfully processed over ₦35M+ in total peer-to-peer volume, maintaining an average of ₦7M+ monthly and ₦233K+ in daily transactions. This proves that you are partnering with a platform that possesses the liquidity, compliance, and everyday consistency to support your operations reliably."
    ]
  },
  growth: {
    title: "Thoughtful, Personal Growth",
    paragraphs: [
      `As ${branding.businessName} grows, the core mission will remain exactly the same. The long-term vision is to expand our Digital Solutions and web development capacity, build deeper educational resources for our community, and continuously integrate safer, faster transaction frameworks.`,
      "However, growth will never come at the expense of personal trust. No matter how large the network becomes, it will always be anchored by the same approachable, human-centric support that we started with."
    ]
  },
  cta: {
    title: "Let's Build Something Dependable Together.",
    paragraphs: [
      `Now you know the story, the numbers, and the principles behind ${branding.businessName}. The choice comes down to a simple question: Do you want a generic digital provider, or a dedicated partner committed to your clarity and success?`,
      "If you are ready to discuss a project, need a transparent crypto trade, or simply want an honest answer to a complex digital problem, my door is always open. Let's start with a normal conversation."
    ]
  }
};
