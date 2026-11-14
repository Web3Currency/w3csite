import { useEffect } from "react";

export default function TheReviewsMini() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://thereviews.net/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="mt-8 flex justify-start">
      <div className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
        <div
          className="thereviews-widget"
          data-business="web3currency.online"
          data-variant="mini"
          data-theme="dark"
          data-mode="inline"
        >
          <a href="https://thereviews.net/review/web3currency.online">Read our reviews on TheReviews.net</a>
        </div>
      </div>
    </div>
  );
}
