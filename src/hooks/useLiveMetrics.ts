import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { metrics as fallbackMetrics } from '@/config/metrics';

export interface CalculatedMetrics {
  totalTrades: number;
  totalVolume: number;
  totalVolumeFormatted: string;
  avgMonthlyVolume: number;
  avgMonthlyVolumeFormatted: string;
  avgDailyVolume: number;
  avgDailyVolumeFormatted: string;
  lastTradeDate: string;
  isActive: boolean;
  supportedAssets: string[];
  loading: boolean;
}

// Helper to format currency in short form
export function formatNairaShort(value: number): string {
  if (value >= 1_000_000_000) {
    return `₦${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B+`;
  }
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M+`;
  }
  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K+`;
  }
  return `₦${value.toLocaleString()}`;
}

export function useLiveMetrics(): CalculatedMetrics {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const fetchTrades = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('trades')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && active) {
          setTrades(data);
        }
      } catch (err) {
        console.error('[useLiveMetrics] Failed to fetch live trades:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchTrades();
    return () => {
      active = false;
    };
  }, []);

  const metrics = useMemo<CalculatedMetrics>(() => {
    // If loading or no trades found, fall back gracefully to the original metrics
    if (trades.length === 0) {
      // Parse hardcoded values
      const parseValue = (valStr: string): number => {
        const clean = valStr.replace(/[^\d.]/g, '');
        const num = parseFloat(clean) || 0;
        if (valStr.includes('M')) return num * 1_000_000;
        if (valStr.includes('K')) return num * 1_000;
        if (valStr.includes('B')) return num * 1_000_000_000;
        return num;
      };

      const fallbackVol = parseValue(fallbackMetrics.totalVolume);
      const fallbackMonthly = parseValue(fallbackMetrics.avgMonthlyVolume);
      const fallbackDaily = parseValue(fallbackMetrics.avgDailyVolume);
      const fallbackTradesCount = parseInt(fallbackMetrics.tradesCompleted.replace(/[^\d]/g, ''), 10) || 91;

      return {
        totalTrades: fallbackTradesCount,
        totalVolume: fallbackVol,
        totalVolumeFormatted: fallbackMetrics.totalVolume,
        avgMonthlyVolume: fallbackMonthly,
        avgMonthlyVolumeFormatted: fallbackMetrics.avgMonthlyVolume,
        avgDailyVolume: fallbackDaily,
        avgDailyVolumeFormatted: fallbackMetrics.avgDailyVolume,
        lastTradeDate: fallbackMetrics.lastUpdated,
        isActive: true,
        supportedAssets: ['USDT', 'USDC', 'BTC', 'PI', 'SOL', 'TRX'],
        loading
      };
    }

    // Process from live trades
    const completedTrades = trades.filter(t => t.status === 'COMPLETED' || !t.status);
    const totalTrades = completedTrades.length || trades.length;
    
    const totalVolume = completedTrades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);

    // Calculate unique months to get average monthly
    const monthKeys = new Set(
      completedTrades.map(t => {
        const d = new Date(t.timestamp);
        return `${d.getFullYear()}-${d.getMonth()}`;
      })
    );
    const totalMonths = Math.max(1, monthKeys.size);
    const avgMonthlyVolume = totalVolume / totalMonths;

    // Daily volume
    const avgDailyVolume = totalVolume / (totalMonths * 30);

    // Last trade date formatting
    const mostRecentTimestamp = completedTrades[0]?.timestamp || trades[0]?.timestamp || 0;
    const lastTradeDateObj = mostRecentTimestamp ? new Date(mostRecentTimestamp) : new Date();
    const lastTradeDate = lastTradeDateObj.toISOString().split('T')[0];

    // Status is active if last trade was within 7 days, or default to true
    const isActive = mostRecentTimestamp ? (Date.now() - mostRecentTimestamp) < 7 * 24 * 60 * 60 * 1000 : true;

    // Supported assets
    const uniqueAssets = Array.from(new Set(trades.map(t => t.asset))).filter(Boolean);
    const supportedAssets = uniqueAssets.length > 0 ? uniqueAssets : ['USDT', 'USDC', 'BTC', 'PI'];

    return {
      totalTrades,
      totalVolume,
      totalVolumeFormatted: formatNairaShort(totalVolume),
      avgMonthlyVolume,
      avgMonthlyVolumeFormatted: formatNairaShort(avgMonthlyVolume),
      avgDailyVolume,
      avgDailyVolumeFormatted: formatNairaShort(avgDailyVolume),
      lastTradeDate,
      isActive,
      supportedAssets,
      loading: false
    };
  }, [trades, loading]);

  return metrics;
}
