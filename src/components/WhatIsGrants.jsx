import { CheckCircle, XCircle, Handshake, BarChart3, Globe, Award } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

const credibility = [
  {
    icon: Handshake,
    stat: "22+ years",
    title: "Official Google program",
    body: "Established in 2003 — a permanent program running continuously for over two decades.",
  },
  {
    icon: BarChart3,
    stat: "$10 billion+",
    title: "Awarded in free advertising",
    body: "In ad credits given to nonprofits since launch — more than $650M every month worldwide.",
  },
  {
    icon: Globe,
    stat: "115,000+",
    title: "Nonprofits in 51 countries",
    body: "Active grantees across every cause and size. Any registered 501(c)(3) can qualify.",
  },
];

export default function WhatIsGrants() {
  const scrollToEligibility = () => {
    document
      .querySelector("#contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="what-is-grants"
      className="relative py-8 sm:py-16 overflow-hidden bg-[#f0eee6]/70 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-4xl mx-auto leading-tight mb-4">
              The Program Behind Your $10K/Month
            </h2>
            <p className="text-slate-400 text-center text-base sm:text-lg lg:text-2xl mb-12 max-w-3xl mx-auto">
              Google Ad Grants is an official Google program — running since 2003,
              with over $10 billion in free advertising awarded to nonprofits
              worldwide.
            </p>
          </AnimItem>
        </AnimSection>

        {/* Credibility cards */}
        <AnimSection>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {credibility.map((c) => {
              const Icon = c.icon;
              return (
                <AnimItem key={c.stat} variant={fadeUp}>
                  <div className="h-full glass-card rounded-2xl p-6 sm:p-7">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-emerald-400" />
                    </div>
                    <div className="text-white font-black text-3xl sm:text-4xl mb-1">
                      {c.stat}
                    </div>
                    <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                      {c.title}
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </AnimItem>
              );
            })}
          </div>
        </AnimSection>

        {/* WITHOUT / WITH comparison (retained) */}
        <AnimSection>
          <div className="grid lg:grid-cols-2 gap-4 items-stretch mb-4">
            {/* Without grants */}
            <AnimItem variant={fadeUp}>
              <div className="glass-card rounded-2xl p-6 sm:p-7 border-red-500/15 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={18} className="text-red-400" />
                  <span className="text-red-400 font-bold text-sm sm:text-lg uppercase tracking-wide">
                    Without Google Ad Grants
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Missing donors who search daily",
                    "Paying $2–$10 per click for Google ads",
                    "Invisible in search results",
                    "Competing with deep-pocket advertisers",
                    "Relying solely on organic SEO (takes years)",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 text-slate-400 text-sm sm:text-lg ${i === 0 ? "font-bold text-slate-300" : ""}`}
                    >
                      <XCircle
                        size={14}
                        className="text-red-500/60 flex-shrink-0 mt-1"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimItem>

            {/* With grants */}
            <AnimItem variant={fadeUp}>
              <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 border border-emerald-500/20 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-sm sm:text-lg uppercase tracking-wide">
                    With Google Ad Grants
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Reach donors, volunteers & beneficiaries",
                    "$0 ad spend — Google funds every click",
                    "Top position in Google search results",
                    "Up to $10,000/month in reach",
                    "Trackable conversions",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 text-slate-300 text-sm sm:text-lg ${i === 0 ? "font-bold text-white" : ""}`}
                    >
                      <CheckCircle
                        size={14}
                        className="text-emerald-400 flex-shrink-0 mt-1"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimItem>
          </div>

          {/* Official program note */}
          <AnimItem variant={fadeUp}>
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
              <Award size={24} className="text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-white text-sm sm:text-lg font-semibold">
                  Official Google Program
                </p>
                <p className="text-slate-500 text-sm sm:text-lg">
                  Not a loophole — a real, stable program since 2003.
                </p>
              </div>
            </div>
          </AnimItem>
        </AnimSection>

        <div className="mt-12 flex justify-center">
          <button
            onClick={scrollToEligibility}
            className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
          >
            Check My Eligibility →
          </button>
        </div>
      </div>
    </section>
  );
}
