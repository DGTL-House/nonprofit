import { useEffect, useState } from "react";

// Floating pill nav — jump between the key sections from anywhere on the page.
// Appears once the hero scrolls away and highlights the section in view.
const BLOCKS = [
  { label: "Google Grant", href: "#what-is-grants" },
  { label: "Ad Credit", href: "#ad-credit" },
  { label: "Case Studies", href: "#credibility" },
];

export default function BlockSwitcher() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
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
      className={`block-switcher fixed bottom-5 inset-x-0 mx-auto w-max max-w-[calc(100%-1rem)] z-40 px-2 sm:px-2.5 ${
        visible ? "is-active" : ""
      }`}
      aria-label="Jump to section"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
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
              className={`switch-pill backdrop-blur-lg px-3.5 sm:px-4 py-2 rounded-full text-[13px] sm:text-sm font-semibold whitespace-nowrap ${
                on ? "is-active" : ""
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
