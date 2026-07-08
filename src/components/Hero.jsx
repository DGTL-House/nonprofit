// Inline SVG (was lucide-react `Clock`) so Hero doesn't pull the icons chunk
// onto the critical path on mobile.
function ClockIcon({ size = 16, className = "" }) {
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-12 pb-16 sm:pb-20 bg-[#ffffff]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:gap-8 lg:gap-10">
          {/* Google for Nonprofits Partners badge */}
          <div className="pt-6 lg:pt-12">
            <p className="text-center text-sm sm:text-lg text-gray-400 mb-1">
              click to learn more
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
              <a
                href="#google-partner-advantage"
                className="attention-pulse flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ffffff] border border-[#ebe9e0] shadow-sm w-full sm:w-auto justify-center transition-colors hover:border-[#d4e4a8] hover:bg-[#f8f7f3]"
              >
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
              </a>
            </div>
          </div>

          {/* Row 1: image + h1 + p */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-10 lg:gap-14">
            <div className="shrink-0 lg:w-[420px] xl:w-[460px]">
              <div className="w-full max-w-sm mx-auto lg:max-w-none lg:h-full">
                <picture>
                  {/* Mobile gets a tiny image since visible area is just h-32 (128px tall, ~360px wide). */}
                  <source
                    media="(max-width: 639px)"
                    srcSet="/home-img-480.webp"
                    width="480"
                    height="320"
                  />
                  <img
                    src="/home-img-720.webp"
                    srcSet="/home-img-720.webp 720w, /home-img-960.webp 960w, /home-img-1280.webp 1280w"
                    sizes="(min-width: 1280px) 460px, (min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
                    alt="Nonprofit volunteers working with Google Ad Grants"
                    width="920"
                    height="614"
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-32 sm:h-80 lg:h-full object-cover rounded-3xl shadow-2xl"
                  />
                </picture>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.08] tracking-tight mb-3 sm:mb-6 text-center lg:text-left">
                <span className="text-[#161514]">
                  Get a Free $10,000/Month{" "}
                  <a
                    href="#ad-credit"
                    className="ad-credit-word whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    Google Ad Credit
                    <span className="sparkle-emoji" aria-hidden="true">
                      ✨
                    </span>
                  </a>{" "}
                  for Your Nonprofit — Guaranteed.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#52504C] leading-relaxed text-center lg:text-left mb-3 sm:mb-6">
                Google pays for the ads. We handle everything end-to-end — so
                donors and volunteers find you on Google.{" "}
                <strong className="text-[#52504C]">$0 ad spend.</strong>
              </p>

              <div className="flex justify-center lg:justify-start">
                <a
                  href="#contact-form"
                  className="btn-primary attention-pulse text-base sm:text-2xl !py-2 sm:!py-4 !px-6 sm:!px-8"
                >
                  Check My Eligibility →
                </a>
              </div>

            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full mb-6">
              <a
                href="#ad-credit"
                className="btn-primary attention-pulse text-base sm:text-2xl !py-2.5 sm:!py-3.5 !px-6 sm:!px-8"
              >
                What's Ad Credit?
              </a>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#3f5028] text-[#3f5028] font-semibold text-sm sm:text-base px-4 py-2">
                  ✕ not cash
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#3f5028] text-[#3f5028] font-semibold text-sm sm:text-base px-4 py-2">
                  ✓ $10K ad credit
                </span>
              </div>
            </div>

            <div className="lg:hidden">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <a
                  href="#ad-credit"
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
            </div>

            <div className="flex flex-col items-center gap-3 mb-4 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0eee6]">
                <ClockIcon size={16} className="text-[#3f5028]" />
                <span className="text-[#52504C] text-sm sm:text-lg font-medium">
                  Grant live in as little as{" "}
                  <strong className="text-[#3f5028] font-bold">2 weeks</strong>
                </span>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
