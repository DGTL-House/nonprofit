import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-500 hidden sm:flex items-center justify-center shadow-lg shadow-emerald-900/40 glow-green hover:scale-110 transition-transform duration-200"
        >
          <ArrowUp size={18} className="text-white" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
