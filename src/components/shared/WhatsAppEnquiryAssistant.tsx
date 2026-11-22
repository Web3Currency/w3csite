import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronRight, Minus, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export interface WhatsAppEnquiryOption {
  label: string;
  message: string;
  description?: string;
}

export interface WhatsAppEnquiryAssistantProps {
  businessName: string;
  businessDescription: string;
  whatsappNumber: string;
  logoUrl?: string;
  welcomeMessage: string;
  enquiryOptions: WhatsAppEnquiryOption[];
  brandPrimaryColour?: string;
  brandAccentColour?: string;
  buttonPosition?: "bottom-left" | "bottom-right";
  buttonAppearanceDelay?: number;
  cardMaxWidth?: number;
  cardMaxHeight?: number;
  buttonLabel?: string;
}

const DEFAULT_OPTIONS: WhatsAppEnquiryOption[] = [
  { label: "Digital solutions and tools", message: "Hello W3C Digital Network, I would like to enquire about your digital solutions and tools. Please share more information and the next steps." },
  { label: "Website or web application development", message: "Hello W3C Digital Network, I am interested in website or web application development. I would like to discuss my requirements and understand how we can proceed." },
  { label: "W3C DESK / P2P services", message: "Hello W3C Digital Network, I would like to enquire about W3C DESK and your P2P services. Please let me know how to get started." },
  { label: "Business or partnership proposal", message: "Hello W3C Digital Network, I have a business or partnership proposal I would like to discuss. Please let me know the best way to share the details." },
  { label: "Community and education", message: "Hello W3C Digital Network, I would like to learn more about your community and educational resources. Please share the relevant information." },
  { label: "Something else", message: "Hello W3C Digital Network, I have another enquiry and would appreciate speaking with your team. Please let me know how best to proceed." },
];

function getWestAfricaDate() {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date());
}

function getWestAfricaTime() {
  const parts = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" }).formatToParts(new Date());
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const period = parts.find((part) => part.type === "dayPeriod")?.value.toLowerCase() ?? "";
  return hour + ":" + minute + " " + (period === "am" ? "a.m." : "p.m.");
}

function normaliseWhatsAppNumber(number: string) {
  return number.replace(/[^\d]/g, "");
}

export function WhatsAppEnquiryAssistant({
  businessName,
  businessDescription,
  whatsappNumber,
  logoUrl,
  welcomeMessage,
  enquiryOptions = DEFAULT_OPTIONS,
  brandPrimaryColour = "#7C3AED",
  brandAccentColour = "#A78BFA",
  buttonPosition = "bottom-left",
  buttonAppearanceDelay = 2800,
  cardMaxWidth = 390,
  cardMaxHeight = 650,
  buttonLabel = "Open WhatsApp enquiry assistant",
}: WhatsAppEnquiryAssistantProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [currentDate, setCurrentDate] = useState(getWestAfricaDate);
  const [currentTime, setCurrentTime] = useState(getWestAfricaTime);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isRight = buttonPosition === "bottom-right";
  const safeNumber = normaliseWhatsAppNumber(whatsappNumber);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), Math.max(0, buttonAppearanceDelay));
    return () => window.clearTimeout(timer);
  }, [buttonAppearanceDelay]);

  useEffect(() => {
    const refreshClock = () => {
      setCurrentDate(getWestAfricaDate());
      setCurrentTime(getWestAfricaTime());
    };
    const timer = window.setInterval(refreshClock, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const closeDialog = useCallback((reset = false) => {
    setIsOpen(false);
    if (reset) {
      setSelectedIndex(null);
      setDraft("");
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getAttribute("aria-hidden") !== "true");

      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, closeDialog]);

  useEffect(() => {
    if (!selectedIndex || selectedIndex < 0) {
      if (selectedIndex === 0) {
        const conversation = conversationRef.current;
        if (conversation) {
          window.requestAnimationFrame(() => conversation.scrollTo({ top: conversation.scrollHeight, behavior: "smooth" }));
        }
      }
      return;
    }
    const conversation = conversationRef.current;
    if (!conversation) return;
    window.requestAnimationFrame(() => conversation.scrollTo({ top: conversation.scrollHeight, behavior: "smooth" }));
  }, [selectedIndex, draft]);

  const chooseEnquiry = (option: WhatsAppEnquiryOption, index: number) => {
    setSelectedIndex(index);
    setDraft(option.message);
  };

  const continueToWhatsApp = () => {
    const message = draft.trim();
    if (!message || !safeNumber) return;
    const url = `https://wa.me/${safeNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const positionClass = isRight ? "right-5" : "left-5";
  const cardPositionClass = isRight ? "right-4 sm:right-5" : "left-4 sm:left-5";

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {isOpen && (
        <>
          <button
            type="button"
            className="w3c-wa-backdrop fixed inset-0 z-[80] cursor-default bg-black/65 backdrop-blur-[2px]"
            aria-label="Close enquiry assistant"
            onClick={() => closeDialog(false)}
          />
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className={`w3c-wa-dialog fixed bottom-24 ${cardPositionClass} z-[90] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-[0_24px_80px_rgba(0,0,0,0.55)]`}
            style={{ width: `min(${cardMaxWidth}px, calc(100vw - 2rem))`, maxHeight: `min(${cardMaxHeight}px, calc(100dvh - 7.5rem - env(safe-area-inset-top)))`, ["--w3c-wa-primary" as string]: brandPrimaryColour, ["--w3c-wa-accent" as string]: brandAccentColour }}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3.5" style={{ background: brandPrimaryColour }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10">
                {logoUrl ? (
                  <img src={logoUrl} alt="" className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="text-xs font-bold text-white">W3C</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="truncate text-sm font-semibold text-white">{businessName}</h2>
                <p id={descriptionId} className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-white/85"><span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,.85)]" aria-hidden="true" />Online</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => closeDialog(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Minimise enquiry assistant"
                title="Minimise"
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => closeDialog(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close and reset enquiry"
                title="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col bg-[#15151A]">
              <div ref={conversationRef} className="custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-4 overscroll-contain">
                <div className="text-center text-[10px] font-medium tracking-wide text-white/45">
                  {currentDate}
                </div>

                <div className="w3c-wa-message-bubble relative max-w-[94%] rounded-2xl rounded-tl-sm border border-white/[0.07] bg-[#202027] px-3.5 py-3 text-[12px] leading-[1.7] text-white/80 shadow-sm">
                  <p className="font-semibold text-white">Welcome to W3C Digital Network.</p>
                  <p className="mt-1.5">{welcomeMessage}</p>
                  <div className="mt-1.5 flex justify-end">
                    <time className="text-[9px] leading-none text-white/40" aria-label={"Message sent at " + currentTime + " West Africa Time"}>{currentTime}</time>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {enquiryOptions.map((option, index) => (
                    <button
                      key={`${option.label}-${index}`}
                      type="button"
                      onClick={() => chooseEnquiry(option, index)}
                      aria-pressed={selectedIndex === index}
                      className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-[12px] font-medium leading-snug shadow-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15151A] ${selectedIndex === index ? "border-[var(--w3c-wa-accent)] bg-white/[0.09] text-white" : "border-white/[0.08] bg-white/[0.035] text-white/75 hover:border-white/20 hover:bg-white/[0.07]"}`}
                      style={{ ["--tw-ring-color" as string]: brandAccentColour }}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold" style={{ backgroundColor: selectedIndex === index ? brandAccentColour : "rgba(255,255,255,.08)", color: selectedIndex === index ? "#17131f" : "rgba(255,255,255,.55)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">{option.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  ))}
                </div>

                {selectedIndex !== null && (
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-[#202027] p-3 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="w3c-wa-message" className="text-[11px] font-semibold text-white">Your message</label>
                      <span className="text-[10px] text-white/35">You can edit this</span>
                    </div>
                    <textarea
                      id="w3c-wa-message"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      rows={5}
                      className="w-full resize-y rounded-lg border border-white/10 bg-black/20 p-2.5 text-[12px] leading-relaxed text-white/85 outline-none transition placeholder:text-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10"
                      aria-label="Edit your WhatsApp enquiry message"
                    />
                    <button
                      type="button"
                      onClick={continueToWhatsApp}
                      disabled={!draft.trim() || !safeNumber}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[12px] font-bold text-[#082b18] shadow-sm transition hover:bg-[#20c45d] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#202027]"
                    >
                      <SiWhatsapp className="h-4 w-4" aria-hidden="true" />
                      Continue to WhatsApp
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    {!safeNumber && <p className="text-[10px] text-red-300">WhatsApp number is not configured correctly.</p>}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`w3c-wa-trigger ${positionClass} fixed bottom-6 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/35`}
        aria-label={isOpen ? "Close WhatsApp enquiry assistant" : buttonLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
      >
        <span className="w3c-wa-pulse pointer-events-none absolute inset-0 rounded-full" aria-hidden="true" />
        <SiWhatsapp className="relative z-10 h-7 w-7" aria-hidden="true" />
      </button>
    </>
  );
}

export const defaultW3CEnquiryOptions = DEFAULT_OPTIONS;
