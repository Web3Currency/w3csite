import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick, trackDeskEnquiry } from "@/lib/analytics";
import { FounderAvatar } from "@/components/shared/founder-avatar";

type AnswerMap = Record<string, string>;

type Question = {
  id: string;
  title: string;
  helper?: string;
  options: string[];
};

const rootQuestion: Question = {
  id: "tradeType",
  title: "What do you want to do?",
  options: ["Buy crypto", "Sell crypto"],
};

const assetQuestion: Question = {
  id: "asset",
  title: "Which crypto do you want to trade?",
  options: ["USDT", "USDC", "BTC", "PI", "Other asset"],
};

const sourceQuestions: Record<"buy" | "sell", Question> = {
  buy: {
    id: "destination",
    title: "Where would you like to receive the crypto?",
    options: ["Non-custodian wallet", "Exchange wallet"],
  },
  sell: {
    id: "source",
    title: "Where are you sending the crypto from?",
    options: ["Non-custodian wallet", "Exchange wallet"],
  },
};

const noteQuestion: Question = {
  id: "noteChoice",
  title: "Anything else Jake should know?",
  options: ["No, that’s all", "I have a question", "I need to explain something"],
};

function buildAmountHelper(asset: string) {
  switch (asset) {
    case "USDT":
    case "USDC":
      return "Enter the amount in USD. For example, 500 means 500 USDT or USDC.";
    case "BTC":
      return "Enter the exact BTC amount. For example, 0.005 BTC.";
    case "PI":
      return "Enter the exact PI amount. For example, 500 PI.";
    default:
      return "Enter the exact amount and unit. For example, 100 TOKEN.";
  }
}

function buildMessage(answers: AnswerMap) {
  const action = answers.tradeType === "Buy crypto" ? "BUY" : "SELL";
  const asset = answers.assetName || answers.asset;
  const location =
    answers.tradeType === "Buy crypto"
      ? "I’d like to receive the crypto in a " + answers.destination.toLowerCase() + "."
      : "I’m sending the crypto from a " + answers.source.toLowerCase() + ".";

  const note = answers.note && answers.note.trim();

  return [
    "Hi " + branding.founderName + ", I’d like to " + action + " " + answers.amount + " " + asset + " through W3C DESK.",
    location,
    note ? "Additional note: " + note : "",
    "Please let me know the next step.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CryptoP2P({ onNavigateToTab }: { onNavigateToTab: (tab: "consulting" | "desk" | "web" | "community" | "others") => void }) {
  const brand = getServiceBrandColor("W3C DESK");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const questions = useMemo(() => {
    const amountQuestion: Question = {
      id: "amount",
      title: "How much?",
      helper: answers.asset ? buildAmountHelper(answers.asset) : "Enter the exact amount and unit.",
      options: [],
    };

    const assetInputQuestion: Question = {
      id: "assetName",
      title: "What is the name of the asset?",
      helper: "Type the exact token or asset name.",
      options: [],
    };

    if (!answers.tradeType) return [rootQuestion];

    const action = answers.tradeType === "Buy crypto" ? "buy" : "sell";

    if (answers.asset === "Other asset") {
      return [rootQuestion, assetQuestion, assetInputQuestion, amountQuestion, sourceQuestions[action], noteQuestion];
    }

    return [rootQuestion, assetQuestion, amountQuestion, sourceQuestions[action], noteQuestion];
  }, [answers.tradeType, answers.asset]);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = currentQuestion ? Math.round(((step + 1) / questions.length) * 100) : 0;

  const advance = (nextAnswers: AnswerMap) => {
    setAnswers(nextAnswers);
    if (step < questions.length - 1) setStep(step + 1);
  };

  const openConfirmation = (nextAnswers: AnswerMap) => {
    setAnswers(nextAnswers);
    setConfirming(true);
  };

  const selectAnswer = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };

    if (currentQuestion.id === "tradeType") {
      delete nextAnswers.asset;
      delete nextAnswers.assetName;
      delete nextAnswers.amount;
      delete nextAnswers.source;
      delete nextAnswers.destination;
      delete nextAnswers.note;
      delete nextAnswers.noteChoice;
    }

    if (currentQuestion.id === "asset") {
      delete nextAnswers.assetName;
      delete nextAnswers.amount;
    }

    if (currentQuestion.id === "noteChoice") {
      if (value === "No, that’s all") {
        delete nextAnswers.note;
        openConfirmation(nextAnswers);
        return;
      }

      setAnswers(nextAnswers);
      return;
    }

    advance(nextAnswers);
  };

  const submitInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    advance({ ...answers, [currentQuestion.id]: trimmed });
  };

  const goBack = () => {
    if (complete) {
      setComplete(false);
      setConfirming(true);
      return;
    }
    if (confirming) {
      setConfirming(false);
      setStep(questions.length - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setComplete(false);
    setConfirming(false);
  };

  const sendToWhatsApp = () => {
    const message = buildMessage(answers);
    const asset = answers.assetName || answers.asset;
    const actionType = answers.tradeType === "Buy crypto" ? "buy" : "sell";
    const numericAmount = Number.parseFloat(answers.amount) || 0;

    trackDeskEnquiry(asset, actionType, numericAmount);
    trackContactClick("WhatsApp", "W3C DESK - " + actionType.toUpperCase() + " " + asset);

    const whatsappUrl = contact.whatsappUrl + "?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setComplete(true);
  };

  if (confirming) {
    return (
      <PageTransition>
        <SEO
          title={"Confirm W3C DESK Trade Request | " + branding.businessName}
          description={"Review your W3C DESK trade request before continuing to WhatsApp."}
          path="/services"
        />
        <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
          <div className="container max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
              <div className="flex justify-center mb-6">
                <FounderAvatar />
              </div>
              <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-orange-400 text-center">CONFIRM YOUR TRADE REQUEST</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">Review your details below. When you continue, your request will open in WhatsApp for Jake to review.</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/[0.08]">
                <SummaryRow label="Trade" value={answers.tradeType} />
                <SummaryRow label="Asset" value={answers.assetName || answers.asset} />
                <SummaryRow label="Amount" value={answers.amount} />
                <SummaryRow label={answers.tradeType === "Buy crypto" ? "Receive in" : "Sending from"} value={answers.tradeType === "Buy crypto" ? answers.destination : answers.source} />
                {answers.note && <SummaryRow label="Note" value={answers.note} />}
              </div>
              <button type="button" onClick={sendToWhatsApp} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all">
                <SiWhatsapp className="w-4 h-4" /> Confirm Request & Continue to WhatsApp
              </button>
              <button type="button" onClick={goBack} className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (complete) {
    return (
      <PageTransition>
        <SEO
          title={"W3C DESK, Crypto P2P Trading | " + branding.businessName}
          description={"Buy and sell digital assets through W3C DESK with direct WhatsApp coordination from " + branding.founderName + "."}
          path="/services"
        />
        <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
          <div className="container max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
              <div className="flex justify-center mb-6">
                <FounderAvatar />
              </div>
              <h2 className={"text-3xl sm:text-4xl font-display font-bold text-center " + brand.twText}>
                Your trade request is ready.
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed text-center">
                Your details have been prepared for WhatsApp. Jake can review the request and let you know the next step.
              </p>
              <a
                href={contact.whatsappUrl + "?text=" + encodeURIComponent(buildMessage(answers))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("WhatsApp", "W3C DESK Questionnaire")}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" />
                Continue on WhatsApp
              </a>
              <button type="button" onClick={restart} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" />
                Start again
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={"W3C DESK, Crypto P2P Trading | " + branding.businessName}
        description={"Buy and sell digital assets through W3C DESK with direct WhatsApp coordination from " + branding.founderName + "."}
        path="/services"
      />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 50%, " + brand.hex + "15, transparent 70%)" }}
          />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <h1 className={"text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight max-w-4xl " + brand.twText}>
            Buy or sell crypto through W3C DESK.
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mt-6">
            Tell me what you want to buy or sell, how much, and where the crypto is coming from or going. I’ll use your answers to prepare a clear trade request for WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center mb-8">
            <span className={"text-xs uppercase tracking-widest font-mono font-bold " + brand.twText}>
              LET’S SORT OUT YOUR TRADE
            </span>
          </div>

          <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-10">
            <motion.div className={"h-full " + brand.twBg} animate={{ width: progress + "%" }} transition={{ duration: 0.25 }} />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id + "-" + step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                {currentQuestion.title}
              </h2>

              {currentQuestion.helper && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{currentQuestion.helper}</p>
              )}

              {currentQuestion.id === "amount" && (
                <InputStep
                  inputMode="decimal"
                  value={currentAnswer || ""}
                  placeholder={
                    answers.asset === "BTC"
                      ? "e.g. 0.005 BTC"
                      : answers.asset === "PI"
                        ? "e.g. 500 PI"
                        : answers.asset === "USDT" || answers.asset === "USDC"
                          ? "e.g. 500"
                          : "e.g. 100 TOKEN"
                  }
                  onContinue={submitInput}
                />
              )}

              {currentQuestion.id === "assetName" && (
                <InputStep inputMode="text" value={currentAnswer || ""} placeholder="e.g. TOKEN" onContinue={submitInput} />
              )}

              {currentQuestion.id === "noteChoice" && (
                <div className="grid gap-3 mt-8">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(option)}
                      className={
                        "group w-full text-left rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 " +
                        (currentAnswer === option
                          ? brand.twBorder + " " + brand.twBg + " text-white"
                          : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25 hover:bg-white/[0.05]")
                      }
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-sm sm:text-base font-semibold">{option}</span>
                        <ArrowRight className={"w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 " + brand.twText} />
                      </span>
                    </button>
                  ))}
                  {(currentAnswer === "I have a question" || currentAnswer === "I need to explain something") && (
                    <NoteComposer
                      value={answers.note || ""}
                      onContinue={(note) => {
                        const nextAnswers = { ...answers };
                        if (note.trim()) nextAnswers.note = note.trim();
                        else delete nextAnswers.note;
                        openConfirmation(nextAnswers);
                      }}
                    />
                  )}
                </div>
              )}

              {currentQuestion.id !== "amount" &&
                currentQuestion.id !== "assetName" &&
                currentQuestion.id !== "noteChoice" && (
                  <div className="grid gap-3 mt-8">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option;
                      const isTradeType = currentQuestion.id === "tradeType";
                      const isBuy = option === "Buy crypto";
                      const optionTone = isTradeType
                        ? isBuy
                          ? selected
                            ? "border-emerald-400 bg-emerald-500/20 text-white"
                            : "border-emerald-500/40 bg-emerald-500/10 text-white/90 hover:border-emerald-400/70 hover:bg-emerald-500/15"
                          : selected
                            ? "border-red-400 bg-red-500/20 text-white"
                            : "border-red-500/40 bg-red-500/10 text-white/90 hover:border-red-400/70 hover:bg-red-500/15"
                        : selected
                          ? brand.twBorder + " " + brand.twBg + " text-white"
                          : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25 hover:bg-white/[0.05]";
                      const arrowTone = isTradeType ? (isBuy ? "text-emerald-400" : "text-red-400") : brand.twText;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectAnswer(option)}
                          className={
                            "group w-full text-left rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 " +
                            optionTone
                          }
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span className="text-sm sm:text-base font-semibold">{option}</span>
                            <ArrowRight className={"w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 " + arrowTone} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Not ready to trade yet?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto mt-5">
              That&apos;s okay. You can take your time to understand how crypto works, ask questions, and learn before you decide to trade. Join W3C Community to learn with others, follow practical conversations around crypto and Web3, and build your understanding first. When you&apos;re ready, you can come back to W3C DESK and start your trade request.
            </p>
            <button
              type="button"
              onClick={() => onNavigateToTab("community")}
              className={"mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-sm " + brand.twText + " " + brand.twBorder + " border hover:brightness-125 transition-all"}
            >
              Learn with W3C Community <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-5 px-5 py-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-white text-right">{value || "Not provided"}</span>
    </div>
  );
}

function InputStep({
  value,
  placeholder,
  inputMode,
  onContinue,
}: {
  value: string;
  placeholder: string;
  inputMode: "text" | "decimal";
  onContinue: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="mt-8">
      <input
        type="text"
        inputMode={inputMode}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === "Enter") onContinue(draft);
        }}
        className="w-full rounded-2xl bg-white/[0.02] border border-white/10 px-5 py-4 sm:px-6 sm:py-5 text-white text-base placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10"
        autoFocus
      />
      <div className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => onContinue(draft)}
        disabled={!draft.trim()}
        className={"inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 " + getServiceBrandColor("W3C DESK").twBg + " " + getServiceBrandColor("W3C DESK").twText + " border " + getServiceBrandColor("W3C DESK").twBorder + " font-bold text-sm disabled:opacity-30 disabled:pointer-events-none hover:brightness-125 transition-all"}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function NoteComposer({
  value,
  onContinue,
}: {
  value: string;
  onContinue: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="mt-3">
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Type your note here..."
        rows={4}
        autoFocus
        className="w-full rounded-2xl bg-white/[0.02] border border-white/10 px-5 py-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 resize-none"
      />
      <div className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => onContinue(draft)}
        disabled={!draft.trim()}
        className={"inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 " + getServiceBrandColor("W3C DESK").twBg + " " + getServiceBrandColor("W3C DESK").twText + " border " + getServiceBrandColor("W3C DESK").twBorder + " font-bold text-sm disabled:opacity-30 disabled:pointer-events-none hover:brightness-125 transition-all"}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
