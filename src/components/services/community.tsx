import { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackCommunityJoin } from "@/lib/analytics";

type Answer = { question: string; answer: string };

const questions = [
  {
    id: "reason",
    question: "What brought you here?",
    options: [
      "I want to learn Web3",
      "I'm interested in crypto",
      "I want to learn about AI",
      "I want to meet people and connect",
      "I want W3C updates",
      "I'm looking for opportunities",
      "I need help with something",
      "I'm just exploring",
    ],
  },
  {
    id: "web3",
    question: "Where are you with Web3?",
    options: ["I'm completely new", "I know the basics", "I've been learning for a while", "I'm already active in Web3"],
  },
  {
    id: "crypto",
    question: "What part of crypto interests you most?",
    options: ["Bitcoin and major cryptocurrencies", "Trading", "Pi Network", "DeFi and Web3", "I'm still learning the basics"],
  },
  {
    id: "ai",
    question: "What are you most interested in learning about AI?",
    options: ["Using AI for everyday work", "AI for business", "AI tools", "Building with AI", "I'm just getting started"],
  },
  {
    id: "connect",
    question: "What kind of connection are you looking for?",
    options: ["People learning like me", "Builders and creators", "Crypto/Web3 people", "AI-focused people", "General digital community"],
  },
  {
    id: "updates",
    question: "What updates do you want?",
    options: ["W3C news and projects", "Web3 and crypto", "AI and digital technology", "All W3C updates"],
  },
  {
    id: "opportunity",
    question: "What kind of opportunity are you looking for?",
    options: ["Learning opportunities", "Work or freelance opportunities", "Web3 opportunities", "AI/digital opportunities", "I'm not sure yet"],
  },
  {
    id: "help",
    question: "What do you need help with?",
    options: ["Learning", "Crypto/Web3", "AI", "A digital project", "Finding the right W3C community", "Something else"],
  },
  {
    id: "exploring",
    question: "What sounds most useful to you?",
    options: ["Learning", "Crypto", "AI", "Meeting people", "W3C updates", "I'm not sure yet"],
  },
  {
    id: "experience",
    question: "How experienced are you?",
    options: ["Just starting", "Some experience", "Experienced", "It depends on the topic"],
  },
] as const;

const nextQuestion = (index: number, answers: Answer[]) => {
  if (index === 0) {
    const reason = answers.find((item) => item.question === questions[0].question)?.answer;
    const map: Record<string, number> = {
      "I want to learn Web3": 1,
      "I'm interested in crypto": 2,
      "I want to learn about AI": 3,
      "I want to meet people and connect": 4,
      "I want W3C updates": 5,
      "I'm looking for opportunities": 6,
      "I need help with something": 7,
      "I'm just exploring": 8,
    };
    return map[reason ?? ""] ?? 1;
  }
  return 9;
};

export default function CommunityService() {
  const brand = getServiceBrandColor("Web3 Community & Learning");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [safety, setSafety] = useState(false);

  const currentQuestion = questions[step];

  const selectAnswer = (answer: string) => {
    const updated = [...answers.filter((item) => item.question !== currentQuestion.question), { question: currentQuestion.question, answer }];
    setAnswers(updated);

    const next = nextQuestion(step, updated);
    setTimeout(() => {
      if (step === 9) {
        setSafety(true);
      } else {
        setStep(next);
      }
    }, 160);
  };

  const goBack = () => {
    if (safety) {
      setSafety(false);
      setStep(9);
      return;
    }
    if (step === 0) return;
    if (step === 9) {
      const first = answers.find((item) => item.question === questions[0].question);
      const previous = nextQuestion(0, answers);
      setStep(first ? previous : 0);
      return;
    }
    setStep(0);
  };

  const restart = () => {
    setAnswers([]);
    setSafety(false);
    setStep(0);
  };

  const proceedToJoin = () => {
    trackCommunityJoin("Community Questionnaire");
    window.open(contact.whatsappCommunityUrl, "_blank", "noopener,noreferrer");
  };

  if (safety) {
    return (
      <PageTransition>
        <SEO
          title={`W3C Community | ${branding.businessName}`}
          description="Join the W3C WhatsApp Community for practical Web3, crypto, AI, and digital learning."
          path="/services"
        />
        <section className="min-h-[70vh] py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <ShieldCheck className={`w-12 h-12 mx-auto mb-5 ${brand.twText}`} />
              <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-3`}>Before you join</p>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">W3C Community Safety Rules</h1>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mt-5">Please read these rules before joining. They help keep the community useful and safe for everyone.</p>
            </div>

            <div className="space-y-3">
              {[
                "No spam or scams.",
                "No impersonation of Jake, W3C, admins, or other members.",
                "Admins will not DM members first.",
                "No hype or guaranteed returns.",
                "Keep the community respectful and useful.",
              ].map((rule) => (
                <div key={rule} className={`flex items-start gap-3 rounded-2xl border ${brand.twBorder} ${brand.twBg} p-5`}>
                  <Check className={`w-5 h-5 shrink-0 mt-0.5 ${brand.twText}`} />
                  <p className="text-white/85 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <button type="button" onClick={goBack} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={proceedToJoin}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] text-black font-bold hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <SiWhatsapp className="w-5 h-5" />
                Proceed to Join Community
              </button>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={`W3C Community | ${branding.businessName}`}
        description="Join the W3C WhatsApp Community for practical Web3, crypto, AI, and digital learning."
        path="/services"
      />
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}15, transparent 70%)` }} />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className={"text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight max-w-4xl " + brand.twText}>
            Learn Web3, crypto and AI together.
          </h1>
          <p className="text-lg sm:text-xl text-white/75 leading-relaxed max-w-3xl mt-6">
            A free WhatsApp community for practical learning, useful discussions, and people exploring the digital space together. No hype, no guaranteed returns, and no need to be an expert.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="mb-8 text-center">
            <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText}`}>Let&apos;s get to know you</p>
          </div>

          <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-8" aria-hidden="true">
            <div className={`h-full rounded-full transition-all duration-300 ${brand.twBg}`} style={{ width: `${((step + 1) / 10) * 100}%` }} />
          </div>

          <div key={currentQuestion.id} className="transition-all duration-200">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-7">{currentQuestion.question}</h2>
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => {
                const selected = answers.some((item) => item.question === currentQuestion.question && item.answer === option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(option)}
                    className={`w-full text-left rounded-2xl border p-5 text-base sm:text-lg font-medium transition-all duration-150 hover:-translate-y-0.5 ${selected ? `${brand.twBorder} ${brand.twBg} text-white` : "border-white/10 bg-white/[0.02] text-white/85 hover:border-white/25"}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button type="button" onClick={goBack} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs text-white/45">No account or form to submit.</span>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
