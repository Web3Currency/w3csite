export interface Principle {
  title: string;
  body: string;
  iconName: string; // Resolves to Lucide or standard icons dynamically
}

export interface BrandingConfig {
  businessName: string;
  founderName: string;
  founderImage: string;
  tagline: string;
  description: string;
  rcNumber: string;
  cacStatus: string;
  shortBio: string;
  longBioParagraphs: string[];
  mission: string;
  vision: string;
  philosophy: string;
  whyExists: string;
}

export const branding: BrandingConfig = {
  businessName: "W3C Digital Network",
  founderName: "JAKE",
  founderImage: "https://i.imgur.com/9q4rYyq.png",
  tagline: "",
  description: "Practical digital solutions built around your needs. Digital Solutions, crypto P2P services through W3C DESK, website development, and a Web3 community.",
  rcNumber: "RC: 9579098",
  cacStatus: "2026",
  shortBio: "I created W3C Digital Network as one place where I can bring together everything I do in the digital space. Over the years, I have helped people through crypto P2P trading, built a growing Web3 community, developed modern websites using AI-powered workflows, and provided practical digital guidance.",
  longBioParagraphs: [
    "My path in the digital space did not begin in a corporate boardroom. It started on the ground, connecting directly with people who needed practical answers in a rapidly changing technical landscape.",
    "It began with community building, bringing together individuals who wanted to learn about Web3, crypto ecosystems, and emerging digital tools without the surrounding noise and hype. As those connections grew, I realized that access to safe, reliable infrastructure was a major barrier for many.",
     "To solve a clear problem for my community, I stepped into crypto peer-to-peer trading. By prioritizing security, fast settlements, and complete transparency, I built a system that people could depend on. That hands-on experience naturally expanded into Digital Solutions and AI-powered web development, as businesses and individuals began asking for practical help with websites, tools, and their digital presence."
  ],
  mission: "To make digital opportunities transparent, accessible, and practical for everyone.",
  vision: "To expand our Digital Solutions and web development capacity, build deeper educational resources for our community, and continuously integrate safer, faster transaction frameworks, without ever losing personal trust.",
  philosophy: "A transaction is only successful if it genuinely serves your goals. We focus strictly on what works, delivering clean code, functional websites, and secure assets that provide real-world utility.",
  whyExists: "I built W3C Digital Network because I saw how fragmented, confusing, and impersonal the digital world can be. People looking for help were forced to deal with faceless corporations on one side, or anonymous, unverified internet profiles on the other. I wanted to bridge that gap."
};
