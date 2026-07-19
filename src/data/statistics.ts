import { metrics } from "../config/metrics";

export interface StatCard {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export const statistics: StatCard[] = [
  {
    id: "total_volume",
    value: metrics.totalVolume,
    label: "Total Volume (2026)",
    description: "Verified direct P2P transaction volume"
  },
  {
    id: "avg_monthly",
    value: metrics.avgMonthlyVolume,
    label: "Average Monthly",
    description: "Monthly asset conversion capability"
  },
  {
    id: "avg_daily",
    value: metrics.avgDailyVolume,
    label: "Average Daily",
    description: "Consistent daily transacting liquidity"
  },
  {
    id: "community_members",
    value: `${metrics.communitySize} members`,
    label: "WhatsApp Learning Hub",
    description: "High-signal Web3 network members"
  },
  {
    id: "testnets_completed",
    value: `${metrics.testnetsCompleted} active runs`,
    label: "Testnets Explored",
    description: "Hand-on technical interactions"
  }
];
