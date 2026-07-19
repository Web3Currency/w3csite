export interface Milestone {
  phase: string;
  title: string;
  description: string;
  iconName: string;
}

export const milestones: Milestone[] = [
  {
    phase: "Phase 1",
    title: "Community & Learning",
    description: "Bringing people together to demystify Web3 and explore new digital tools collectively.",
    iconName: "users"
  },
  {
    phase: "Phase 2",
    title: "Crypto P2P Trading",
    description: "Establishing safe, transparent infrastructure for secure digital asset transactions.",
    iconName: "wallet"
  },
  {
    phase: "Phase 3",
    title: "Web Development & Strategy",
    description: "Launching high-performance websites and landing pages using efficient, modern workflows.",
    iconName: "terminal"
  },
  {
    phase: "Phase 4",
    title: "W3C Digital Network",
    description: "Unifying all services under one official, verified, and transparent ecosystem.",
    iconName: "hexagon"
  }
];
