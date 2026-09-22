import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_VIEWPORTS = 0.8;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "fixed right-5 bottom-5 md:right-8 md:bottom-8 z-40",
        "w-11 h-11 md:w-12 md:h-12 rounded-full",
        "bg-primary text-black border border-primary/30 shadow-lg shadow-black/30",
        "flex items-center justify-center",
        "transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
