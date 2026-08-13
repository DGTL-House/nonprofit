import { useState, useEffect } from "react";

// Inline SVGs (formerly from lucide-react) so the icons chunk stays off the
// critical path. The header is rendered on first paint, so every kilobyte
// we drop here directly improves mobile LCP / TBT.
function MenuIcon({ size = 22 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ size = 22 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// The header CTA sends visitors into the eligibility quiz, not straight to
// the booking widget — the quiz screen carries the booking link itself.
const CTA_HREF = "#contact-form";

const navLinks = [
  { label: "What's Ad Credit?", href: "#ad-credit" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "ROI Projection", href: "#roi-projection" },
  { label: "Pricing", href: "#pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      // Read scroll position inside rAF to batch with the next paint and
      // avoid forced layout/reflow on every scroll event (mobile perf).
      requestAnimationFrame(() => {
        const next = window.scrollY > 40;
        if (next !== lastScrolled) {
          lastScrolled = next;
          setScrolled(next);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Every target below the hero is behind DeferredMount + a lazy chunk, so a
    // click during the first moments on the page can land before the section
    // exists. Poll briefly instead of silently doing nothing.
    let tries = 0;
    const retry = setInterval(() => {
      const late = document.querySelector(href);
      if (late) late.scrollIntoView({ behavior: "smooth" });
      if (late || ++tries > 30) clearInterval(retry);
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color] duration-300 will-change-[padding] ${
        scrolled
          ? "bg-[#ffffff]/95 backdrop-blur-lg border-b border-[#ebe9e0] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center group"
        >
          <img
            src="/nonprofit-logo.svg"
            alt="DGTL-House — Google Ad Grants for Nonprofits"
            width="160"
            height="32"
            decoding="async"
            className="h-8 w-auto group-hover:opacity-90 transition-opacity duration-300"
          />
        </a>
        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 text-slate-300 hover:text-white text-base sm:text-lg font-medium rounded-lg hover:bg-white/[0.06] transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={CTA_HREF}
            onClick={(e) => {
              e.preventDefault();
              handleNav(CTA_HREF);
            }}
            className="btn-primary !text-lg !py-2.5 !px-5"
          >
            Check My Eligibility
            <ChevronRightIcon size={16} />
          </a>
        </div>
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-white"
        >
          {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#ebe9e0] bg-[#ffffff]/98 backdrop-blur-lg animate-[fadeDown_0.25s_ease-out]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 text-slate-300 hover:text-white text-sx font-medium rounded-lg hover:bg-white/[0.06] transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/[0.06] mt-2">
              <a
                href={CTA_HREF}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(CTA_HREF);
                }}
                className="btn-primary w-full justify-center !py-2.5 !px-5"
              >
                Check My Eligibility
                <ChevronRightIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
