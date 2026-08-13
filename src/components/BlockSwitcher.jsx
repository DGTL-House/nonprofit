import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Floating pill nav — jump between the key sections from anywhere on the page.
// Appears once the hero scrolls away and highlights the section in view.
// `short` is used below the `sm` breakpoint so all three pills plus the
// back-to-top arrow still fit on a 320px-wide screen without wrapping.
const BLOCKS = [
  { label: "Google Grant", short: "Grant", href: "#ad-credit" },
  { label: "ROI Projection", short: "ROI", href: "#roi-projection" },
  { label: "Pricing", short: "Pricing", href: "#pricing" },
];

export default function BlockSwitcher() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  // The booking form has its own CTA — get the switcher out of the way there.
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const onScroll = () => {
      const past = hero
        ? window.scrollY > hero.offsetHeight - 120
        : window.scrollY > 600;
      setVisible(past);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = BLOCKS.map((b) => document.getElementById(b.href.slice(1)))
      .filter(Boolean);
    let io;
    if ("IntersectionObserver" in window && sections.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" },
      );
      sections.forEach((s) => io.observe(s));
    }

    const form = document.getElementById("contact-form");
    let formIo;
    if ("IntersectionObserver" in window && form) {
      formIo = new IntersectionObserver(
        ([entry]) => setOverForm(entry.isIntersecting),
        { threshold: 0 },
      );
      formIo.observe(form);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      formIo?.disconnect();
    };
  }, []);

  const handleTap = (e) => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    el.classList.remove("tapped");
    void el.offsetWidth; // restart the animation
    el.classList.add("tapped");
  };

  return (
    <div
      className={`block-switcher fixed bottom-2 inset-x-0 mx-auto w-max max-w-[calc(100%-0.75rem)] z-40 px-1.5 sm:px-2.5 ${
        visible && !overForm ? "is-active" : ""
      }`}
      aria-label="Jump to section"
    >
      <div className="flex items-center justify-center gap-1.5 min-[321px]:gap-2 sm:gap-2.5">
        {BLOCKS.map((link) => {
          const id = link.href.slice(1);
          const on = active === id;
          return (
            <a
              key={link.href}
              href={link.href}
              onPointerDown={handleTap}
              onAnimationEnd={(e) => e.currentTarget.classList.remove("tapped")}
              aria-current={on ? "true" : "false"}
              className={`switch-pill backdrop-blur-lg px-2.5 py-1.5 text-xs min-[321px]:px-4 min-[321px]:py-2.5 min-[321px]:text-sm sm:px-5 sm:py-2.5 sm:text-base rounded-full font-semibold whitespace-nowrap ${
                on ? "is-active" : ""
              }`}
            >
              <span className="sm:hidden">{link.short}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          );
        })}

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onPointerDown={handleTap}
          onAnimationEnd={(e) => e.currentTarget.classList.remove("tapped")}
          aria-label="Back to top"
          className="switch-pill backdrop-blur-lg w-8 h-8 min-[321px]:w-10 min-[321px]:h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <ArrowUp size={16} className="min-[321px]:w-5 min-[321px]:h-5" />
        </button>
      </div>
    </div>
  );
}
