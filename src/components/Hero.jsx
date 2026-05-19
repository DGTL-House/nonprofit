import { Clock, BadgeCheck, Star, Lock } from "lucide-react";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  AnimSection,
  AnimItem,
} from "../utils/animations";

const trustBadges = [
  {
    icon: <BadgeCheck size={15} className="text-emerald-400" />,
    text: "Google Ad Grants Certified Partner",
  },
  {
    icon: (
      <Star size={15} className="text-gold-400 fill-current text-yellow-400" />
    ),
    text: "Trusted by 200+ nonprofits",
  },
  {
    icon: <Lock size={15} className="text-emerald-400" />,
    text: "Your account stays yours. Always.",
  },
];

export default function Hero() {
  const scrollToEligibility = () => {
    document
      .querySelector("#contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-12 pb-16 sm:pb-20 bg-[#ffffff]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <div className="flex flex-col gap-3 sm:gap-8 lg:gap-10">
            {/* Google for Nonprofits Partners badge — centered above everything */}
            <AnimItem variant={fadeUp} className="pt-6 lg:pt-12">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ffffff] border border-[#ebe9e0] shadow-sm w-full sm:w-auto justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-[#161514] text-base sm:text-lg font-semibold tracking-wide">
                    Google for Nonprofits Partners
                  </span>
                </div>
              </div>
            </AnimItem>

            {/* Row 1: image (left) + h1 + p (right) */}
            <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14">
              {/* Image — mobile: top, desktop: left, height = h1+p */}
              <AnimItem
                variant={scaleIn}
                className="shrink-0 lg:w-[420px] xl:w-[460px]"
              >
                <div className="w-full max-w-sm mx-auto lg:max-w-none lg:h-full">
                  <img
                    src="/home-img.webp"
                    alt="Nonprofit volunteers working with Google Ad Grants"
                    width="920"
                    height="614"
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-64 sm:h-80 lg:h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </AnimItem>

              {/* h1 + p + CTA */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                {/* Main headline */}
                <AnimItem variant={fadeUp}>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.08] tracking-tight mb-6 text-center lg:text-left">
                    <span className="text-[#161514]">
                      Get a Free $10,000/Month Google Grant for Your Nonprofit —
                      Guaranteed.
                    </span>
                  </h1>
                </AnimItem>

                {/* Subheadline */}
                <AnimItem variant={fadeUp}>
                  <p className="text-base sm:text-lg lg:text-xl text-[#52504C] leading-relaxed text-center lg:text-left mb-6">
                    We handle Google Ad Grants end-to-end — so more donors,
                    volunteers, and partners find you. At $0 ad spend.{" "}
                    <strong className="text-[#52504C]">$0 ad spend.</strong>
                  </p>
                </AnimItem>

                {/* Primary CTA */}
                <AnimItem variant={scaleIn}>
                  <div className="flex justify-center lg:justify-start">
                    <a
                      href="#contact-form"
                      className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
                    >
                      Check My Eligibility →
                    </a>
                  </div>
                </AnimItem>
              </div>
            </div>

            {/* Row 2: pills, CTAs, micro-copy, trust badges, stats — centered */}
            <div className="flex flex-col items-center">
              {/* Free grant + timeline pills */}
              <AnimItem variant={fadeUp}>
                <div className="flex justify-center w-full mb-6">
                  <div className="relative flex flex-row items-center justify-center gap-4 w-full max-w-2xl px-6 py-5 rounded-2xl bg-[#f0eee6] border border-[#ebe9e0] shadow-md overflow-hidden">
                    {/* Pulsing dot */}
                    <span className="absolute top-3 right-3 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 opacity-70" />
                    </span>
                    <span className="text-4xl leading-none select-none drop-shadow">
                      🎁
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-[#161514] text-sm sm:text-lg font-bold leading-snug">
                        We get your grant approved —{" "}
                        <a
                          href="#contact-form"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .querySelector("#contact-form")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-emerald-700 underline underline-offset-4 decoration-dotted hover:text-emerald-900 transition-colors cursor-pointer"
                        >
                          free
                        </a>
                        .
                      </span>
                      <span className="text-[#52504C] text-xs sm:text-sm font-normal leading-snug mt-0.5">
                        So you see it&apos;s real before you commit.
                      </span>
                    </div>
                  </div>
                </div>
              </AnimItem>
              {/* CTAs */}
              <AnimItem variant={scaleIn}>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  <a
                    href="#opportunity"
                    className="btn-secondary text-base sm:text-2xl !py-2.5 sm:!py-3.5 !px-6 sm:!px-7"
                  >
                    See How It Works
                  </a>
                  <a
                    href="#credibility"
                    className="btn-secondary text-base sm:text-2xl !py-2.5 sm:!py-3.5 !px-6 sm:!px-7"
                  >
                    View Case Studies
                  </a>
                </div>
              </AnimItem>
              {/* Supporting micro-copy */}
              <AnimItem variant={fadeIn}>
                <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm sm:text-base font-bold">
                      Fully done-for-you
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm sm:text-base font-bold">
                      Cancel anytime
                    </span>
                  </div>
                </div>
              </AnimItem>
              <div className="flex flex-col items-center gap-3 mb-4 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0eee6]">
                  <Clock size={16} className="text-[#3f5028]" />
                  <span className="text-[#52504C] text-sm sm:text-lg font-medium">
                    Grant live in as little as{" "}
                    <strong className="text-[#3f5028] font-bold">
                      2 weeks
                    </strong>
                  </span>
                </div>
              </div>
              <AnimItem variant={fadeUp}>
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                  {[
                    { value: "$10K", label: "Per month free ads" },
                    { value: "99%", label: "Approval rate" },
                    { value: "30d", label: "To first results" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1">
                        {stat.value}
                      </div>
                      <div className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimItem>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
