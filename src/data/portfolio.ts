export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  problem: string;
  role: string;
  tags: string[];
  status: "Active • Ongoing" | "Completed" | "Prototype • Active" | "In Development" | string;
  statusColorClass: string;
  colorClass: string;
  externalLink?: string;
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  lessonsLearned: string;
  relatedServices: { label: string; href: string }[];
  keyHighlights: string[];
  keyFeatures: string[];
  futureImprovements?: string[];
}

export const projects: Project[] = [
  {
    id: "w3c-pi-bookings",
    title: "W3C Pi Bookings",
    category: "Internal Web3 Tool",
    shortDescription: "A Pi-powered digital services marketplace where clients can discover, book, and pay for services from digital service providers.",
    problem: "Creating a simple way for clients to discover digital services, connect with providers, and complete bookings using Pi.",
    role: "Product Designer & Core Developer",
    tags: ["React", "TypeScript", "Supabase", "Pi Network", "Pi Payments", "Vercel"],
    status: "In Development",
    statusColorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    colorClass: "text-orange-400 bg-orange-400/10",
    externalLink: "https://app.web3currency.online",
    overview: "W3C Pi Bookings is a Pi-powered marketplace for digital services, connecting clients with service providers through a simple booking and payment experience.",
    challenge: "Bringing service discovery, provider onboarding, booking, and Pi payments into one focused experience without making the marketplace unnecessarily complex.",
    approach: "Build a lightweight marketplace experience with real database-backed services, provider profiles, booking flows, and Pi-compatible payments.",
    solution: "A responsive digital services marketplace where users can explore service categories, review providers, book services, and pay in Pi.",
    lessonsLearned: "A marketplace becomes easier to use when discovery, provider information, booking, and payment are kept within a clear flow.",
    keyHighlights: ["Pi-powered marketplace", "Digital service booking", "Provider onboarding", "Pi payment flow", "Real database-backed services"],
    keyFeatures: ["Pi-compatible service booking", "Provider onboarding", "Pi payment flow", "Real database-backed services"],
    relatedServices: [
      { label: "Website Design & Development", href: "/services?tab=web" },
      { label: "Digital Consulting & Strategy", href: "/services?tab=consulting" }
    ]
  },
  {
    id: "w3c-digital-network",
    title: "W3C Digital Network",
    category: "Personal Brand Website",
    shortDescription: "The official digital workspace of W3C Digital Network. This project serves as the central platform for my services, community, and digital presence. It is continuously improved as I grow my skills, refine the brand, and expand what W3C offers.",
    problem: "To demonstrate operational capabilities and real-world skills transparently through a premium, high-performance web experience.",
    role: "Lead Architect, UI Designer & Core Developer",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Google AI Studio", "Replit", "Vercel", "GitHub"],
    status: "Active • Ongoing",
    statusColorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    colorClass: "text-purple-400 bg-purple-400/10",
    overview: "W3C Digital Network is my flagship product. Rather than just a personal website, it stands as a living testament to modern development standards, interactive components, and digital craftsmanship. It serves as the primary portal for digital strategy, Web3 tools, and OTC desk access.",
    challenge: "Traditional portfolios feel static, empty, and fail to showcase active progress or digital workflow maturity. The challenge was building an online presence that serves as a living demonstration of modern design standards, lightning-fast rendering, and active operational capacity.",
    approach: "Design the workspace using a high-density, eye-safe grid that represents both advisory services and technical builds under one unified brand. Prioritize flawless page transitions, responsive touch targets, and clean dark-mode typography.",
    solution: "A complete digital brand presence built on a React single-page structure. It features direct integration with communication platforms (WhatsApp) and interactive demo sections (like our live P2P settlement mockups and smart contract scanners) that prove capability through hand-crafted code components.",
    lessonsLearned: "Web performance and transparency are active forms of user respect. Cutting down asset payloads in favor of rich, hand-crafted code components results in higher user confidence.",
    keyHighlights: [
      "Brand strategy",
      "Modern UI/UX",
      "Responsive design",
      "AI-assisted development",
      "Continuous iteration"
    ],
    keyFeatures: [
      "Modular grid layout with premium glassmorphic visual cards",
      "Real-time interactive components demonstrating technical capability",
      "Seamless responsive mobile and desktop screen adaptations",
      "Highly optimized single-page routing and fluid transition state flows"
    ],
    futureImprovements: [
      "Integrating automated live service availability dashboards",
      "Expanding the interactive showcase with Web3 simulation widgets"
    ],
    relatedServices: [
      { label: "Website Design & Development", href: "/services?tab=web" },
      { label: "Digital Consulting & Strategy", href: "/services?tab=consulting" }
    ]
  },
  {
    id: "gold-marine-group",
    title: "Gold Marine Energy Service",
    category: "Corporate Website",
    shortDescription: "A modern corporate website built to strengthen the company's online presence and provide a professional platform for showcasing its services. The project includes a certificate verification system connected to a database, allowing users to verify issued certificates directly through the website.",
    problem: "Providing international clients with a secure, instant, and trustworthy platform to verify corporate safety and technical certifications offline-to-online.",
    role: "Full-Stack Developer & Database Lead",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Database Integration", "AI-assisted Development", "Vercel"],
    status: "Completed",
    statusColorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    colorClass: "text-emerald-400 bg-emerald-400/10",
    externalLink: "https://goldmarinegroup.com",
    overview: "Gold Marine Group required a high-credibility web presence that could handle delicate operational procedures. The solution centers around a secure certificate database that lets users verify authenticity directly, dramatically reducing administrative friction and building global trust.",
    challenge: "Creating a modern web presence for a corporate maritime enterprise that demands absolute credibility. The core requirement was building a reliable way for international clients to verify issued corporate certificates instantly, reducing manual support overhead and verifying authenticity securely.",
    approach: "Developed a professional, high-credibility dark visual identity that matches maritime themes. Designed a secure database-backed certificate search module using type-safe queries, paired with clean typography for an executive-level presentation.",
    solution: "A fully responsive Next.js application integrated with a secure certificate verification database. Clients can enter custom certificate numbers in a dedicated search field and instantly view secure verification records, backed by an optimized, mobile-responsive layout.",
    lessonsLearned: "Security modules must be robust yet extremely simple to operate. Implementing database indexing on certificate codes ensured queries resolve in milliseconds.",
    keyHighlights: [
      "Corporate website",
      "Certificate verification system",
      "Database integration",
      "Mobile responsive",
      "Professional business presentation"
    ],
    keyFeatures: [
      "Secure, real-time database-backed certificate verification portal",
      "Corporate-grade responsive presentation layouts with elegant typography",
      "Instant mobile-responsive page navigation and high-contrast tables"
    ],
    relatedServices: [
      { label: "Website Design & Development", href: "/services?tab=web" },
      { label: "Digital Consulting & Strategy", href: "/services?tab=consulting" }
    ]
  },
  {
    id: "w3c-test-token-tracker",
    title: "Pi Token Explorer",
    category: "Internal Web3 Tool",
    shortDescription: "Discover Pi ecosystem tokens, view token details, and check liquidity in one place.",
    problem: "Making it easier for people to discover and learn about tokens in the Pi ecosystem without jumping between different sources.",
    role: "Product Designer & Core Developer",
    tags: ["Pi Network", "Token Discovery", "Token Information"],
    status: "Prototype • Active",
    statusColorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    colorClass: "text-blue-400 bg-blue-400/10",
    externalLink: "https://apppitokenexplor8194.pinet.com/",
    overview: "Pi Token Explorer brings Pi ecosystem tokens together in one place, helping users browse token projects and see useful information about each token.",
    challenge: "Token information can be difficult to find and compare when it is spread across different places. The explorer aims to make discovery simpler and more accessible.",
    approach: "Present token listings and relevant token information in a clear, easy-to-browse interface.",
    solution: "A simple explorer for discovering Pi ecosystem tokens, viewing token details, and checking available liquidity information.",
    lessonsLearned: "Clear, accessible token information helps people explore an ecosystem and understand the projects being built within it.",
    keyHighlights: [
      "Explore tokens across the Pi ecosystem",
      "View token details",
      "Check available liquidity information"
    ],
    keyFeatures: [
      "Browse and discover tokens in the Pi ecosystem",
      "View useful details about listed tokens",
      "Check available token liquidity information"
    ],
    futureImprovements: [
      "Adding automated SMS or email alerts for large-volume transactions",
      "Connecting a persistent database to cache and index historical transactions"
    ],
    relatedServices: [
      { label: "W3C Community Hub", href: "/community" },
      { label: "Digital Consulting & Strategy", href: "/services?tab=consulting" }
    ]
  },
];
