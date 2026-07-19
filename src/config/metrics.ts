export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface BusinessMetrics {
  totalVolume: string;
  totalVolumeRaw: string; // "Over ₦35M+" or "₦35M+"
  avgMonthlyVolume: string;
  avgDailyVolume: string;
  communitySize: string;
  testnetsCompleted: string;
  tradesCompleted: string;
  clientsSupported: string;
  activeSince: string;
  lastUpdated: string;
}

export const metrics: BusinessMetrics = {
  totalVolume: "₦35M+",
  totalVolumeRaw: "₦35M+",
  avgMonthlyVolume: "₦7M+",
  avgDailyVolume: "₦233K+",
  communitySize: "200+",
  testnetsCompleted: "50+",
  tradesCompleted: "97+",
  clientsSupported: "100+",
  activeSince: "2025",
  lastUpdated: "2026-07-10"
};
