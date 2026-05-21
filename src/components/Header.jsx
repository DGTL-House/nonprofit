import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { appendUtmParams } from "../utils/utm.js";

const BOOKING_URL =
  "https://api.dgtl-house.com/widget/bookings/dgtlhouse-nonprofits";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Cases", href: "#credibility" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
            fetchpriority="high"
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
            href={appendUtmParams(BOOKING_URL)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !text-lg !py-2.5 !px-5"
          >
            Schedule call
            <ChevronRight size={16} />
          </a>
        </div>
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-white"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#ebe9e0] bg-[#ffffff]/98 backdrop-blur-lg"
          >
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
                  href={appendUtmParams(BOOKING_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center !py-2.5 !px-5"
                >
                  Schedule call
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
