import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick, trackWebsiteProjectEnquiry } from "@/lib/analytics";
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
    "A new website",
    "A landing page",
    "An online store",
    "A web app or online platform",
    "I already have a website",
    "A personal or portfolio website",
    "I'm not sure yet",
  ],
};

const branches: Record<string, Question[]> = {
  website: [
    {
      id: "business",
      title: "Tell us about the business, brand or organisation.",
      helper: "What do you do, who do you serve, and what should visitors understand about you?",
      placeholder: "For example: We are a Lagos-based property consultancy serving homeowners and investors.",
    },
    {
      id: "pages",
      title: "Which pages or sections do you expect the website to have?",
      helper: "List the important pages. You do not need to know the final site structure yet.",
      placeholder: "For example: Home, About, Services, Projects, FAQs and Contact.",
    },
    {
      id: "features",
      title: "What should visitors be able to do on the website?",
      options: ["Send enquiries or request a quote", "Book appointments or consultations", "Browse services or projects", "Create accounts or access a portal", "Make payments or purchases", "A combination of these", "I'm not sure yet"],
    },
  ],
  landing: [
    {
      id: "offer",
      title: "What product, service or offer will the landing page promote?",
      placeholder: "Describe what you are promoting and who it is for.",
    },
    {
      id: "conversion",
      title: "What is the most important action visitors should take?",
      options: ["Submit an enquiry or lead form", "Contact us on WhatsApp or phone", "Make a purchase or payment", "Book a call or appointment", "Register or sign up", "Download a resource", "Something else"],
    },
    {
      id: "landing_features",
      title: "What should the page include?",
      options: ["Lead capture form", "Testimonials or reviews", "Pricing or offer details", "Product demonstration or gallery", "Payment or checkout", "Multiple sections and calls to action", "Not sure yet"],
    },
  ],
  store: [
    {
      id: "products",
      title: "What will you be selling, and roughly how many products will you list?",
      placeholder: "For example: 20 physical products, digital downloads, subscriptions or a mix.",
    },
    {
      id: "store_payments",
      title: "How should customers pay?",
      options: ["Online card or bank payments", "Bank transfer with manual confirmation", "Payment on delivery or offline", "Multiple payment methods", "I need guidance"],
    },
    {
      id: "store_operations",
      title: "Which store operations will you need?",
      options: ["Delivery or shipping management", "Inventory and stock tracking", "Order notifications and tracking", "Discounts, coupons or promotions", "Customer accounts and order history", "Several of these", "Not sure yet"],
    },
  ],
  platform: [
    {
      id: "platform_problem",
      title: "What problem should the web app or platform solve?",
      helper: "Explain the process or experience you want to make possible.",
      placeholder: "What should users be able to accomplish, and what is difficult about the current approach?",
    },
    {
      id: "platform_users",
      title: "Who will use the platform?",
      options: ["The general public or customers", "Businesses or service providers", "My staff or internal team", "A private or membership community", "Different user groups with different access", "Not sure yet"],
    },
    {
      id: "platform_features",
      title: "Which capabilities do you expect?",
      placeholder: "For example: user accounts, dashboards, bookings, payments, messaging, search, admin controls or reports.",
      optional: true,
    },
  ],
  existing: [
    {
      id: "website_url",
      title: "What is the address of your existing website?",
      helper: "Share the public URL so we can understand what is already there. Never send passwords or private credentials.",
      placeholder: "https://example.com",
    },
    {
      id: "existing_work",
      title: "What would you like to change?",
      options: ["Improve the design or branding", "Fix errors or broken features", "Add new pages or functionality", "Improve mobile experience or accessibility", "Improve speed or performance", "Rebuild the website", "A combination of these"],
    },
    {
      id: "existing_details",
      title: "What should we know about the current website?",
      helper: "Describe the main issues, what you want to achieve, or any features that are missing.",
      placeholder: "Tell us what is not working and what a better result would look like.",
    },
  ],
  portfolio: [
    {
      id: "portfolio_work",
      title: "What kind of work or experience do you want to showcase?",
      placeholder: "For example: design projects, photography, writing, professional services or case studies.",
    },
    {
      id: "portfolio_audience",
      title: "Who should the portfolio attract?",
      options: ["Potential clients or customers", "Employers or recruiters", "Collaborators or partners", "An audience or community", "A mix of these", "Not sure yet"],
    },
    {
      id: "portfolio_features",
      title: "What would make the portfolio useful?",
      options: ["Project gallery or case studies", "CV or professional profile", "Testimonials and recommendations", "Enquiry or booking form", "Blog or articles", "Several of these", "Not sure yet"],
    },
  ],
  unsure: [
    {
      id: "online_goal",
      title: "What are you hoping to achieve online?",
      options: ["Build credibility for a business or brand", "Get more customers or enquiries", "Sell products or services", "Showcase work or expertise", "Make a process easier online", "Turn an idea into a digital product", "I need help deciding"],
    },
    {
      id: "idea_context",
      title: "Tell us a little about the idea or situation.",
      helper: "It is fine if the idea is still taking shape.",
      placeholder: "What are you considering, who might use it, and what prompted you to explore it?",
    },
  ],
};

const sharedQuestions: Question[] = [
  {
    id: "audience",
    title: "Who is the website intended to reach?",
    helper: "Think about your ideal customers, users or visitors.",
    placeholder: "For example: small businesses in Nigeria, property investors, students or customers worldwide.",
  },
  {
    id: "design_reference",
    title: "Do you have a design style or example website in mind?",
    helper: "Share links if there are websites whose layout, features or visual style you like.",
    placeholder: "Paste website links or describe the look and feel you prefer.",
    optional: true,
  },
  {
    id: "content",
    title: "How ready are your website content and brand materials?",
    options: ["Text, images and branding are ready", "I have some materials but need help", "I need help creating the content and visuals", "I need branding as well", "I'm not sure what is required"],
  },
  {
    id: "resources",
    title: "What do you already have in place?",
    options: ["Domain and hosting", "Domain only", "An existing website or platform", "Brand identity and content", "Some of these resources", "None yet / I need guidance"],
  },
  {
    id: "budget",
    title: "What investment range have you set aside for this project?",
    helper: "This helps us suggest a realistic scope. You can choose to discuss this later.",
    options: ["Under $250", "$250–$500", "$500–$1,000", "$1,000–$3,000", "Above $3,000", "I need guidance before setting a budget", "Prefer to discuss this"],
  },
  {
    id: "timeline",
    title: "When would you like to start?",
    options: ["As soon as practical", "Within the next few weeks", "Within the next 1–3 months", "In 3–6 months", "I'm researching for a future project", "There is no fixed deadline"],
  },
  {
    id: "details",
    title: "Is there anything else we should know?",
    helper: "Add requirements, constraints, examples or questions that would help us understand the project.",
    placeholder: "Share any other useful context here...",
    optional: true,
  },
];

function getBranchKey(value: string) {
  if (value === "A new website") return "website";
  if (value === "A landing page") return "landing";
  if (value === "An online store") return "store";
  if (value === "A web app or online platform") return "platform";
  if (value === "I already have a website") return "existing";
  if (value === "A personal or portfolio website") return "portfolio";
  return "unsure";
}

function buildMessage(answers: AnswerMap, questions: Question[]) {
  const lines = [
    `Hello ${branding.founderName}, I'd like to discuss a website project with W3C Digital Network.`,
    "",
    "WEBSITE PROJECT BRIEF",
    `Project type: ${answers.need ?? "Not specified"}`,
  ];

  questions.slice(1).forEach((question) => {
    const answer = answers[question.id]?.trim();
    if (answer) lines.push(`${question.title.replace(/[?？]$/, "")}: ${answer}`);
  });

  lines.push("", "Please review this brief and let me know the most suitable next step.");
  return lines.join("\n");
}

export default function WebsiteQuestionnaire() {
  const brand = getServiceBrandColor("Website Design & Development");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [review, setReview] = useState(false);

  const questions = useMemo(() => {
    if (!answers.need) return [rootQuestion];
    return [rootQuestion, ...branches[getBranchKey(answers.need)], ...sharedQuestions];
  }, [answers.need]);

  const currentQuestion = questions[step] ?? rootQuestion;
  const currentAnswer = answers[currentQuestion.id] ?? "";
  const progress = answers.need ? Math.round(((step + 1) / questions.length) * 100) : 0;
  const message = buildMessage(answers, questions);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${contact.whatsappUrl}?text=${encodedMessage}`;
  const telegramUrl = `${contact.telegramUrl}?text=${encodedMessage}`;
  const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent("Website Project Brief")}&body=${encodedMessage}`;

  const advance = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };

    if (currentQuestion.id === "need") {
      // A different project type means the old branch and shared answers are no longer reliable.
      Object.keys(nextAnswers).forEach((key) => {
        if (key !== "need") delete nextAnswers[key];
      });
      nextAnswers.need = value;
      setAnswers(nextAnswers);
      setStep(1);
      return;
    }

    setAnswers(nextAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setReview(true);
      trackWebsiteProjectEnquiry("Questionnaire Complete");
    }
  };

  const goBack = () => {
    if (review) {
      setReview(false);
      setStep(questions.length - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const editAnswer = (questionId: string) => {
    const index = questions.findIndex((question) => question.id === questionId);
    if (index >= 0) {
      setReview(false);
      setStep(index);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setReview(false);
  };

  const updateTextAnswer = (value: string) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
  };

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center mb-8">
          <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>
            LET&apos;S PLAN YOUR WEBSITE
          </span>
        </div>

        {!review ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-3 text-xs text-muted-foreground">
              <span>{answers.need ? `Step ${step + 1} of ${questions.length}` : "Start with your website goal"}</span>
              <span>{answers.need ? `${progress}% complete` : "A few questions to understand your project"}</span>
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
                      value={currentAnswer}
                      onChange={(event) => updateTextAnswer(event.target.value)}
                      rows={5}
                      maxLength={1800}
                      placeholder={currentQuestion.placeholder}
                      className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-white/30 focus:ring-2 focus:ring-white/10"
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{currentQuestion.optional ? "Optional — you can skip this." : "A short explanation is enough."}</span>
                      <span>{currentAnswer.length}/1800</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => advance(currentAnswer.trim())}
                      disabled={!currentQuestion.optional && !currentAnswer.trim()}
                      className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed ${brand.twBg}`}
                    >
                      {currentQuestion.optional && !currentAnswer.trim() ? "Skip this question" : "Continue"}
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
              Review your website project brief
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
              This brief helps us understand your goals and expected scope. Final requirements, delivery plan and pricing can be confirmed together.
            </p>

            <div className="grid gap-3 mt-7">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("WhatsApp", "Web Development Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" /> Send brief on WhatsApp
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("Telegram", "Web Development Questionnaire")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#229ED9] text-white font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiTelegram className="w-4 h-4" /> Send brief on Telegram
              </a>
              <a
                href={emailUrl}
                onClick={() => trackContactClick("Email", "Web Development Questionnaire")}
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
