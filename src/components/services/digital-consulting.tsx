import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick } from "@/lib/analytics";
import { FounderAvatar } from "@/components/shared/founder-avatar";

type AnswerMap = Record<string, string>;

type Question = {
  id: string;
  title: string;
  helper?: string;
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

const rootQuestion: Question = {
  id: "need",
  title: "What do you need help with?",
  helper: "Choose the closest starting point. Your answers will shape the questions that follow.",
  options: [
    "I want to build something",
    "I already have something that needs fixing or improving",
    "I want to use AI for my work or business",
    "I want to improve my online presence",
    "I have an idea but don't know how to turn it into something real",
    "I'm not sure what solution I need",
  ],
};

const branches: Record<string, Question[]> = {
  build: [
    {
      id: "build_type",
      title: "What are you looking to build?",
      helper: "This helps us identify the right type of solution.",
      options: ["A business website", "A landing page", "An online store", "A web app or platform", "A custom digital tool", "Something else"],
    },
    {
      id: "build_purpose",
      title: "What should it help people do?",
      helper: "Describe the main task or experience you want the solution to support.",
      placeholder: "For example: allow customers to browse services, request a quote, book appointments or manage orders.",
    },
    {
      id: "build_users",
      title: "Who will use it most?",
      options: ["Customers or the general public", "My team or employees", "Business partners or vendors", "A specific community", "A mix of these", "I'm not sure yet"],
    },
    {
      id: "build_features",
      title: "Are there any important features you already have in mind?",
      helper: "List the features that matter most. It's fine if you haven't decided yet.",
      placeholder: "For example: user accounts, payments, booking, dashboards, messaging or search.",
      optional: true,
    },
  ],
  improve: [
    {
      id: "improve_system",
      title: "What are we improving?",
      options: ["An existing website", "A web app or platform", "A business process or workflow", "A specific feature or integration", "A system that is not working properly", "Something else"],
    },
    {
      id: "improve_issue",
      title: "What is not working as it should?",
      helper: "Share the issue, what you expected to happen and what happens instead.",
      placeholder: "Describe the problem. If there is an existing website or product, include its link if possible.",
    },
    {
      id: "improve_impact",
      title: "How is this affecting you or your users?",
      options: ["Lost enquiries or sales", "Wasted time or manual work", "Poor user experience", "Errors, downtime or unreliable features", "Growth is being limited", "I'm not sure yet"],
    },
    {
      id: "improve_links",
      title: "Where can we review the existing product?",
      helper: "Add a website link, app URL or other useful reference. Do not include passwords or private access credentials.",
      placeholder: "https://example.com",
      optional: true,
    },
  ],
  ai: [
    {
      id: "ai_use",
      title: "Where would you like AI to make a difference?",
      options: ["Customer support or enquiries", "Repetitive business tasks", "Content, writing or marketing", "Research, analysis or reporting", "An existing website or digital product", "I'm exploring the possibilities"],
    },
    {
      id: "ai_workflow",
      title: "What task or process should AI help with?",
      helper: "Tell us what happens today and what you would like to happen instead.",
      placeholder: "For example: answer common customer questions, qualify leads or prepare routine reports.",
    },
    {
      id: "ai_tools",
      title: "Which tools or platforms are involved today?",
      helper: "Mention the tools your team already uses, if any.",
      placeholder: "For example: WhatsApp, email, spreadsheets, a CRM, website or internal software.",
      optional: true,
    },
    {
      id: "ai_role",
      title: "How much should the AI handle?",
      options: ["Assist a person who makes the final decision", "Handle routine tasks with human oversight", "Automate a defined process end to end", "Recommend actions, but not take them", "I need guidance on the right approach"],
    },
  ],
  presence: [
    {
      id: "presence_goal",
      title: "What should a stronger online presence achieve?",
      options: ["Build trust and look more professional", "Generate more enquiries or leads", "Explain and showcase my services", "Sell products or accept bookings", "Make it easier for people to contact us", "A combination of these"],
    },
    {
      id: "presence_audience",
      title: "Who are you trying to reach?",
      helper: "Describe your ideal customers, clients or audience.",
      placeholder: "For example: property investors in Lagos, small businesses or customers across Nigeria.",
    },
    {
      id: "presence_channels",
      title: "Where are you currently visible online?",
      options: ["We already have a website", "Social media only", "Website and social media", "Online directories or marketplaces", "We are not online yet", "Other or not sure"],
    },
    {
      id: "presence_links",
      title: "Share any existing website or social links",
      helper: "Add the links that best represent your current online presence.",
      placeholder: "Website, Instagram, LinkedIn, Facebook, etc.",
      optional: true,
    },
  ],
  direction: [
    {
      id: "direction_idea",
      title: "Tell us about the idea or situation.",
      helper: "What are you considering, or what made you start looking for a digital solution?",
      placeholder: "Explain the idea in your own words. It does not need to be fully worked out.",
    },
    {
      id: "direction_problem",
      title: "What problem are you hoping to solve?",
      helper: "Who experiences the problem, and why does it matter?",
      placeholder: "Describe the problem, who it affects and what happens if it is not solved.",
    },
    {
      id: "direction_stage",
      title: "How far along are you?",
      options: ["Only an early idea", "I have researched or planned it", "I have designs or requirements", "Development has started", "Something already exists but needs direction"],
    },
  ],
};

const sharedQuestions: Question[] = [
  {
    id: "result",
    title: "What would a successful outcome look like?",
    helper: "Choose the result that matters most right now.",
    options: ["Get more customers or enquiries", "Save time and reduce manual work", "Make an existing process easier", "Launch a new product or service", "Improve trust and professionalism", "Fix a specific problem", "Validate an idea before investing further", "I'm still working this out"],
  },
  {
    id: "timeline",
    title: "When would you ideally like to make progress?",
    options: ["As soon as practical", "Within the next month", "Within 1–3 months", "In 3–6 months", "I'm researching for a future project", "There is no fixed deadline"],
  },
  {
    id: "budget",
    title: "Do you have an estimated budget for this project?",
    helper: "This is only to help us recommend a realistic approach. You can choose not to say.",
    options: ["Under $250", "$250–$500", "$500–$1,000", "$1,000–$3,000", "Above $3,000", "I need guidance before setting a budget", "Prefer to discuss this"],
  },
  {
    id: "details",
    title: "Anything else we should know?",
    helper: "Add requirements, constraints, examples or questions that would help us understand the project.",
    placeholder: "Share any other useful context here...",
    optional: true,
  },
];

function getBranchKey(value: string) {
  if (value === "I want to build something") return "build";
  if (value === "I already have something that needs fixing or improving") return "improve";
  if (value === "I want to use AI for my work or business") return "ai";
  if (value === "I want to improve my online presence") return "presence";
  return "direction";
}

function buildMessage(answers: AnswerMap, questions: Question[]) {
  const lines = [
    `Hello ${branding.founderName}, I'd like to discuss a Digital Solutions project with W3C Digital Network.`,
    "",
    "PROJECT BRIEF",
    `Starting point: ${answers.need}`,
  ];

  questions.slice(1).forEach((question) => {
    const answer = answers[question.id]?.trim();
    if (answer) lines.push(`${question.title.replace(/[?？]$/, "")}: ${answer}`);
  });

  lines.push("", "Please review this brief and let me know the most suitable next step.");
  return lines.join("\n");
}

export default function DigitalConsulting() {
  const brand = getServiceBrandColor("Digital Solutions");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [review, setReview] = useState(false);
  const [draft, setDraft] = useState("");

  const questions = useMemo(() => {
    if (!answers.need) return [rootQuestion];
    return [rootQuestion, ...branches[getBranchKey(answers.need)], ...sharedQuestions];
  }, [answers.need]);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? "" : "";
  const progress = questions.length > 1 ? Math.round(((step + 1) / questions.length) * 100) : 0;
  const message = buildMessage(answers, questions);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${contact.whatsappUrl}?text=${encodedMessage}`;
  const telegramUrl = `${contact.telegramUrl}?text=${encodedMessage}`;
  const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent("Digital Solutions Project Brief")}&body=${encodedMessage}`;

  const advance = (value: string) => {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    questions.slice(step + 1).forEach((question) => delete nextAnswers[question.id]);
    setAnswers(nextAnswers);
    setDraft("");

    // The first answer determines the branch, so the initial one-question
    // list must not be used to decide whether the questionnaire is complete.
    if (currentQuestion.id === "need") {
      setStep(1);
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setReview(true);
    }
  };

  const goBack = () => {
    if (review) {
      setReview(false);
      setStep(questions.length - 1);
      return;
    }
    if (step > 0) {
      setStep(step - 1);
      setDraft("");
    }
  };

  const editAnswer = (questionId: string) => {
    const index = questions.findIndex((question) => question.id === questionId);
    if (index >= 0) {
      setReview(false);
      setStep(index);
      setDraft(answers[questionId] ?? "");
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setReview(false);
    setDraft("");
  };

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center mb-8">
          <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>
            LET&apos;S FIND THE RIGHT DIGITAL SOLUTION
          </span>
        </div>

        {!review ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-3 text-xs text-muted-foreground">
              <span>{answers.need ? `Step ${step + 1} of ${questions.length}` : "Start with your goal"}</span>
              <span>{answers.need ? `${progress}% complete` : "A few questions to understand your needs"}</span>
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
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{currentQuestion.helper}</p>
                )}

                {currentQuestion.options ? (
                  <div className="grid gap-3 mt-8">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => advance(option)}
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
                ) : (
                  <div className="mt-8">
                    <textarea
                      value={draft || currentAnswer}
                      onChange={(event) => setDraft(event.target.value)}
                      rows={5}
                      maxLength={1800}
                      placeholder={currentQuestion.placeholder}
                      className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-white/30 focus:ring-2 focus:ring-white/10"
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{currentQuestion.optional ? "Optional — you can skip this." : "A short explanation is enough."}</span>
                      <span>{(draft || currentAnswer).length}/1800</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => advance(draft.trim() || currentAnswer)}
                      disabled={!currentQuestion.optional && !(draft.trim() || currentAnswer.trim())}
                      className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed ${brand.twBg}`}
                    >
                      {currentQuestion.optional && !(draft.trim() || currentAnswer.trim()) ? "Skip this question" : "Continue"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start again
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-9"
          >
            <div className="flex justify-center mb-6"><FounderAvatar /></div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-400 mb-3">
              <Check className="w-4 h-4" /> Project brief prepared
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-white">
              Review your project brief
            </h2>
            <p className="text-sm text-muted-foreground mt-3 text-center leading-relaxed">
              Check your answers before sending. You can edit any section below.
            </p>

            <div className="mt-8 space-y-3">
              {questions.map((question) => {
                const answer = answers[question.id]?.trim();
                if (!answer) return null;
                return (
                  <div key={question.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{question.title}</p>
                        <p className="mt-2 text-sm text-white/90 whitespace-pre-wrap break-words">{answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => editAnswer(question.id)}
                        className={`shrink-0 text-xs font-semibold ${brand.twText} hover:underline`}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
              Your answers help us prepare for the conversation. Final scope, requirements and pricing can be confirmed together.
            </p>

            <div className="grid gap-3 mt-7">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("WhatsApp", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" /> Send brief on WhatsApp
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("Telegram", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#229ED9] text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiTelegram className="w-4 h-4" /> Send brief on Telegram
              </a>
              <a
                href={emailUrl}
                onClick={() => trackContactClick("Email", "Digital Solutions Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-red-500 text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                Send brief by Email
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <button type="button" onClick={goBack} className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors">
                <span className="inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back to questions</span>
              </button>
              <button type="button" onClick={restart} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" /> Start again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
