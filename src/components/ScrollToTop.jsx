import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // rAF-throttled and change-guarded, same shape as Header's scroll handler:
    // the raw version called setState on every scroll event, so React
    // re-reconciled this tree dozens of times per second while scrolling.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const next = window.scrollY > 400;
        setVisible((prev) => (prev === next ? prev : next));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Always mounted and faded with CSS rather than mounted/unmounted through
    // AnimatePresence, so the exit animation costs no JS. It is taken out of
    // the tab order while hidden, which the old version got for free by
    // unmounting. The hover scale lives in CSS too: a Tailwind `hover:scale-*`
    // utility would fight the transform this class already owns.
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`scroll-top-btn fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 glow-green ${
        visible ? "is-visible" : ""
      }`}
    >
      <ArrowUp size={18} className="text-white" />
    </button>
  );
}
