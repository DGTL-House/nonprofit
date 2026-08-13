import { useEffect, useRef, useState } from "react";
import { appendUtmParams } from "../utils/utm.js";
import { appendBookingParams } from "../utils/quizParams.js";
import EligibilityQuiz from "./EligibilityQuiz";
import NotEligibleCard from "./NotEligibleCard";

const BOOKING_URL =
  "https://api.dgtl-house.com/widget/bookings/dgtlhouse-nonprofits";

// Answers live in memory for the current page view only — a reload always
// starts the quiz over. On the eligible path they ride the booking link as
// query params (see the CTA below) so the widget can prefill the GHL contact.
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
            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#3d4a1f] mb-3.5">
              Your Roadmap Session
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-black leading-[1.08] tracking-tight text-[#1a1a1a] mb-0">
              Map Your Path to{" "}
              <span className="text-[#3d4a1f]">Steady Monthly Donations.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5a5a5a] leading-relaxed mt-3.5">
              In 30 minutes, we'll build your 6-month plan — from grant setup to
              steady donation flow. Based on 200+ nonprofit accounts, tailored to
              your niche.
            </p>

            {/* What we'll build together */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5a5a5a] mt-7 mb-3.5">
              What we'll build together
            </p>
            <ul className="space-y-3.5 mb-2">
              {[
                [
                  "Your DH 2-Step plan",
                  "How we'll spend the full $10K and turn traffic into donations.",
                ],
                [
                  "Your ROI projection",
                  "Donations, conversions, month-by-month for your niche.",
                ],
                [
                  "Your grant readiness check",
                  "What's ready, what needs fixing, where the quick wins are.",
                ],
              ].map(([lead, desc]) => (
                <li key={lead} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-md bg-[#d4e4a8] flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-[#3d4a1f]">
                    ✓
                  </span>
                  <span>
                    <span className="block font-semibold text-[#1a1a1a] text-base sm:text-lg">
                      {lead}
                    </span>
                    <span className="text-[13px] sm:text-sm text-[#5a5a5a]">
                      {desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={appendUtmParams(appendBookingParams(BOOKING_URL, answers))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full !text-lg sm:!text-xl !py-4 mt-7"
            >
              Book Your Strategy Call →
            </a>

            <p className="text-center text-sm text-[#5a5a5a] mt-2.5 leading-relaxed">
              30 min · Google Meet · Times shown in your local time zone
            </p>

            {/* Booking confirmation notice */}
            <div className="flex items-start gap-3 rounded-2xl bg-[#fef7e0] p-4 sm:p-5 mt-5">
              <span className="text-lg leading-none mt-0.5">⚠️</span>
              <div>
                <p className="font-semibold text-[#8a6a1d] text-sm sm:text-base mb-1">
                  Confirm your booking
                </p>
                <p className="text-[#8a6a1d] text-[13px] sm:text-sm leading-relaxed">
                  You'll get an email or SMS — your call{" "}
                  <strong className="font-bold">
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
