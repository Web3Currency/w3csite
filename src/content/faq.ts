import { branding } from "../config/branding";
import { contact } from "../config/contact";

export interface FAQItem {
  q: string;
  a: string;
  category: "about" | "web-dev" | "consulting" | "p2p" | "community" | "communication" | "projects" | "final";
  action?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
  secondaryAction?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
}

export const faqs: FAQItem[] = [
  // ABOUT W3C DIGITAL NETWORK
  {
    category: "about",
    q: "What is W3C Digital Network?",
    a: `W3C Digital Network is my digital workspace where I help people build websites, navigate Web3, trade crypto through W3C DESK, and solve practical digital problems. Everything here is personally operated by me (${branding.founderName}), not a large agency or chatbot.`,
    action: {
      label: "Learn More About Me",
      url: "/about"
    }
  },
  {
    category: "about",
    q: `Who is ${branding.founderName}?`,
    a: `I'm the founder of W3C Digital Network. I work directly with clients, builders, founders, and crypto users to create practical digital solutions, provide technical guidance, and operate W3C DESK. When you contact W3C Digital Network, you're speaking directly with me.`,
    action: {
      label: `Contact ${branding.founderName}`,
      url: "/contact"
    }
  },
  {
    category: "about",
    q: "Is W3C Digital Network a registered business?",
    a: "Yes. W3C Digital Network is registered with the Corporate Affairs Commission (CAC) in Nigeria. RC: 9579098.",
    action: {
      label: "View Services",
      url: "/services"
    }
  },

  // WEB DEVELOPMENT
  {
    category: "web-dev",
    q: "What kind of websites do you build?",
    a: "I build modern websites for businesses, creators, startups, communities, and organizations. Examples include: Landing Pages, Business Websites, Company Websites, Community Websites, Portfolio Websites, and Custom Digital Platforms.",
    action: {
      label: "Explore Website Design & Development",
      url: "/services?tab=web"
    }
  },
  {
    category: "web-dev",
    q: "Do you use AI to build websites?",
    a: "Yes. I use an AI-assisted development workflow to speed up planning, coding, testing, and delivery. Every project is still reviewed, customized, and delivered by me. AI helps me work faster—it doesn't replace the development process."
  },
  {
    category: "web-dev",
    q: "Can you redesign my existing website?",
    a: "Yes. If your current website feels outdated or no longer reflects your business, I can redesign and modernize it while preserving important content where appropriate.",
    action: {
      label: "Request a Website Redesign",
      url: "/services?tab=web"
    }
  },
  {
    category: "web-dev",
    q: "How long does a project take?",
    a: "Every project is different. Simple landing pages may take only a few days. Larger websites require more planning depending on the features involved. I'll provide an estimated timeline before we begin.",
    action: {
      label: "Discuss My Website Project",
      url: "/contact"
    }
  },
  {
    category: "web-dev",
    q: "Can you maintain my website after launch?",
    a: "Yes. I can continue updating, improving, and maintaining websites after they go live."
  },

  // DIGITAL SOLUTIONS
  {
    category: "consulting",
    q: "What are Digital Solutions?",
    a: "Sometimes people don't need a website—they need help figuring out what they need. Digital Solutions helps individuals, creators, and businesses solve digital problems, improve what they already have, use AI where it makes sense, and turn ideas into practical solutions.",
    action: {
      label: "Explore Digital Solutions",
      url: "/services?tab=consulting"
    }
  },
  {
    category: "consulting",
    q: "What can you help me with?",
    a: "Examples include: Website planning, digital strategy, Web3 guidance, crypto questions, online business setup, choosing the right tools, and technical problem solving."
  },
  {
    category: "consulting",
    q: "Can beginners contact you?",
    a: "Absolutely. Whether you're completely new or already experienced, you're welcome to reach out.",
    action: {
      label: "Get in Touch",
      url: "/contact"
    }
  },

  // W3C DESK
  {
    category: "p2p",
    q: "What is W3C DESK?",
    a: "W3C DESK is my crypto peer-to-peer trading service. I help clients buy and sell supported cryptocurrencies quickly and securely.",
    action: {
      label: "Start a Trade Request",
      url: "/services?tab=desk"
    }
  },
  {
    category: "p2p",
    q: "Is the W3C DESK an exchange?",
    a: `No. The W3C DESK is not an automated crypto exchange. It simply connects you directly with a verified merchant, ${branding.founderName}, through WhatsApp if you want to buy or sell any publicly tradable cryptocurrency. All trades are coordinated manually, person to person.`,
    action: {
      label: "Start a Trade Request",
      url: "/services?tab=desk"
    }
  },
  {
    category: "p2p",
    q: "What currency is used for transactions?",
    a: "The desk mainly works with Nigerian Naira (NGN). You can buy crypto with Naira, or sell crypto and receive payment in Naira.",
    action: {
      label: "Start a Trade Request",
      url: "/services?tab=desk"
    }
  },
  {
    category: "p2p",
    q: "How do I know I'm chatting with the correct desk?",
    a: `Always confirm you're speaking with ${branding.founderName} through the official ${branding.businessName} WhatsApp channel linked on this website before starting any transaction.`,
    action: {
      label: "Verify the Official Contact",
      url: "/contact"
    }
  },
  {
    category: "p2p",
    q: "Is the P2P desk secure and registered?",
    a: `Yes. ${branding.businessName} is an officially registered business (${branding.rcNumber}), with a clean operational record, substantial total peer-to-peer volume, and consistent daily liquidity.`,
    action: {
      label: "Start a Trade Request",
      url: "/services?tab=desk"
    }
  },
  {
    category: "p2p",
    q: "Which cryptocurrencies do you support?",
    a: "Supported assets may include: BTC, ETH, USDT, USDC, BNB, PI, and other supported digital assets. Availability depends on market conditions.",
    action: {
      label: "Explore W3C DESK",
      url: "/services?tab=desk"
    }
  },
  {
    category: "p2p",
    q: "How do trades work?",
    a: "Simply send a message. I'll provide the current rate, explain the process, confirm the details, and complete the transaction once everything is verified.",
    action: {
      label: "Start a Trade Request",
      url: contact.whatsappUrl,
      isExternal: true
    }
  },
  {
    category: "p2p",
    q: "Are your rates fixed?",
    a: "No. Rates change based on market conditions and liquidity. You'll always receive a current quote before confirming a trade."
  },
  {
    category: "p2p",
    q: "How fast are trades?",
    a: "Most trades are completed within minutes after payment and confirmation. Large transactions may require additional verification."
  },
  {
    category: "p2p",
    q: "Is there a minimum trade amount?",
    a: "Minimum amounts may vary depending on the asset. Contact me for the latest requirements."
  },
  {
    category: "p2p",
    q: "How does W3C protect my information and transactions?",
    a: "Your information and use of W3C DESK are handled according to the policies and terms that apply to our services. Please review the Privacy Policy to understand how your information is handled, and the Terms of Use for the rules and responsibilities that apply when using W3C Digital Network and W3C DESK.",
    action: {
      label: "Privacy Policy",
      url: "/privacy"
    },
    secondaryAction: {
      label: "Terms of Use",
      url: "/terms"
    }
  },

  // COMMUNITY
  {
    category: "community",
    q: "What is the W3C Community?",
    a: "The W3C Community is a private learning community focused on cryptocurrency, Web3, AI, and digital opportunities. The goal is to help members learn, build, and grow together.",
    action: {
      label: "Explore W3C Community",
      url: "/services?tab=community"
    }
  },
  {
    category: "community",
    q: "Where is the community hosted?",
    a: "The community currently operates primarily on WhatsApp. Additional communication channels may be introduced over time."
  },
  {
    category: "community",
    q: "Can anyone join?",
    a: "The community is currently invite-only or application-based to maintain quality discussions.",
    action: {
      label: "Join W3C Community",
      url: "/services?tab=community"
    }
  },
  {
    category: "community",
    q: "Do I have to trade to be part of W3C?",
    a: "No. Many people join the W3C Community just to learn, network, and explore Web3. Trading through the desk is entirely optional.",
    action: {
      label: "Join W3C Community",
      url: "/services?tab=community"
    }
  },
  {
    category: "community",
    q: "What do members receive?",
    a: "Members gain access to: Market insights, Web3 opportunities, educational content, testnet updates, AI discussions, community support, and digital networking."
  },

  // COMMUNICATION
  {
    category: "communication",
    q: "What's the fastest way to contact you?",
    a: "The Contact page always lists my current preferred communication channels. If one platform changes, this website will always have the latest contact information.",
    action: {
      label: "Go to Contact Page",
      url: "/contact"
    }
  },
  {
    category: "communication",
    q: "Why don't you rely on only one platform?",
    a: "Centralized platforms can change policies or restrict accounts. That's why W3C Digital Network treats this website as its permanent headquarters, while messaging platforms remain communication channels."
  },
  {
    category: "communication",
    q: "Do you work internationally?",
    a: "Yes. Most services can be delivered remotely. Availability may depend on the service requested."
  },

  // PROJECTS
  {
    category: "projects",
    q: "Can I see your previous work?",
    a: "Yes. Visit the Projects page to explore completed websites, tools, and ongoing development work.",
    action: {
      label: "Browse Projects",
      url: "/projects"
    }
  },
  {
    category: "projects",
    q: "Are all projects public?",
    a: "No. Some client work is private or confidential. Only projects approved for public display appear in the portfolio."
  },

  // FINAL SECTION
  {
    category: "final",
    q: "Didn't find your answer?",
    a: "Every project and situation is different. If your question isn't listed here, send me a message through the Contact page, and I'll be happy to help.",
    action: {
      label: `Contact ${branding.founderName}`,
      url: "/contact"
    }
  }
];
