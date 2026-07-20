import { useRoute, Link } from "wouter";
import { SEO } from "@/components/shared/seo";
import { branding } from "@/config/branding";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { projects } from "@/data/portfolio";
import { contact } from "@/config/contact";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Terminal, 
  ArrowRight,
  Cpu,
  Workflow,
  Sparkles,
  Layers,
  Check,
  Calendar,
  Lock,
  MessageCircle,
  Globe,
  DollarSign,
  AlertCircle,
  Search,
  Zap,
  TrendingUp
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const projectId = params?.id;
  
  const project = projects.find(p => p.id === projectId);

  // States for Gold Marine Group verification simulator
  const [certSearchQuery, setCertSearchQuery] = useState("GM-2026-9042");
  const [certResult, setCertResult] = useState<any>({
    found: true,
    certId: "GM-2026-9042",
    recipient: "International Logistics Ltd.",
    certType: "ISO-9001 Maritime Safety Standard",
    status: "VERIFIED & ACTIVE",
    issueDate: "June 14, 2026"
  });
  const [certLoading, setCertLoading] = useState(false);

  const handleCertSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCertLoading(true);
    setTimeout(() => {
      if (certSearchQuery.trim().toUpperCase() === "GM-2026-9042") {
        setCertResult({
          found: true,
          certId: "GM-2026-9042",
          recipient: "International Logistics Ltd.",
          certType: "ISO-9001 Maritime Safety Standard",
          status: "VERIFIED & ACTIVE",
          issueDate: "June 14, 2026"
        });
      } else if (certSearchQuery.trim() === "") {
        setCertResult(null);
      } else {
        setCertResult({
          found: false,
          certId: certSearchQuery.toUpperCase()
        });
      }
      setCertLoading(false);
    }, 600);
  };

  // States for Pi Network testnet transaction simulation
  const [blockTxList, setBlockTxList] = useState([
    { tx: "0x8fa3...c28b", from: "GDAK...920J", to: "W3C_POOL_A", amount: "2,500 W3C", time: "Just now" },
    { tx: "0x3e12...b45f", from: "GB92...88A2", to: "W3C_POOL_B", amount: "5,000 W3C", time: "3s ago" },
    { tx: "0x77c2...11b4", from: "GCOE...192K", to: "W3C_POOL_A", amount: "1,200 W3C", time: "12s ago" }
  ]);

  useEffect(() => {
    if (project?.id === "w3c-test-token-tracker") {
      const interval = setInterval(() => {
        const randomHex = Math.random().toString(16).substr(2, 4);
        const randomFrom = "G" + Math.random().toString(36).substr(2, 4).toUpperCase() + "..." + Math.random().toString(36).substr(2, 4).toUpperCase();
        const randomAmount = (Math.floor(Math.random() * 80) + 10) * 100;
        
        setBlockTxList(prev => [
          {
            tx: `0x${randomHex}...${Math.random().toString(16).substr(2, 4)}`,
            from: randomFrom,
            to: Math.random() > 0.5 ? "W3C_POOL_A" : "W3C_POOL_B",
            amount: `${randomAmount.toLocaleString()} W3C`,
            time: "Just now"
          },
          ...prev.slice(0, 2)
        ]);
      }, 5000);
      return () => clearInterval(interval);
    }
    return;
  }, [project]);

  // States for CEECAR bot simulation
  const [botMessages, setBotMessages] = useState([
    { sender: "user", text: "/balance", time: "10:14 AM" },
    { sender: "bot", text: "💰 Balance Details:\n- Exchange: Gate.io\n- Available USDT: $12,450.00\n- Locked in Trades: $3,200.00\n- Total Equity: $15,650.00", time: "10:14 AM" }
  ]);
  const [botInput, setBotInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const handleSendBotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;

    const userMsg = botInput;
    setBotMessages(prev => [...prev, { sender: "user", text: userMsg, time: "Just now" }]);
    setBotInput("");
    setBotTyping(true);

    setTimeout(() => {
      let reply = "";
      if (userMsg.toLowerCase().startsWith("/order")) {
        reply = "⚡ Order Setup:\n- Asset: BTC/USDT\n- Side: BUY\n- Type: LIMIT\n- Price: $52,000.00\n\n⚠️ Awaiting final confirmation via Multi-Sig. Send /confirm to execute.";
      } else if (userMsg.toLowerCase() === "/confirm") {
        reply = "✓ Trade Executed Successfully!\n- Order ID: #CEE-90142\n- Size: 0.15 BTC\n- Settled via Gate.io API\n- Notifications pushed to discord.";
      } else {
        reply = "🤖 CEECAR Trading Assistant active.\n\nAvailable Commands:\n- /balance: Check connected API account status\n- /order limit buy btc 52000: Queue a spot trade\n- /confirm: Authorize active queued trades";
      }
      setBotMessages(prev => [...prev, { sender: "bot", text: reply, time: "Just now" }]);
      setBotTyping(false);
    }, 1000);
  };

  if (!project) {
    return (
      <PageTransition>
        <section className="py-32 bg-black min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-md">
            <h1 className="text-4xl font-display font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project case study you are looking for does not exist or has been archived.
            </p>
            <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  // Navigation indexes
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];
  const nextProject = projects[currentIndex + 1] || projects[0];

  // Render Custom Mockup depending on Project ID
  const renderMockup = () => {
    switch (project.id) {
      case "w3c-digital-network":
        return (
          <div className="rounded-2xl border border-white/10 bg-[#0F0F12] overflow-hidden shadow-2xl">
            {/* Browser Header */}
            <div className="bg-[#18181F] border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="bg-black/30 border border-white/[0.05] rounded-md px-3 py-0.5 text-[10px] text-white/40 font-mono flex items-center justify-center gap-1 max-w-xs mx-auto flex-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">web3currency.online</span>
              </div>
              <div className="w-6" />
            </div>
            {/* Preview of Home/Hero screen */}
            <div className="p-6 bg-black min-h-[300px] flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                    <span className="text-[9px] text-black font-black">W</span>
                  </div>
                  <span className="text-[10px] font-bold text-white tracking-wider">W3C DIGITAL</span>
                </div>
                <span className="text-[8px] font-mono text-white/40">● LIVE WORKSPACE</span>
              </div>

              <div className="space-y-3 my-auto">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-bold text-primary uppercase tracking-widest inline-block">
                  Flagship Product
                </span>
                <h4 className="text-2xl font-display font-black text-white leading-tight">
                  Real Work. <br />
                  <span className="text-primary italic">Real Progress.</span>
                </h4>
                <p className="text-[11px] text-white/60 max-w-xs leading-relaxed">
                  Every project represents a problem solved, a skill improved, or an idea brought to life.
                </p>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-white/[0.05] mt-4">
                <span className="px-3 py-1.5 bg-[#25D366] text-black font-mono font-bold text-[9px] rounded uppercase">WhatsApp Chat</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white font-mono font-bold text-[9px] rounded uppercase">Services</span>
              </div>
            </div>
          </div>
        );

      case "gold-marine-group":
        return (
          <div className="rounded-2xl border border-white/10 bg-[#0A0B0E] overflow-hidden shadow-2xl">
            {/* Browser Header */}
            <div className="bg-[#12141A] border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="bg-black/30 border border-white/[0.05] rounded-md px-3 py-0.5 text-[10px] text-white/40 font-mono flex items-center justify-center gap-1 max-w-xs mx-auto flex-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">goldmarinegroup.com/verify</span>
              </div>
              <div className="w-6" />
            </div>
            
            {/* Interactive database search console */}
            <div className="p-5 bg-[#08090C] text-left">
              <div className="mb-4">
                <h4 className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
                  Certificate Verification Module
                </h4>
                <p className="text-[9px] text-white/40">
                  Secure database search for issued maritime training certificates.
                </p>
              </div>

              <form onSubmit={handleCertSearch} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Enter Code (e.g. GM-2026-9042)"
                    value={certSearchQuery}
                    onChange={(e) => setCertSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-500/50"
                  />
                  <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-white/30" />
                </div>
                <button 
                  type="submit" 
                  disabled={certLoading}
                  className="px-3.5 bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-bold font-mono transition-colors disabled:opacity-50"
                >
                  {certLoading ? "..." : "QUERY"}
                </button>
              </form>

              {/* Display Result */}
              <div className="bg-black/60 border border-white/[0.04] rounded-lg p-3 min-h-[110px] font-mono text-[10px] text-white/60 space-y-1.5 relative overflow-hidden">
                {certLoading ? (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-emerald-400 text-xs gap-2">
                    <span className="animate-spin text-lg">⚙</span> Running query...
                  </div>
                ) : certResult ? (
                  certResult.found ? (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center border-b border-white/[0.05] pb-1.5 mb-1.5">
                        <span className="font-bold text-emerald-400">STATUS: {certResult.status}</span>
                        <span className="text-[9px] text-white/30">{certResult.certId}</span>
                      </div>
                      <div><span className="text-white/30">Holder:</span> <span className="text-white">{certResult.recipient}</span></div>
                      <div><span className="text-white/30">Standard:</span> <span className="text-white">{certResult.certType}</span></div>
                      <div><span className="text-white/30">Issued:</span> <span className="text-white">{certResult.issueDate}</span></div>
                    </div>
                  ) : (
                    <div className="text-center py-4 space-y-1.5">
                      <AlertCircle className="w-5 h-5 text-red-500 mx-auto" />
                      <div className="text-red-400 font-bold">CERTIFICATE NOT FOUND</div>
                      <div className="text-[9px] text-white/30">Verification code "{certResult.certId}" did not match database index.</div>
                    </div>
                  )
                ) : (
                  <div className="text-center py-6 text-white/30">
                    Enter verification certificate number above to run live DB lookup.
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "w3c-test-token-tracker":
        return (
          <div className="rounded-2xl border border-white/10 bg-[#090C0F] overflow-hidden shadow-2xl">
            {/* Browser Header */}
            <div className="bg-[#11161C] border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="bg-black/30 border border-white/[0.05] rounded-md px-3 py-0.5 text-[10px] text-white/40 font-mono flex items-center justify-center gap-1 max-w-xs mx-auto flex-1">
                <Lock className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                <span className="truncate">tw3c-tracker.vercel.app</span>
              </div>
              <div className="w-6" />
            </div>

            {/* Dashboard area with transaction streams */}
            <div className="p-5 text-left font-mono">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.05]">
                <div>
                  <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Pi Net Testnet Console</h4>
                  <p className="text-[9px] text-white/40">Tracking token: W3C_TEST</p>
                </div>
                <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] text-blue-400 animate-pulse font-bold">
                  ● ACTIVE FEED
                </div>
              </div>

              {/* Transactions list */}
              <div className="space-y-2 mb-4">
                <span className="text-[8px] text-white/30 block uppercase tracking-wider">Latest Ledger Entries</span>
                <div className="space-y-1.5">
                  {blockTxList.map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/[0.03] p-2 rounded text-[9px]">
                      <div className="flex gap-2 items-center">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-white/30">{tx.tx}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-300 font-bold">{tx.amount}</span>
                        <span className="text-[8px] text-white/20 block">{tx.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats banner */}
              <div className="grid grid-cols-2 gap-2 text-center text-[9px] bg-black border border-white/5 p-2 rounded">
                <div>
                  <span className="text-white/30 block uppercase">Circulating Supply</span>
                  <span className="text-white font-bold">1,000,000 W3C</span>
                </div>
                <div>
                  <span className="text-white/30 block uppercase">Active Pool depth</span>
                  <span className="text-blue-400 font-bold">84,520 W3C</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "ceecar":
        return (
          <div className="rounded-2xl border border-white/10 bg-[#0C0B0F] overflow-hidden shadow-2xl">
            {/* Telegram simulated screen */}
            <div className="bg-[#14121A] border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="text-left">
                <h5 className="text-[10px] font-bold text-white">CEECAR trading bot</h5>
                <span className="text-[8px] text-amber-400 block font-mono">bot assistant active</span>
              </div>
            </div>

            <div className="p-4 bg-[#09080B] min-h-[180px] max-h-[220px] overflow-y-auto text-left text-[10px] font-mono space-y-3 flex flex-col justify-end">
              {botMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-xl border max-w-[85%] whitespace-pre-line ${
                    msg.sender === "user" 
                      ? "bg-white/5 border-white/10 text-white ml-auto rounded-tr-none text-right" 
                      : "bg-amber-950/20 border-amber-500/20 text-amber-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {botTyping && (
                <div className="bg-amber-950/20 border border-amber-500/20 p-2 rounded-xl text-amber-300 w-20 text-center animate-pulse rounded-tl-none">
                  typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSendBotMessage} className="p-3 bg-[#111015] border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                placeholder="Type command (/order limit buy btc 52000)"
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-[10px] focus:outline-none focus:border-amber-500/50"
              />
              <button 
                type="submit"
                className="px-3 bg-amber-500 text-black font-bold rounded-lg text-[10px]"
              >
                SEND
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${project.title} Case Study`,
    "description": project.shortDescription,
    "image": "https://web3currency.online/opengraph.jpg",
    "url": `https://web3currency.online/projects/${project.id}`,
    "author": {
      "@type": "Person",
      "name": branding.founderName
    }
  };

  return (
    <PageTransition>
      <SEO 
        title={`${project.title} Case Study | ${branding.businessName}`} 
        description={project.shortDescription}
        path={`/projects/${project.id}`}
        schema={projectSchema}
      />
      
      <section className="pt-32 pb-24 bg-black min-h-screen">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Back to Projects */}
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          {/* Title & Header Info */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
                  {project.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${project.statusColorClass}`}>
                  {project.status}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-none">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed font-medium">
                {project.shortDescription}
              </p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Core Highlights</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-5 w-full">
              <GlassCard className="border-white/10 p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-primary font-bold mb-1">My Role</h4>
                  <p className="text-white text-sm font-medium">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-primary font-bold mb-1">Status</h4>
                  <p className="text-white text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
                    {project.status}
                  </p>
                </div>
                {project.externalLink && (
                  <div className="pt-2">
                    <a 
                      href={project.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors"
                    >
                      <span>Visit Live Platform</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </a>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>

          {/* Interactive Mockup & Overview Split */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-primary font-bold">Project Overview</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {project.overview}
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Every project handled is built directly around utility, security, and exceptional performance. We avoid exaggerated claims and let the code, numbers, and direct operational feedback stand as the proof.
              </p>
            </div>
            
            {/* Custom Interactive Mockup Frame */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative p-1 rounded-3xl bg-white/[0.05]">
                <div className="rounded-2xl bg-black p-2 border border-white/5">
                  {renderMockup()}
                </div>
              </div>
              <p className="text-center text-[10px] text-white/30 font-mono mt-3">
                ▲ Real-time visual mockup. Try interacting above.
              </p>
            </div>
          </div>

          {/* Case Study Core Grid (Challenge, Solution) */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <GlassCard className="p-8 border-white/5 bg-white/[0.01] hover:border-primary/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">The Challenge</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {project.challenge}
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-white/[0.01] hover:border-primary/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">The Solution</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {project.solution}
              </p>
            </GlassCard>
          </div>

          {/* Key Features & Technologies Used Sections */}
          <div className="grid md:grid-cols-12 gap-10 items-start mb-24 border-y border-white/[0.08] py-16">
            
            {/* Key Features */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">Engineered Functions</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Key Features</h3>
              <div className="space-y-4">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs shrink-0 font-mono font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-muted-foreground text-sm sm:text-base">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="md:col-span-5 space-y-6">
              <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">Toolkit Specifications</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white font-mono text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Future Improvements Section (Only for Active or In Development projects) */}
          {(project.status.includes("Active") || project.status.includes("Development") || project.status.includes("Prototype")) && project.futureImprovements && (
            <GlassCard className="p-8 md:p-10 border-primary/20 bg-primary/[0.02] mb-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">Future Improvements</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-white">Roadmap & Iteration Plan</h4>
                <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
                  As part of W3C Digital Network's commitment to continuous craftsmanship, the following developments are outlined for upcoming deployment loops:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {project.futureImprovements.map((imp, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-start gap-3">
                      <Zap className="w-4 h-4 text-primary shrink-0 mt-1" />
                      <span className="text-white/80 text-sm leading-relaxed">{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Lessons Learned */}
          <div className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl mb-24">
            <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold mb-4">Lessons & Insights</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {project.lessonsLearned}
            </p>
          </div>

          {/* Previous / Next Project Navigation */}
          <div className="border-t border-white/10 pt-12 pb-24 flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href={`/projects/${prevProject.id}`} className="group w-full sm:w-auto p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center gap-4 text-left">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-white/30 block uppercase font-bold">Previous Case Study</span>
                <span className="text-white font-display font-semibold text-sm group-hover:text-primary transition-colors">{prevProject.title}</span>
              </div>
            </Link>

            <Link href={`/projects/${nextProject.id}`} className="group w-full sm:w-auto p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center justify-between gap-4 text-right">
              <div className="flex-1">
                <span className="text-[10px] font-mono text-white/30 block uppercase font-bold">Next Case Study</span>
                <span className="text-white font-display font-semibold text-sm group-hover:text-primary transition-colors">{nextProject.title}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>

          {/* Final Case Study CTA */}
          <div className="text-center max-w-2xl mx-auto pt-8 border-t border-white/10">
            <h3 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">Interested in building something similar?</h3>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
              Let's speak plainly on WhatsApp about your requirements, project timelines, and practical strategies. No sales calls, just real-world builder answers.
            </p>
            <div className="flex justify-center">
              <a 
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-glow-hover inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-black font-bold rounded-xl hover:bg-[#20c05a] transition-all shadow-lg text-sm"
              >
                <SiWhatsapp className="w-5.5 h-5.5" />
                Let's talk on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
