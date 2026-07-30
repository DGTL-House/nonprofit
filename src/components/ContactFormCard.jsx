import { useEffect, useRef, useState } from "react";
import { appendUtmParams } from "../utils/utm.js";
import EligibilityQuiz from "./EligibilityQuiz";
import NotEligibleCard from "./NotEligibleCard";

const BOOKING_URL =
  "https://api.dgtl-house.com/widget/bookings/dgtlhouse-nonprofits";

// Answers live in memory for the current page view only — a reload always
// starts the quiz over. Nothing is posted anywhere yet; when a backend/CRM
// endpoint exists, send `answers` from handleComplete().
const LEGACY_STORAGE_KEYS = ["eligibility-quiz-v1", "eligibility-quiz-v2"];

export default function ContactFormCard() {
  const [answers, setAnswers] = useState(null);
  // Set by the quiz's final question: 501(c)(3) → booking, otherwise the
  // "not eligible yet" screen.
  const [eligible, setEligible] = useState(false);
  const sectionRef = useRef(null);

  // Clear results saved by earlier builds so returning visitors aren't left
  // with a stale completed state in storage.
  useEffect(() => {
    try {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      /* storage unavailable — nothing to clean up */
    }
  }, []);

  // Focus mode: while the quiz is on screen, get the page chrome out of the way.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || answers || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) =>
        document.body.classList.toggle("quiz-focus", entry.isIntersecting),
      // Fires on overlap with the middle band of the viewport, so a quiz card
      // taller than the screen still counts as "on screen".
      { threshold: 0, rootMargin: "-25% 0px -25% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      document.body.classList.remove("quiz-focus");
    };
  }, [answers]);

  const handleComplete = (collected, isEligible) => {
    setAnswers(collected);
    setEligible(isEligible);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className={`bg-gray-50 scroll-mt-10 sm:scroll-mt-2 ${
        answers ? "py-8 sm:py-16" : "min-h-svh py-10 sm:py-16 flex items-center"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {!answers ? (
          <EligibilityQuiz onComplete={handleComplete} />
        ) : !eligible ? (
          <NotEligibleCard />
        ) : (
          <div className="bg-[#ffffff] rounded-3xl border border-gray-100 p-6 sm:p-10 quiz-fade">
            <span className="inline-flex items-center gap-1.5 bg-[#eef9d0] text-[#3B6D11] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              ✓ You look like a strong fit
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-2">
              Great — Let's Book
              <br />
              Your Call
            </h2>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#f3ebe6] text-[#8a4b2f] text-sm sm:text-base font-bold px-4 py-2 rounded-full">
                ✕ not cash
              </span>
              <a
                href="#ad-credit"
                className="inline-flex items-center gap-1.5 bg-[#b5e550] hover:bg-[#a3d444] text-black text-sm sm:text-base font-bold px-4 py-2 rounded-full transition-colors"
              >
                ✓ $10K ad credit
              </a>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* What we'll cover */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              What we'll cover
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Review your nonprofit's profile and current digital presence",
                "Confirm your eligibility for the Google Ad Grant program",
                "Map out your next steps and what results to expect",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base sm:text-lg text-gray-700"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#b5e550] flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#3B6D11]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={appendUtmParams(BOOKING_URL)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#b5e550] hover:bg-[#a3d444] text-black font-semibold text-base sm:text-2xl py-3 sm:py-4 px-6 rounded-full transition-colors"
            >
              Schedule a Call — It's Free →
            </a>

            <p className="text-center text-sm sm:text-lg text-gray-400 mt-2">
              Check your time zone
              <br />
              Times shown in your local time zone.
            </p>

            {/* Booking confirmation notice — last, so it's the final thing read */}
            <div className="flex items-start gap-3 rounded-2xl bg-[#fff8e6] border border-[#f1dfae] p-4 sm:p-5 mt-6">
              <span className="text-lg leading-none mt-0.5">⚠️</span>
              <div>
                <p className="font-bold text-[#7a5a12] text-base sm:text-lg mb-1">
                  Confirm your booking
                </p>
                <p className="text-[#7a5a12]/90 text-sm sm:text-base">
                  You'll get an email or SMS — your call{" "}
                  <strong className="font-bold text-[#7a5a12]">
                    isn't confirmed until you reply.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
