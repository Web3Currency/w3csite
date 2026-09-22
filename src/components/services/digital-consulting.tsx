import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick } from "@/lib/analytics";

type AnswerMap = Record<string, string>;

type Question = {
  id: string;
  title: string;
  helper?: string;
  options: string[];
};

const rootQuestion: Question = {
  id: "need",
  title: "What do you need help with?",
  helper: "Pick the option that feels closest to your situation.",
  options: [
    "I want to build something",
    "I already have something that needs fixing or improving",
    "I want to use AI for my work or business",
    "I want to improve my online presence",
    "I have an idea but don't know how to turn it into something real",
    "I'm not sure what solution I need",
  ],
};

const branches: Record<string, Question> = {
  build: {
    id: "build",
    title: "What do you want to build?",
    options: [
      "A website",
      "A landing page",
      "An online store",
      "A web app or platform",
      "A digital tool for my business",
      "Something else",
    ],
  },
  improve: {
    id: "improve",
    title: "What needs improving?",
    options: [
      "Website design",
      "Website speed or mobile experience",
      "A feature or function",
      "An existing digital process",
      "Something is not working",
      "I'm not sure",
    ],
  },
  ai: {
    id: "ai",
    title: "Where would you like to use AI?",
    options: [
      "Content and writing",
      "Customer support",
      "Business processes",
      "Research or information",
      "A website or digital product",
      "I'm not sure yet",
    ],
  },
  presence: {
    id: "presence",
    title: "What do you want to improve?",
    options: [
      "How my business looks online",
      "Getting more enquiries",
      "Showing my services clearly",
      "Making it easier for people to contact me",
      "Creating a better website",
      "I'm not sure",
    ],
  },
  direction: {
    id: "direction",
    title: "Tell me where you are right now.",
    options: [
      "I have an idea",
      "I have a rough plan",
      "I already started something",
      "I have something that needs direction",
      "I just know I need a better solution",
    ],
  },
};

const resultQuestion: Question = {
  id: "result",
  title: "What is the main result you want?",
  options: [
    "Get more customers",
    "Save time",
    "Make work easier",
    "Create something new",
    "Look more professional online",
    "Solve a specific problem",
    "I'm still figuring it out",
  ],
};

function getBranchKey(value: string) {
  if (value === "I want to build something") return "build";
  if (value === "I already have something that needs fixing or improving") return "improve";
  if (value === "I want to use AI for my work or business") return "ai";
  if (value === "I want to improve my online presence") return "presence";
  return "direction";
}

function buildMessage(answers: AnswerMap) {
  const branchQuestion = branches[getBranchKey(answers.need)];

  return [
    `Hi ${branding.founderName}, I'd like to discuss a digital solution.`,
    "",
    "Here is what I'm trying to do:",
    `What I need help with: ${answers.need}`,
    `${branchQuestion.title}: ${answers[branchQuestion.id]}`,
    `Main result I want: ${answers.result}`,
  ].join("\n");
}

export default function DigitalConsulting() {
  const brand = getServiceBrandColor("Digital Solutions");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const questions = useMemo(() => {
    if (!answers.need) return [rootQuestion, resultQuestion];
    return [rootQuestion, branches[getBranchKey(answers.need)], resultQuestion];
  }, [answers.need]);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = Math.round(((step + 1) / questions.length) * 100);

  const selectAnswer = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };

    if (currentQuestion.id === "need") {
      Object.keys(branches).forEach((key) => {
        delete nextAnswers[branches[key].id];
      });
      delete nextAnswers.result;
    }

    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setComplete(true);
    }
  };

  const goBack = () => {
    if (complete) {
      setComplete(false);
      setStep(questions.length - 1);
      return;
    }

    if (step === 0) return;

    const previousStep = step - 1;
    setStep(previousStep);

    if (questions[previousStep].id === "need") {
      const nextAnswers = { ...answers };
      Object.keys(branches).forEach((key) => {
        delete nextAnswers[branches[key].id];
      });
      delete nextAnswers.result;
      setAnswers(nextAnswers);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setComplete(false);
  };

  const message = buildMessage(answers);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${contact.whatsappUrl}?text=${encodedMessage}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent("https://web3currency.online/services?tab=consulting")}&text=${encodedMessage}`;
  const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent("Digital Solutions Enquiry")}&body=${encodedMessage}`;

  if (complete) {
    return (
      <>
        <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10"
          >
            <div className="flex justify-center mb-6">
              <Check className={`w-16 h-16 sm:w-20 sm:h-20 ${brand.twText}`} strokeWidth={1.75} />
            </div>
            <h2 className={`text-3xl sm:text-4xl font-display font-bold text-center ${brand.twText}`}>
              You&apos;ve given me the context I need.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Your answers are ready. Choose where you would like to continue.
            </p>

            <div className="grid gap-3 mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("WhatsApp", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" />
                Continue on WhatsApp
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("Telegram", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#229ED9] text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiTelegram className="w-4 h-4" />
                Continue on Telegram
              </a>
              <a
                href={emailUrl}
                onClick={() => trackContactClick("Email", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-red-500 text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                Continue by Email
              </a>
            </div>

            <button
              type="button"
              onClick={restart}
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Start again
            </button>
          </motion.div>
        </div>
      </section>


      </>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center mb-8">
          <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>
            LET&apos;S FIND THE RIGHT DIGITAL SOLUTION
          </span>
        </div>

        <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-10">
          <motion.div
            className={`h-full ${brand.twBg}`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              {currentQuestion.title}
            </h2>
            {currentQuestion.helper && (
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {currentQuestion.helper}
              </p>
            )}

            <div className="grid gap-3 mt-8">
              {currentQuestion.options.map((option) => {
                const selected = currentAnswer === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(option)}
                    className={`group w-full text-left rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      selected
                        ? `${brand.twBorder} ${brand.twBg} text-white`
                        : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-sm sm:text-base font-semibold">{option}</span>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${brand.twText}`} />
                    </span>
                  </button>
                );
              })}
            </div>
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
  );
}
