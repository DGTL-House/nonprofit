import { useState, useEffect } from "react";
import {
  Search,
  Wallet,
  Handshake,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { AnimSection, AnimItem, fadeUp, slideRight } from "../utils/animations";

const searchQueries = [
  '"volunteer opportunities"',
  '"mental health nonprofit"',
  '"donate to animal shelter"',
];

const comparison = [
  {
    id: "business",
    title: "Regular business",
    tone: "bad",
    icon: Wallet,
    rows: [
      { label: "Cost per click", value: "$2–$10" },
      { label: "Monthly ad bill", value: "$10,000 out of pocket" },
      { label: "Result", value: "Ads run at the top of Google." },
    ],
  },
  {
    id: "nonprofit",
    title: "Your nonprofit",
    tone: "good",
    icon: Handshake,
    rows: [
      { label: "Cost per click", value: "$0" },
      { label: "Monthly ad bill", value: "$0" },
      {
        label: "Result",
        value: "Same ads. Same top spot. Google covers the bill.",
      },
    ],
  },
];

const requirements = [
  "5% click-through rate minimum (industry average is 3–4%)",
  "Strict account structure and campaign compliance rules",
  "Ongoing keyword research — including negative keyword management",
  "Quality Score optimization on every ad group",
  "Compliant landing pages and full conversion tracking",
];

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
      id="ad-credit"
      className="relative py-8 sm:py-16 overflow-hidden scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-4xl mx-auto leading-tight mb-4">
              Ad Credit Isn't Cash.
              <br />
              <span className="text-[#3f5028]">It's Something Better</span>
            </h2>
            <p className="text-slate-400 text-center text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
              Google gives you a free{" "}
              <strong className="text-white">$10,000/month budget</strong> for
              search ads. People are already searching for organizations like
              yours — it brings donors and volunteers to your site.
            </p>
          </AnimItem>
        </AnimSection>

        {/* 2. Phone mockup + search examples */}
        <AnimSection>
          {/* data-anim-item rather than <AnimItem> where the original tag
              matters: AnimItem always renders a div. */}
          <p
            data-anim-item
            className="anim-item anim-fade-up text-center text-slate-400 text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-6 sm:mb-8"
          >
            Here's what it looks like in Google Search
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-8 sm:mb-10">
            {/* Left: phone mockup */}
            <div className="flex flex-col items-center shrink-0">
              <AnimItem>
                <PhoneMockup />
              </AnimItem>
            </div>

            {/* Right: search examples + green callout */}
            <AnimItem variant={slideLeft} className="flex-1 min-w-0 w-full">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
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
                → Your organization appears first. You pay $0 for the ads.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={scrollToEligibility}
                  className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
                >
                  Check My Eligibility →
                </button>
              </div>
              </div>
            </AnimItem>
          </div>
        </AnimSection>

        {/* 3. Comparison + bridge */}
        <AnimSection>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-6">
            {comparison.map((col) => {
              const good = col.tone === "good";
              const Icon = col.icon;
              return (
                <AnimItem key={col.id} variant={fadeUp}>
                  <div
                    className={`h-full rounded-2xl p-4 sm:p-8 ${
                      good
                        ? "bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 border border-emerald-500/25"
                        : "glass-card"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          good ? "bg-emerald-500/15" : "bg-black/[0.06]"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            good ? "text-emerald-400" : "text-slate-500"
                          }
                        />
                      </div>
                      <span
                        className={`font-bold text-xs sm:text-lg uppercase tracking-wide leading-tight ${
                          good ? "text-emerald-400" : "text-slate-400"
                        }`}
                      >
                        {col.title}
                      </span>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                      {col.rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4 py-2.5 sm:py-3"
                        >
                          <span className="text-slate-400 text-xs sm:text-base">
                            {row.label}
                          </span>
                          <span
                            className={`sm:text-right font-bold text-sm sm:text-lg ${
                              good ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimItem>
              );
            })}
          </div>
          <AnimItem variant={fadeUp}>
            <p className="text-center text-[#3d4a1f] font-bold text-lg sm:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto">
              Same clicks. Same top-of-Google visibility.
              <br className="hidden lg:block" /> You just don't pay for them.
            </p>
          </AnimItem>
        </AnimSection>

        {/* 4. Requirements reality */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="glass-card rounded-2xl p-6 sm:p-9 mb-6">
              <h3 className="text-white font-black text-2xl sm:text-3xl text-center mb-2">
                Sounds simple.
                <br className="sm:hidden" /> Running it isn't.
              </h3>
              <p className="text-slate-400 text-center text-sm sm:text-lg mb-7 max-w-2xl mx-auto">
                Google gives you the credit — but only if your account plays by
                their rules. Miss a single requirement, and the grant is frozen
                or the account is suspended.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {requirements.map((r, i) => (
                  <li
                    key={r}
                    className={`flex items-start gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-slate-300 text-sm sm:text-lg ${
                      // Odd count: center the last card across both columns.
                      i === requirements.length - 1 && requirements.length % 2
                        ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.375rem)]"
                        : ""
                    }`}
                  >
                    <AlertTriangle
                      size={24}
                      className="text-amber-500 flex-shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7"
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3 max-w-2xl mx-auto">
                <AlertTriangle
                  size={18}
                  className="text-red-500 flex-shrink-0"
                />
                <span className="text-red-500 font-bold text-sm sm:text-lg text-center">
                  Break any of these — account suspended. Grant frozen.
                </span>
              </div>
            </div>
          </AnimItem>
        </AnimSection>

        {/* 5 + 6. Value proposition + CTA */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 border border-emerald-500/20 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                <ShieldCheck size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-black text-2xl sm:text-3xl mb-3 leading-tight">
                Your team runs the mission. Ours runs the account.
              </h3>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Google Ads is a full-time profession — and it's ours. We handle
                every requirement above so your{" "}
                <strong className="text-white">$10K/month credit</strong>{" "}
                actually converts into donors, volunteers, and awareness. You
                keep doing what you're here to do.
              </p>
              <button
                onClick={scrollToEligibility}
                className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8 mx-auto"
              >
                Check My Eligibility →
              </button>
            </div>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
