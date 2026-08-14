import { useState, useEffect } from "react";
import { DollarSign, Search, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { AnimSection, AnimItem, fadeUp, slideRight } from "../utils/animations";
import { useCounter } from "../hooks/useCounter";

const searchQueries = [
  '"volunteer opportunities"',
  '"mental health nonprofit"',
  '"donate to animal shelter"',
];

function CounterStat({ end, prefix = "", suffix = "", label, decimals = 0 }) {
  const { count, ref } = useCounter(end, 2200);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-4xl lg:text-5xl font-black gradient-text mb-2">
        {prefix}
        {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-slate-400 text-sm sm:text-base lg:text-lg font-medium">
        {label}
      </div>
    </div>
  );
}

function PhoneMockup() {
  const [typedText, setTypedText] = useState("");
  const [queryIndex, setQueryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // Deliberately not `triggerOnce`: the typewriter below re-runs its effect
  // every 45-85ms, so latching `inView` to true would keep it re-rendering for
  // the rest of the session once the section had been seen a single time.
  const { ref, inView } = useInView({ threshold: 0.3 });

  const queries = [
    {
      text: "volunteer opportunities",
      title: "Find Volunteer Opportunities Near You",
      desc1: "Join 500+ volunteers making a difference.",
      desc2: "Sign up today — no experience needed.",
    },
    {
      text: "mental health nonprofit",
      title: "Mental Health Support & Resources",
      desc1: "Free counseling, peer support & workshops.",
      desc2: "Helping 2,000+ people in your community.",
    },
    {
      text: "donate to animal shelter",
      title: "Donate to Your Local Animal Shelter",
      desc1: "Every dollar feeds & shelters animals in need.",
      desc2: "100% goes directly to the animals.",
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const current = queries[queryIndex].text;
    let timeout;

    let resultsTimeout;

    if (!isDeleting && typedText === current) {
      setShowAd(true);
      resultsTimeout = setTimeout(() => setShowResults(true), 450);
      timeout = setTimeout(() => {
        setShowAd(false);
        setShowResults(false);
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setQueryIndex((i) => (i + 1) % queries.length);
      timeout = setTimeout(() => {}, 300);
    } else {
      timeout = setTimeout(
        () => {
          setTypedText((t) =>
            isDeleting ? t.slice(0, -1) : current.slice(0, t.length + 1),
          );
        },
        isDeleting ? 45 : 85,
      );
    }

    return () => {
      clearTimeout(timeout);
      clearTimeout(resultsTimeout);
    };
  }, [inView, typedText, isDeleting, queryIndex]);

  const currentAd = queries[queryIndex];

  return (
    <div ref={ref} className="relative mx-auto w-[260px] sm:w-[300px]">
      {/* Phone shell */}
      <div
        className="relative rounded-[44px] bg-[#111] p-[10px]"
        style={{
          boxShadow:
            "0 50px 100px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Buttons */}
        <div className="absolute left-[-3px] top-[80px] w-[3px] h-8 bg-[#333] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[124px] w-[3px] h-10 bg-[#333] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-10 bg-[#333] rounded-l-sm" />
        <div className="absolute right-[-3px] top-[120px] w-[3px] h-14 bg-[#333] rounded-r-sm" />
        {/* Screen */}
        <div
          className="relative rounded-[36px] overflow-hidden"
          style={{ minHeight: 530, backgroundColor: "#ffffff" }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full z-10"
            style={{ backgroundColor: "#000000" }}
          />
          <div className="pt-12 pb-6 px-3">
            {/* Google wordmark */}
            <div className="text-center mb-3">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>
            {/* Search bar */}
            <div
              className="flex items-center gap-2 border border-gray-300 rounded-full px-3.5 py-2 mb-4 shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="#9aa0a6"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4-4" />
              </svg>
              <span className="text-gray-800 text-[12px] flex-1 font-medium">
                {typedText}
                <span className="inline-block w-px h-[12px] bg-gray-700 ml-0.5 animate-pulse align-middle" />
              </span>
            </div>
            {/* Ad card */}
            <div
              className={`reveal-rise mb-3 p-3 border border-[#e8f0fe] rounded-xl bg-[#fafbff] shadow-sm ${
                showAd ? "is-shown" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[8px] font-bold text-gray-600 border border-gray-400 rounded px-1 py-px leading-none">
                  Ad
                </span>
                <span className="text-[9px] text-green-700 font-medium">
                  www.yournonprofit.org
                </span>
              </div>
              <p className="text-[#1558D6] text-[12px] font-semibold leading-snug mb-1">
                {currentAd.title}
              </p>
              <p className="text-gray-500 text-[10px] leading-relaxed">
                {currentAd.desc1}
                <br />
                {currentAd.desc2}
              </p>
            </div>
            {/* Skeleton organic results */}
            <div
              className={`reveal-fade space-y-2.5 ${showResults ? "is-shown" : ""}`}
            >
              {[
                { w1: "55%", w2: "80%", w3: "90%", w4: "65%" },
                { w1: "60%", w2: "75%", w3: "85%", w4: "70%" },
              ].map((row, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-gray-50">
                  <div
                    className="h-[7px] bg-gray-200 rounded mb-1.5"
                    style={{ width: row.w1 }}
                  />
                  <div
                    className="h-[9px] bg-gray-300 rounded mb-1"
                    style={{ width: row.w2 }}
                  />
                  <div
                    className="h-[7px] bg-gray-200 rounded mb-1"
                    style={{ width: row.w3 }}
                  />
                  <div
                    className="h-[7px] bg-gray-200 rounded"
                    style={{ width: row.w4 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Opportunity() {
  const scrollToEligibility = () => {
    document
      .querySelector("#contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="opportunity"
      className="relative py-16 sm:py-24 overflow-hidden scroll-mt-[100px]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Phone mockup demo — left, h2+p — right */}
        <AnimSection className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* Left: phone mockup */}
          <div className="flex flex-col items-center shrink-0">
            {/* data-anim-item rather than <AnimItem> where the original tag
                matters: AnimItem always renders a div. */}
            <p
              data-anim-item
              className="anim-item anim-fade-up text-center text-slate-400 text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-10"
            >
              Here's what it looks like in Google Search
            </p>
            <AnimItem>
              <PhoneMockup />
            </AnimItem>
          </div>

          {/* Right: h2 + p + button */}
          <AnimItem variant={slideRight} className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center lg:text-left leading-tight mb-6">
              $10,000/Month. Every Month. Already Yours If You Qualify.
            </h2>
            <p className="text-slate-300 text-center lg:text-left text-base sm:text-2xl mb-8 leading-relaxed">
              Google gives eligible nonprofits{" "}
              <strong className="text-white">up to $10,000/month</strong>{" "}
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() =>
                  document
                    .querySelector("#contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
              >
                Check My Eligibility →
              </button>
            </div>
          </AnimItem>
        </AnimSection>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Search queries visual */}
          <AnimSection className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Search size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                People are already searching for you:
              </h3>
            </div>
            <div className="space-y-3">
              {searchQueries.map((query, i) => (
                <AnimItem
                  key={i}
                  variant={slideRight}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/20 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Search size={12} className="text-emerald-400" />
                  </div>
                  <span className="text-slate-300 text-sm sm:text-lg font-mono">
                    {query}
                  </span>
                  <div className="ml-auto">
                    <span className="text-sm sm:text-lg text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Ad
                    </span>
                  </div>
                </AnimItem>
              ))}
            </div>
            <p className="text-emerald-400 font-semibold text-base sm:text-lg mt-5 text-center">
              → Your organization appears first. You pay $0.
            </p>
          </AnimSection>

          {/* Right: Stats & math */}
          <AnimSection className="flex flex-col gap-4">
            {/* Big dollar visual */}
            <div className="glass-card rounded-2xl p-8 text-center border border-emerald-500/15 flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl" />
              <div className="relative z-10">
                <div className="text-7xl sm:text-8xl font-black gradient-text mb-2 leading-none">
                  $10K
                </div>
                <div className="text-slate-300 text-sm sm:text-lg font-semibold mb-1">
                  per month in free ads
                </div>
                <div className="text-slate-500 text-sm sm:text-lg">
                  Google funds it completely
                </div>
                <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-black text-white">$120K</div>
                    <div className="text-slate-400 text-sm sm:text-lg mt-0.5">
                      per year total value
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">$0</div>
                    <div className="text-slate-400 text-sm sm:text-lg mt-0.5">
                      ad spend from you
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency math */}
            {/* <div className="urgency-box p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="text-[#c44a32] font-bold mb-1">
                    Every month you wait...
                  </p>
                  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
                    ...is{" "}
                    <strong className="text-[#c44a32]">
                      up to $10,000 in free advertising
                    </strong>{" "}
                    that disappears forever. It doesn't accumulate or carry
                    over. Waiting 3 months to start costs you{" "}
                    <strong className="text-[#c44a32]">
                      $30,000 in potential reach.
                    </strong>
                  </p>
                </div>
              </div>
            </div> */}
          </AnimSection>
        </div>

        {/* Counter stats */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="glass-card rounded-2xl p-8 sm:p-10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <CounterStat
                  end={120000}
                  prefix="$"
                  label="Per year in free ads"
                  suffix=""
                />
                <CounterStat end={200} suffix="+" label="Nonprofits helped" />
                <CounterStat end={99} suffix="%" label="Grant approval rate" />
                <CounterStat
                  end={30}
                  suffix=" days"
                  label="To live campaigns"
                />
              </div>
            </div>
          </AnimItem>
          <div className="flex justify-center mt-8">
            <button
              onClick={scrollToEligibility}
              className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
            >
              Check My Eligibility →
            </button>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
