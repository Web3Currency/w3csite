import { branding } from "../config/branding";
import { metrics } from "../config/metrics";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string;
  badge?: string;
  iconName: string;
}

export const achievements: Achievement[] = [
  {
    id: "registered_business",
    title: "Registered Business",
    description: "You are dealing with an official entity, not an anonymous internet profile.",
    badge: branding.rcNumber,
    iconName: "shield"
  },
  {
    id: "transaction_record",
    title: "Proven Transaction Record",
    description: "Safe, compliant peer-to-peer cryptocurrency handling.",
    metric: `Over ${metrics.totalVolume} in total P2P volume handled in ${metrics.activeSince}`,
    iconName: "wallet"
  },
  {
    id: "human_support",
    title: "Real Human Support",
    description: "You deal directly with me, getting clear answers and practical guidance.",
    metric: "Direct access to JAKE for continuous learning",
    iconName: "headset"
  }
];
