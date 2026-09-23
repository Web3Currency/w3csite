import { branding } from "../config/branding";
import { metrics } from "../config/metrics";

export interface ServiceListItem {
  title: string;
  tagline: string;
  description: string;
  whoFor: string;
  benefit: string;
  iconName: string;
  href: string;
  accentColorClass: string;
  ctaText: string;
  delay: number;
}

export interface ExtraServiceItem {
  iconName: string;
  title: string;
  body: string;
}

export interface JourneyStep {
  num: string;
  iconName: string;
  title: string;
  body: string;
}

export interface WhyItem {
  title: string;
  body: string;
}

export interface TrustCardItem {
  title: string;
  body: string;
}

export interface ServicesContent {
  hero: {
    title: string;
    description: string;
    subDescription: string;
  };
  cores: ServiceListItem[];
  extras: {
    title: string;
    subtitle: string;
    description: string;
    list: ExtraServiceItem[];
  };
  builtOnTrust: {
    title: string;
    list: TrustCardItem[];
  };
  whyWorkWithMe: {
    title: string;
    list: WhyItem[];
  };
  journey: {
    title: string;
    steps: JourneyStep[];
  };
  cta: {
    title: string;
    description: string;
  };
  reassurance: {
    title: string;
    description: string;
  };
}

export const servicesContent: ServicesContent = {
  hero: {
    title: "Let's Figure It Out Together",
    description: "Whether you need a website, Web3 guidance, crypto P2P, or help solving a digital challenge, every service starts the same way: a simple conversation.",
    subDescription: "When you message W3C Digital Network, you're talking directly with me, Jake. I'll take the time to understand what you're trying to achieve, recommend the right solution, and work with you from start to finish.\n\nNot sure which service fits? That's completely fine. Tell me what you need, and we'll figure it out together."
  },
  cores: [
    {
      title: "Digital Solutions",
      tagline: "Need help figuring out the right digital solution?",
      description: "I help individuals, creators, and businesses figure out what they need, improve what they already have, and turn digital ideas into practical solutions.",
      whoFor: "Anyone who has a digital problem, idea, or goal and wants help figuring out the right way forward.",
      benefit: "A clearer direction, practical recommendations, and a solution that fits your situation.",
      iconName: "headphones",
      href: "/services/digital-consulting",
      accentColorClass: "bg-green-500/20 text-green-400 border-green-500/30",
      ctaText: "Learn More",
      delay: 0.05
    },
    {
      title: "W3C DESK",
      tagline: "Safe, direct peer-to-peer trading.",
      description: "Buy and sell digital assets directly with a verified merchant through a simple WhatsApp conversation.\n\nNo unnecessary complexity. Just a transparent process, clear communication, and support from start to finish.",
      whoFor: "Anyone looking for a reliable person to help them buy or sell crypto safely and conveniently.",
      benefit: "Fast communication, fair rates, and a smooth trading experience handled by a real person.",
      iconName: "wallet",
      href: "/services/crypto-p2p",
      accentColorClass: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      ctaText: "Learn More",
      delay: 0.1
    },
    {
      title: "Website Design & Development",
      tagline: "Professional websites built for real business results.",
      description: "I design and build websites that help businesses look professional, earn trust, and make it easier for customers to reach them.\n\nWhether you're starting from scratch or replacing an outdated website, every project is built around your goals, not a template.",
      whoFor: "Business owners who want a modern website that represents their brand and supports their growth.",
      benefit: "A fast, mobile-friendly website that gives your business a professional online presence.",
      iconName: "terminal",
      href: "/services/web-development",
      accentColorClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      ctaText: "Learn More",
      delay: 0.15
    },
    {
      title: "W3C Community",
      tagline: "Learn Web3 and crypto safely, together.",
      description: "A free WhatsApp community where people learn about Web3, cryptocurrency, AI tools, and the digital economy through practical discussions and shared experiences.\n\nWhether you're just getting started or already have some experience, you'll always have people to learn with and ask questions.",
      whoFor: "Anyone who wants to learn, explore, and grow in the digital space alongside a supportive community.",
      benefit: "Practical knowledge, honest conversations, and access to a growing network of learners and builders.",
      iconName: "users",
      href: "/services/community",
      accentColorClass: "bg-primary/20 text-primary border-primary/30",
      ctaText: "Learn More",
      delay: 0.2
    }
  ],
  extras: {
    title: "More Ways I Can Help",
    subtitle: "Some projects naturally need a little more than the main service. If you need any of the following, I'm happy to help.",
    description: "These smaller services often come up naturally during our web design or consulting discussions. I can take care of them for you to save you time.",
    list: [
      {
        iconName: "building",
        title: "CAC Business Name Registration",
        body: "I'll handle the paperwork to get your business name officially registered with the Corporate Affairs Commission."
      },
      {
        iconName: "globe",
        title: "Domain & Hosting",
        body: "I can help you choose, purchase, and set up the domain and hosting your website needs."
      },
      {
        iconName: "mail",
        title: "Business Email Setup",
        body: "Setting up professional email addresses (like you@yourbusiness.com) to make your communications look official."
      },
      {
        iconName: "pentool",
        title: "Logo & Brand Identity",
        body: "Creating a clean, recognizable logo and basic brand guidelines so your business presents itself well."
      },
      {
        iconName: "map-pin",
        title: "Google Business Profile",
        body: "Listing your business on Google Search and Maps so local customers can easily find you."
      }
    ]
  },
  builtOnTrust: {
    title: "Built on Trust",
    list: [
      {
        title: "Personally Managed",
        body: "Every service is delivered directly by Jake."
      },
      {
        title: "CAC Registered",
        body: "W3C Digital Network is a registered business in Nigeria."
      },
      {
        title: "WhatsApp Business",
        body: "A simple, direct, and responsive way to communicate."
      },
      {
        title: "Transparent Process",
        body: "Clear communication from your first message to project completion."
      },
      {
        title: "Long-Term Support",
        body: "Building relationships, not just completing transactions."
      }
    ]
  },
  whyWorkWithMe: {
    title: "Why People Choose W3C Digital Network",
    list: [
      {
        title: "You work directly with me.",
        body: "No middlemen. No departments. No ticket systems.\n\nWhen you reach out, you're speaking with the same person who will understand your needs, do the work, and keep you updated."
      },
      {
        title: "Honest advice comes first.",
        body: "If a simpler or more affordable solution is the better choice, I'll recommend it.\n\nThe goal is to solve your problem, not sell you something you don't need."
      },
      {
        title: "Clear communication.",
        body: "You'll always know what's happening, what comes next, and what to expect.\n\nNo guessing.\n\nNo unnecessary jargon."
      },
      {
        title: "Practical solutions.",
        body: "I focus on solutions that are useful, reliable, and easy to maintain.\n\nTechnology should make life easier, not more complicated."
      },
      {
        title: "Support doesn't stop at delivery.",
        body: "Whether it's a question, an update, or your next idea, you can always reach out.\n\nLong-term relationships matter more than one-time projects."
      }
    ]
  },
  journey: {
    title: "How We Work Together",
    steps: [
      {
        num: "01",
        iconName: "message",
        title: "Let's Talk",
        body: "Everything starts with a conversation on WhatsApp. Tell me what you're working on, what you're trying to achieve, or where you're feeling stuck."
      },
      {
        num: "02",
        iconName: "search",
        title: "Understanding Your Needs",
        body: "I'll ask the right questions, understand your goals, and recommend the solution that makes the most sense for your situation."
      },
      {
        num: "03",
        iconName: "clipboard",
        title: "Planning the Work",
        body: "Before anything begins, you'll receive a clear explanation of what we'll do, how we'll do it, the cost involved, and the expected timeline. No surprises."
      },
      {
        num: "04",
        iconName: "rocket",
        title: "Building the Solution",
        body: "Once everything is agreed, I'll get to work. You'll receive updates along the way so you always know how things are progressing."
      },
      {
        num: "05",
        iconName: "lifebuoy",
        title: "We're Still Connected",
        body: "The conversation doesn't end after delivery. Whether you need support, updates, or help with your next project, I'm only a WhatsApp message away."
      }
    ]
  },
  cta: {
    title: "Not Sure Where to Start?",
    description: "You don't need to know exactly which service you need. Just send me a message, tell me what you're trying to achieve, and together we'll figure out the best way forward. That's what W3C Digital Network is here for."
  },
  reassurance: {
    title: "Can't find exactly what you're looking for?",
    description: "Not every digital need fits neatly into a service category. If you have a specific or unusual project in mind, send me a message anyway. If it's something I can help with, I'll let you know. If it isn't, I will gladly point you in the right direction."
  }
};
