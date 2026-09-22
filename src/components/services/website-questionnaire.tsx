import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick, trackWebsiteProjectEnquiry } from "@/lib/analytics";

type AnswerMap = Record<string, string>;

type Question = {
  id: string;
  title: string;
  helper?: string;
  options: string[];
};

const commonQuestions: Question[] = [
  {
    id: "goal",
    title: "What is the main goal for your website?",
    options: [
      "Get customers or enquiries",
      "Sell products or services",
      "Build trust and look professional",
      "Share information",
      "Showcase my work",
      "Make a process easier online",
      "Still figuring this out",
    ],
  },
  {
    id: "content",
    title: "Do you already have content for the website?",
    options: [
      "Yes, everything is ready",
      "I have some of it",
      "No, I need help with that",
      "I'm not sure what I need yet",
    ],
  },
  {
    id: "timeline",
    title: "When would you like to start?",
    options: [
      "As soon as possible",
      "Within the next few weeks",
      "Within the next few months",
      "I'm just exploring for now",
    ],
  },
];

const firstQuestions: Record<string, Question> = {
  existing: {
    id: "existingWebsite",
    title: "What would you like to do with your existing website?",
    options: [
      "Improve the design",
      "Fix problems",
      "Add new features",
      "Make it work better on phones",
      "Make it faster or easier to use",
      "Rebuild it",
    ],
  },
  unsure: {
    id: "onlineGoal",
    title: "What are you trying to achieve online?",
    options: [
      "Start something new",
      "Get more customers or enquiries",
      "Sell something online",
      "Build an online presence",
      "Turn an idea into a website",
      "I need help figuring it out",
    ],
  },
};

const websitePurpose: Question = {
  id: "purpose",
  title: "What is the website mainly for?",
  options: [
    "My business or brand",
    "Selling products or services",
    "Showing my work or portfolio",
    "An event, school, church, community, or organisation",
    "Sharing information or content",
    "Something else",
  ],
};

const rootQuestion: Question = {
  id: "need",
  title: "What do you need help with?",
  helper: "Pick the option that feels closest. You can change your answer later.",
  options: [
    "A new website",
    "A landing page",
    "An online store",
    "A web app or online platform",
    "I already have a website",
    "A personal or portfolio website",
    "I'm not sure yet",
  ],
};

function buildMessage(answers: AnswerMap) {
  return [
    `Hi ${branding.founderName}, I'd like to discuss a website project.`,
    "",
    "Here are my answers:",
    `What I need help with: ${answers.need}`,
    answers.need === "I already have a website"
      ? `What I'd like to do with it: ${answers.existingWebsite}`
      : answers.need === "I'm not sure yet"
        ? `What I'm trying to achieve online: ${answers.onlineGoal}`
        : `What the website is mainly for: ${answers.purpose}`,
    `Main goal: ${answers.goal}`,
    `Content: ${answers.content}`,
    `Start time: ${answers.timeline}`,
  ].join("\n");
}

export default function WebsiteQuestionnaire() {
  const brand = getServiceBrandColor("Website Design & Development");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const questions = useMemo(() => {
    if (!answers.need) return [rootQuestion, ...commonQuestions];
    const branch =
      answers.need === "I already have a website"
        ? firstQuestions.existing
        : answers.need === "I'm not sure yet"
          ? firstQuestions.unsure
          : websitePurpose;
    return [rootQuestion, branch, ...commonQuestions];
  }, [answers.need]);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = Math.round(((step + 1) / questions.length) * 100);

  const selectAnswer = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };

    if (currentQuestion.id === "need") {
      delete nextAnswers.purpose;
      delete nextAnswers.existingWebsite;
      delete nextAnswers.onlineGoal;
    }

    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setComplete(true);
      trackWebsiteProjectEnquiry("Questionnaire Complete");
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
    const previousQuestion = questions[previousStep];

    setStep(previousStep);

    if (previousQuestion.id === "need") {
      const nextAnswers = { ...answers };
      delete nextAnswers.purpose;
      delete nextAnswers.existingWebsite;
      delete nextAnswers.onlineGoal;
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
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent("https://web3currency.online/services/web-development")}&text=${encodedMessage}`;
  const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent("Website Project Enquiry")}&body=${encodedMessage}`;

  if (complete) {
    return (
      <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10"
          >
            <div className="flex justify-center mb-6">
              <Check
                className={`w-16 h-16 sm:w-20 sm:h-20 ${brand.twText}`}
                strokeWidth={1.75}
              />
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
                onClick={() => trackContactClick("WhatsApp", "WebDev Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" />
                Continue on WhatsApp
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("Telegram", "WebDev Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#229ED9] text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiTelegram className="w-4 h-4" />
                Continue on Telegram
              </a>
              <a
                href={emailUrl}
                onClick={() => trackContactClick("Email", "WebDev Questionnaire")}
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
    );
  }

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center mb-8">
          <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>
            LET'S PLAN YOUR WEBSITE
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
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${brand.twText}`}
                      />
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
