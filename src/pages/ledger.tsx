import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { SEO } from "@/components/shared/seo";
import { branding } from "@/config/branding";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { 
  History as HistoryIcon, 
  ChevronDown,
  Search,
  X,
  Terminal,
  ArrowRightLeft,
  Clock
} from 'lucide-react';

// --- Types ---
type TradeType = 'BUY' | 'SELL';

interface Trade {
  id: string;
  type: TradeType;
  asset: string;
  username: string;
  phoneNumber?: string;
  quantity: number;
  amountUsdt: number;
  rate: number;
  amountNgn: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  timestamp: number;
  executionRate?: number;
  marketPrice?: number;
  profit?: number;
  bankTxId?: string;
  cryptoTxHash?: string;
}

interface UserData {
  balance: number;
  trades: Trade[];
}

const INITIAL_DATA: UserData = {
  balance: 0,
  trades: []
};

// --- Helper Components ---

const TerminalText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${className}`}>
    {children}
  </span>
);

export default function LedgerPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Handle PWA installation prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    });

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsAppInstalled(true);
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [analyticsPeriod, setAnalyticsPeriod] = useState<string>('CURRENT');
  const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({});
  const [userData, setUserData] = useState<UserData>(INITIAL_DATA);
  const [viewingTrade, setViewingTrade] = useState<Trade | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial trades from Supabase
  const fetchTrades = async () => {
    console.log('[Ledger Page] fetchTrades initiated. Checking Supabase client...');
    if (!supabase) {
      console.error('[Ledger Page] fetchTrades aborted: Supabase client is not initialized.');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setUserData(prev => ({
          ...prev,
          trades: data as Trade[]
        }));
      }
    } catch (err: any) {
      console.error('[Ledger Page] Operational error encountered in fetchTrades:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Calculated Stats
  const stats = useMemo(() => {
    const trades = userData.trades || [];
    
    // Filtering window
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

    const filteredTrades = trades.filter(t => {
      const d = new Date(t.timestamp);
      const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

      if (analyticsPeriod === '24H') {
        const diffHours = (now.getTime() - t.timestamp) / 3600000;
        return diffHours <= 24;
      }
      if (analyticsPeriod === 'CURRENT') {
        return mKey === currentMonthKey;
      }
      if (analyticsPeriod === 'LAST') {
        return mKey === lastMonthKey;
      }
      return mKey === analyticsPeriod;
    });

    // All-time metrics
    const allTimeVolume = trades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);
    const allTimeCount = trades.length;

    // Filtered window metrics
    const filteredTradesVolume = filteredTrades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);
    const filteredTradesCount = filteredTrades.length;

    // Buy / Sell balance in the filtered window
    const buyTrades = filteredTrades.filter(t => t.type === 'BUY');
    const sellTrades = filteredTrades.filter(t => t.type === 'SELL');
    
    const totalAmountIn = buyTrades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);
    const totalSellNaira = sellTrades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);

    const totalFilteredVolume = totalAmountIn + totalSellNaira;
    const buyPercent = totalFilteredVolume > 0 ? (totalAmountIn / totalFilteredVolume) * 100 : 50;

    // Top traded asset
    const assetMap = trades.reduce((acc, t) => {
      acc[t.asset] = (acc[t.asset] || 0) + (t.amountNgn || 0);
      return acc;
    }, {} as Record<string, number>);
    const topTradedAsset = Object.entries(assetMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      allTimeVolume,
      allTimeCount,
      filteredTradesVolume,
      filteredTradesCount,
      totalAmountIn,
      totalSellNaira,
      buyPercent,
      topTradedAsset
    };
  }, [userData.trades, analyticsPeriod]);

  // Month grouping for transactions history tab
  const groupedTrades = useMemo(() => {
    const list = userData.trades || [];
    const filtered = list.filter(t => {
      if (!searchTerm) return true;
      const lower = searchTerm.toLowerCase();
      return (
        t.username.toLowerCase().includes(lower) ||
        t.asset.toLowerCase().includes(lower) ||
        t.cryptoTxHash?.toLowerCase().includes(lower) ||
        t.bankTxId?.toLowerCase().includes(lower)
      );
    });

    const groups: Record<string, { label: string, totalIn: number, totalOut: number, trades: Trade[] }> = {};
    
    filtered.forEach(trade => {
      const d = new Date(trade.timestamp);
      const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

      if (!groups[mKey]) {
        groups[mKey] = { label, totalIn: 0, totalOut: 0, trades: [] };
      }

      if (trade.type === 'BUY') {
        groups[mKey].totalIn += trade.amountNgn || 0;
      } else {
        groups[mKey].totalOut += trade.amountNgn || 0;
      }
      groups[mKey].trades.push(trade);
    });

    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [userData.trades, searchTerm]);

  const toggleMonth = (key: string) => {
    setCollapsedMonths(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const maskPhoneNumber = (num: string) => {
    if (!num) return 'UNKNOWN';
    if (num.length < 7) return num;
    return `${num.slice(0, 4)}***${num.slice(-3)}`;
  };

  const ledgerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "W3C DESK Transparency Ledger",
    "description": `Verify public execution histories, trace recorded naira transactions, or direct access ${branding.founderName}'s official Web3Currency Desk.`,
    "url": "https://web3currency.online/ledger"
  };

  return (
    <PageTransition>
      <SEO 
        title="W3C DESK Transparency Ledger" 
        description={`Verify public execution histories, trace recorded naira transactions, or direct access ${branding.founderName}'s official Web3Currency Desk.`}
        path="/ledger"
        schema={ledgerSchema}
      />
      
      <div className="min-h-screen bg-black text-white relative pt-24 pb-8">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade opacity-30" />
        </div>

        {/* Central Stage Wrapper */}
        <div className="container max-w-2xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col min-h-[75vh]">
          <div className="space-y-8">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                W3C DESK Transparency Ledger
              </h1>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xl">
                We don't ask you to trust us blindly. Every completed trade is publicly logged below so you can verify our volume, rates, and transaction history.
              </p>
            </div>

            {/* Total Volume Card */}
            <GlassCard className="p-8 relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/5 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <TerminalText className="text-purple-500 font-bold">Total Volume Traded</TerminalText>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
                  ₦{(stats.allTimeVolume || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <TerminalText className="text-purple-500">NGN</TerminalText>
              </div>
              <div className="mt-6 flex gap-4">
                <div className="flex-1 p-3 rounded-xl backdrop-blur-md border border-white/[0.05] bg-purple-500/5">
                  <TerminalText className="text-white/30 block mb-1">Total Trades</TerminalText>
                  <span className="text-purple-500 font-mono text-base font-bold">{stats.allTimeCount}</span>
                </div>
                <div className="flex-1 p-3 rounded-xl backdrop-blur-md border border-white/[0.05] bg-purple-500/5">
                  <TerminalText className="text-white/30 block mb-1">Top Traded Asset</TerminalText>
                  <span className="text-purple-500 font-mono text-base font-bold truncate block">{stats.topTradedAsset}</span>
                </div>
              </div>
            </GlassCard>

            {/* Timeframe Selector Section */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500/40" />
                <TerminalText className="text-white/60 font-bold">Analysis Window</TerminalText>
              </div>
              <select 
                value={analyticsPeriod}
                onChange={(e) => setAnalyticsPeriod(e.target.value)}
                className="rounded-xl px-4 py-2.5 text-xs font-mono font-bold outline-none transition-all border appearance-none pr-10 relative bg-[#0A0A0A] border-white/10 text-white/85 focus:border-purple-500/50 hover:bg-white/[0.08]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
              >
                <option value="24H" className="bg-[#0A0A0A] text-white">24H Snapshot</option>
                <option value="CURRENT" className="bg-[#0A0A0A] text-white">This Month</option>
                <option value="LAST" className="bg-[#0A0A0A] text-white">Last Month</option>
                {userData.trades && (Array.from(new Set(userData.trades.map(t => {
                  const d = new Date(t.timestamp);
                  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                }))) as string[]).sort((a, b) => b.localeCompare(a)).map(monthKey => {
                  const [y, m] = monthKey.split('-');
                  const label = new Date(Number(y), Number(m) - 1).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
                  
                  const now = new Date();
                  const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                  const lastKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;
                  
                  if (monthKey === currentKey || monthKey === lastKey) return null;
                  return <option key={monthKey} value={monthKey} className="bg-[#0A0A0A] text-white">{label}</option>;
                })}
              </select>
            </div>

            {/* MARKET ANALYTICS CARD */}
            <GlassCard className="p-6 relative border border-white/5 space-y-6 bg-gradient-to-br from-[#0A0A0A] to-[#0D0D0D]">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05]">
                  <TerminalText className="text-white/30 block mb-1">Period Volume</TerminalText>
                  <div className="font-bold text-lg sm:text-xl tracking-tight text-[#BF00FF] font-mono">
                    ₦{(stats.filteredTradesVolume || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05]">
                  <TerminalText className="text-white/30 block mb-1">Trade Count</TerminalText>
                  <div className="font-bold text-lg sm:text-xl tracking-tight text-white font-mono">{stats.filteredTradesCount}</div>
                </div>
              </div>
              
              {/* Buy vs Sell Split */}
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-[0.1em] font-bold">
                  <span className="text-[#00FF00]">BUY</span>
                  <span className="text-red-500">SELL</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden flex bg-white/[0.05]">
                  <div 
                    className="h-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-1000" 
                    style={{ width: `${stats.buyPercent}%` }} 
                  />
                  <div 
                    className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-1000" 
                    style={{ width: `${100 - stats.buyPercent}%` }} 
                  />
                </div>
              </div>

              {/* BUY / SELL BAR SUB-METRICS */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div id="card-total-in-buys" className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05] flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-[#00FF00]" />
                    <TerminalText className="text-white/30">TOTAL IN (BUYS)</TerminalText>
                  </div>
                  <div className="font-bold text-lg sm:text-xl tracking-tight text-white font-mono">
                    ₦{(stats.totalAmountIn || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div id="card-total-out-sells" className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05] flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-red-500" />
                    <TerminalText className="text-white/30">TOTAL OUT (SELLS)</TerminalText>
                  </div>
                  <div className="font-bold text-lg sm:text-xl tracking-tight text-white font-mono">
                    ₦{(stats.totalSellNaira || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* INTEGRATED TRANSACTION HISTORY LOG */}
            <div id="transaction-history-log" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
              <div className="flex items-center gap-2 px-1">
                <HistoryIcon className="w-4 h-4 text-purple-500" />
                <TerminalText className="text-purple-500 font-bold uppercase tracking-wider">TRANSACTION LOGS</TerminalText>
              </div>

              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search phone, asset or TX hash..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input w-full pl-11 pr-11 py-3.5 rounded-xl font-mono text-xs outline-none bg-[#050505] text-white border border-white/5 focus:border-purple-500/50 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-white/40 hover:text-white" />
                  </button>
                )}
              </div>

              <div className="space-y-10">
                {groupedTrades.length > 0 ? (
                  groupedTrades.map(([monthKey, group]) => (
                    <div key={monthKey} className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <button 
                            onClick={() => toggleMonth(monthKey)}
                            className="flex items-center gap-1 text-lg font-bold tracking-tight text-white"
                          >
                            <TerminalText className="text-inherit">{group.label}</TerminalText>
                            <ChevronDown className={`w-4 h-4 transform transition-transform text-white/40 ${collapsedMonths[monthKey] ? '-rotate-90' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {!collapsedMonths[monthKey] && (
                        <div className="space-y-1 border-t border-white/5 pt-4">
                          {group.trades.map((trade) => (
                            <button 
                              key={trade.id} 
                              onClick={() => setViewingTrade(trade)}
                              className="w-full flex items-center justify-between p-3.5 rounded-xl transition-colors hover:bg-white/[0.03] text-left group"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/[0.05] bg-white/[0.05] transition-colors">
                                  {trade.type === 'BUY' ? (
                                    <ArrowRightLeft className="w-4 h-4 text-[#00FF00]" />
                                  ) : (
                                    <ArrowRightLeft className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                  <div className="text-sm font-bold tracking-tight text-white group-hover:text-[#BF00FF] transition-colors truncate">
                                    {maskPhoneNumber(trade.username)} {trade.type === 'BUY' ? 'buys' : 'sells'} {trade.asset}
                                  </div>
                                  <div className="text-[10px] font-mono font-bold text-white/60">
                                    {new Date(trade.timestamp).toLocaleDateString(undefined, { 
                                      month: 'short', 
                                      day: 'numeric', 
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right space-y-0.5 shrink-0 ml-2">
                                <div className={`text-sm font-bold font-mono ${trade.type === 'BUY' ? 'text-[#00FF00]' : 'text-red-500'}`}>
                                  {trade.type === 'BUY' ? '+' : '-'}₦{(trade.amountNgn || 0).toLocaleString()}
                                </div>
                                <div className="text-[8px] uppercase tracking-widest font-black text-purple-500/80">
                                  Success
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border border-white/5 bg-white/5 transition-colors">
                      <HistoryIcon className="w-10 h-10 text-white/10" />
                    </div>
                    <div className="space-y-2">
                      <TerminalText className="text-white/60 font-bold uppercase tracking-widest">No entries found</TerminalText>
                      <p className="text-xs max-w-[240px] mx-auto leading-relaxed text-white/20">
                        The transaction execution log is empty.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trade Details Dialog */}
          <AnimatePresence>
            {viewingTrade && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] backdrop-blur-md flex items-center justify-center p-6 bg-black/90"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setViewingTrade(null);
                }}
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="w-full max-w-[95%] sm:max-w-sm glass-card rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-2xl border border-white/10 bg-[#020202] text-white relative"
                >
                  <button 
                    onClick={() => setViewingTrade(null)} 
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/40 hover:text-white" />
                  </button>

                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                      {viewingTrade.type === 'BUY' ? (
                        <ArrowRightLeft className="w-7 h-7 text-[#00FF00]" />
                      ) : (
                        <ArrowRightLeft className="w-7 h-7 text-red-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight uppercase text-white">Trade details</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase ${viewingTrade.type === 'BUY' ? 'bg-[#00FF00]/10 text-[#00FF00]' : 'bg-red-500/10 text-red-500'}`}>
                      {viewingTrade.type === 'BUY' ? 'Client Buys' : 'Client Sells'} {viewingTrade.asset}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05]">
                        <TerminalText className="text-white/60 block mb-1 text-[9px]">Phone Number</TerminalText>
                        <div className="font-bold text-xs truncate text-white">{maskPhoneNumber(viewingTrade.username)}</div>
                      </div>
                      <div className="p-3 rounded-xl border bg-white/[0.02] border-white/[0.05]">
                        <TerminalText className="text-white/60 block mb-1 text-[9px]">Units</TerminalText>
                        <div className="font-bold text-xs font-mono text-white">{viewingTrade.quantity}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border bg-white/[0.02] border-white/[0.05] space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <TerminalText className="text-white/60">Rate</TerminalText>
                        <span className="font-mono text-white">₦{viewingTrade.rate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <TerminalText className="text-white/60">Amount (USDT)</TerminalText>
                        <span className="font-mono text-white">${viewingTrade.amountUsdt.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                        <TerminalText className={`${viewingTrade.type === 'BUY' ? 'text-[#00FF00]' : 'text-red-500'} font-black text-xs`}>Total (NGN)</TerminalText>
                        <span className={`font-mono text-base font-bold ${viewingTrade.type === 'BUY' ? 'text-[#00FF00]' : 'text-red-500'}`}>₦{viewingTrade.amountNgn.toLocaleString()}</span>
                      </div>
                      
                      {(viewingTrade.bankTxId || viewingTrade.cryptoTxHash) && (
                        <div className="pt-4 space-y-4">
                          {viewingTrade.type === 'SELL' && viewingTrade.bankTxId && (
                            <div className="space-y-1">
                              <TerminalText className="text-white/50 text-[10px] block font-bold mb-1">Bank Transaction ID</TerminalText>
                              <div className="font-mono text-[10px] break-all p-2 rounded-lg border text-purple-400 bg-purple-500/5 border-purple-500/10">
                                {viewingTrade.bankTxId}
                              </div>
                            </div>
                          )}
                          {viewingTrade.type === 'BUY' && viewingTrade.cryptoTxHash && (
                            <div className="space-y-1">
                              <TerminalText className="text-white/50 text-[10px] block font-bold mb-1">Crypto Transaction Hash</TerminalText>
                              <div className="font-mono text-[10px] break-all p-2 rounded-lg border text-[#BF00FF] bg-[#BF00FF]/5 border-[#BF00FF]/10">
                                {viewingTrade.cryptoTxHash}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <TerminalText className="text-white/20 text-[10px]">
                        TRANSACTION DATE: {new Date(viewingTrade.timestamp).toLocaleDateString(undefined, {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TerminalText>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
