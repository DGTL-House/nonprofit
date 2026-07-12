import { useState, useEffect } from "react";
import { CheckCircle, Zap, Clock } from "lucide-react";
import { AnimSection, AnimItem, fadeUp, scaleIn } from "../utils/animations";
import { appendUtmParams } from "../utils/utm.js";
import FeatureComparison from "./FeatureComparison";

const BOOKING_URL =
  "https://api.dgtl-house.com/widget/booking/tFEuSDRUuOmEuv7QjTPA";

const plans = [
  {
    id: "starter",
    tab: "Starter",
    name: "Ad Grant Management",
    tagline: "Get $10K/month from Google. We handle everything",
    monthly: 250,
    annual: 200,
    oldPrice: 500,
    spots: 4,
    annualBilled: 2400,
    save: 20,
    saveYear: 600,
    features: [
      "Google for Nonprofits registration",
      "Google Ad Grant application & approval",
      "Conversion tracking setup in Google Ads",
      "Performance Max campaign setup",
      "Ongoing high-intent keyword research",
      "Ongoing campaign creation, testing, and launch",
      "Ongoing optimization to reach the full $10K/month",
      "Grant compliance monitoring (stay eligible)",
      "Monthly performance reporting",
    ],
  },
  {
    id: "standard",
    tab: "Standard",
    name: "Growth Partner",
    tagline: "Maximize your Grant spend. Grow organic traffic",
    badge: "Spend the full $10K faster",
    monthly: 500,
    annual: 350,
    oldPrice: 1000,
    spots: 2,
    annualBilled: 4200,
    save: 30,
    saveYear: 1800,
    popular: true,
    featuresHeading: "Everything in Ad Grant Management, plus:",
    features: [
      "SEO to lower your cost per click",
      "SEO to grow organic traffic",
      "Full web analytics setup",
      "GA4, GTM, GSC and Lookers reports",
      "Heatmaps & visitor recordings setup",
      "Personal project manager",
      "50% off any website support",
      "Monthly strategy call",
    ],
  },
  {
    id: "premium",
    tab: "Premium",
    name: "Impact Partner",
    tagline: "Turn your Grant into more donations",
    badge: "Full-service marketing",
    monthly: 1000,
    annual: 650,
    oldPrice: 2000,
    spots: 3,
    annualBilled: 7800,
    save: 35,
    saveYear: 4200,
    featuresHeading: "Everything in Growth Partner, plus:",
    features: [
      "Local SEO & Google Business Profile",
      "AEO - Answer Engine Optimization",
      "CRO - Conversion rate optimization to grow donations",
      "Blog research, writing & publishing",
      "Social media content & posting",
      "Email marketing + automated donor sequences",
      "70% off any website support",
      "Extra 2 hrs/mo of SEO work",
    ],
  },
];

const money = (n) => `$${n.toLocaleString("en-US")}`;

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState(10783); // 2:59:43
  const [billing, setBilling] = useState("annual");
  const [activePlan, setActivePlan] = useState("standard");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: String(h).padStart(2, "0"),
      m: String(m).padStart(2, "0"),
      s: String(s).padStart(2, "0"),
    };
  };

  return (
    <section
      id="pricing"
      className="relative py-8 sm:py-16 overflow-hidden scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center leading-tight mb-4">
              Services &amp; what's included
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-10">
              Our partnership program for non-profits{" "}
              <strong className="text-white">
                covers 50% of the full package
              </strong>{" "}
              cost to help mission-driven organizations grow smarter and faster
              online.
            </p>
          </AnimItem>
        </AnimSection>

        <AnimSection>
          {/* Billing toggle */}
          <AnimItem variant={fadeUp}>
            <div className="flex justify-center mb-8">
              <div className="relative inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
                {["annual", "monthly"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className={`px-5 sm:px-8 py-2 rounded-full text-sm sm:text-base font-bold capitalize transition-colors ${
                      billing === b
                        ? "bg-[#b5e550] text-black"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}

                {/* Save badge anchored to the Annual option */}
                <span className="absolute -top-3 left-1 -translate-y-full inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#3B6D11] bg-[#eef9d0] px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                  💚 Save up to 35%
                  <span className="absolute -bottom-1 left-6 w-2 h-2 bg-[#eef9d0] rotate-45" />
                </span>
              </div>
            </div>
          </AnimItem>

          {/* Plan tabs (mobile) */}
          <AnimItem variant={fadeUp}>
            <div className="flex lg:hidden justify-center gap-2 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setActivePlan(plan.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    activePlan === plan.id
                      ? "bg-[#b5e550] text-black"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:text-white"
                  }`}
                >
                  {plan.tab}
                </button>
              ))}
            </div>
          </AnimItem>

          {/* Plan cards */}
          <AnimItem variant={scaleIn}>
            <div className="grid lg:grid-cols-3 gap-5 mb-8 pt-3 items-stretch">
              {plans.map((plan) => {
                const price = billing === "annual" ? plan.annual : plan.monthly;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl glass-card flex-col h-full ${
                      plan.popular
                        ? "!border-2 !border-[#b5e550] shadow-[0_10px_40px_rgba(181,229,80,0.2)]"
                        : ""
                    } ${activePlan === plan.id ? "flex" : "hidden lg:flex"}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#b5e550] text-black text-xs font-black tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap">
                        ⭐ Best value
                      </div>
                    )}

                    {/* Header */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-white text-xl sm:text-2xl font-black mb-1 min-h-[2rem]">
                        {plan.name}
                      </h3>
                      <p className="text-slate-400 text-sm sm:text-base mb-3 min-h-[3rem]">
                        {plan.tagline}
                      </p>

                      {/* Reserve the row even without a badge so the CTAs stay aligned */}
                      <div className="mb-4 min-h-9">
                        {plan.badge && (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3B6D11] bg-[#eef9d0] border border-[#d4e4a8] px-3 py-1.5 rounded-full">
                            ⚡ {plan.badge}
                          </span>
                        )}
                      </div>

                      {billing === "annual" && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs sm:text-sm font-bold text-[#3B6D11] bg-[#eef9d0] px-3 py-1.5 rounded-lg">
                            Save {plan.save}%
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#3B6D11] bg-[#eef9d0] px-3 py-1.5 rounded-lg">
                            −{money(plan.saveYear)}/year
                          </span>
                        </div>
                      )}

                      <div className="flex items-end gap-2 whitespace-nowrap">
                        <span className="text-slate-500 text-base sm:text-lg font-bold line-through leading-none mb-1.5">
                          {money(plan.oldPrice)}
                        </span>
                        <span className="text-white font-black text-5xl sm:text-5xl leading-none">
                          {money(price)}
                        </span>
                        <span className="text-slate-400 text-xs sm:text-sm leading-tight mb-1">
                          per
                          <br />
                          month
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm sm:text-base mt-2 mb-5">
                        {billing === "annual"
                          ? `${money(plan.annualBilled)} billed annually`
                          : "billed monthly"}
                      </p>

                      {/* Countdown timer */}
                      <div className="flex items-center justify-center gap-2 mb-5 px-4 py-2.5 rounded-xl bg-[#fdf1e7] border border-[#f6dcc6]">
                        <Clock
                          size={16}
                          className="text-[#b07a4f] flex-shrink-0"
                        />
                        <span className="text-slate-500 text-sm sm:text-base">
                          Offer ends in
                        </span>
                        <span className="font-mono font-black text-[#161514] text-sm sm:text-base tracking-wider">
                          {formatTime(timeLeft).h} : {formatTime(timeLeft).m} :{" "}
                          {formatTime(timeLeft).s}
                        </span>
                      </div>

                      <a
                        href={appendUtmParams(BOOKING_URL)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center w-full bg-[#b5e550] hover:bg-[#a3d444] text-black rounded-full py-3.5 transition-colors"
                      >
                        <span className="font-bold text-base sm:text-lg">
                          Book call
                        </span>
                        <span className="text-xs sm:text-sm text-black/70">
                          No commitment · 30 min
                        </span>
                      </a>

                      <p className="text-red-500 text-sm sm:text-base font-semibold text-center mt-3">
                        ⚠️ Limited availability: {plan.spots} spots left
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10" />

                    {/* What's included */}
                    <div className="p-6 sm:p-7">
                      <p className="text-white font-bold text-base sm:text-lg mb-1">
                        What's included
                      </p>
                      {plan.featuresHeading && (
                        <p className="text-slate-400 italic text-sm sm:text-base mb-4">
                          {plan.featuresHeading}
                        </p>
                      )}
                      <ul className="space-y-3 mt-3">
                        {plan.features.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base"
                          >
                            <CheckCircle
                              size={18}
                              className="text-emerald-400 flex-shrink-0 mt-0.5"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimItem>

          {/* Compare all features */}
          <AnimItem variant={fadeUp}>
            <FeatureComparison plans={plans} money={money} />
          </AnimItem>

          {/* Price match */}
          <AnimItem variant={fadeUp}>
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <Zap size={22} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                    Price Match Guarantee
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-3">
                    Found a lower price? We'll beat it. If you find a legitimate
                    registered agency (not a freelancer) offering the same scope
                    of Google Ad Grants management for a lower monthly rate —
                    <strong className="text-white">
                      {" "}
                      show us the quote. We'll match or beat their price.
                    </strong>
                  </p>
                  <p className="text-slate-400 text-sm sm:text-lg italic">
                    Why are we confident? Because we specialize exclusively in
                    Google Ad Grants for nonprofits. Generalist agencies charge
                    the same but deliver less.
                  </p>
                </div>
              </div>
            </div>
          </AnimItem>

          {/* Urgency block */}
          <AnimItem variant={fadeUp}>
            <div className="urgency-box p-6 sm:p-8">
              <h3 className="text-red-400 font-bold text-base sm:text-lg mb-3">
                ⚠️ Limited Spots Available
              </h3>
              <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-5">
                We currently have limited spots open for new nonprofits. Every
                month without the grant is $10,000 in free advertising you don't
                get back.
              </p>

              {/* <div className="flex items-center gap-2 mb-6">
                <span className="text-slate-400 font-bold text-sm sm:text-lg">
                  ⏱️ Offer expires in{" "}
                  <span className="font-mono text-white text-base">
                    {formatTime(timeLeft).h}:{formatTime(timeLeft).m}:
                    {formatTime(timeLeft).s}
                  </span>
                </span>
              </div> */}

              <div className="flex justify-center">
                <a
                  href={appendUtmParams(BOOKING_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8 mb-3"
                >
                  Schedule a Call — It's Free →
                </a>
              </div>

              <p className="text-center text-slate-500 text-sm sm:text-lg">
                No credit card required · Cancel anytime · 30-day notice
              </p>
            </div>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
