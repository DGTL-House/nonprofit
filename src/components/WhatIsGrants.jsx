import { CheckCircle, XCircle } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";
import { Award } from "lucide-react";

export default function WhatIsGrants() {
  const scrollToEligibility = () => {
    document
      .querySelector("#contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden bg-[#f0eee6]/70">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-4xl mx-auto leading-tight mb-4">
              What Is Google Ad Grants?
            </h2>
            <p className="text-slate-400 text-center text-base sm:text-lg lg:text-2xl mb-14 max-w-xl mx-auto">
              And why your nonprofit should care.
            </p>
          </AnimItem>
        </AnimSection>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: explanation */}
          <AnimSection>
            <AnimItem variant={fadeUp}>
              <div className="glass-card rounded-2xl p-7 sm:p-9 h-full flex flex-col gap-6">
                {[
                  {
                    icon: "/icons/border/icon_blue-hand.png",
                    alt: "What is Google Ad Grants",
                    title: "What it is",
                    text: "Google Ad Grants is a program by Google that gives registered 501(c)(3) nonprofits up to $10,000 per month in free advertising on Google Search — at no cost to you.",
                  },
                  {
                    icon: "/icons/border/icon_blue-diag.png",
                    alt: "How Google Ad Grants works",
                    title: "How it works",
                    text: "When someone types a relevant search query on Google, your organization's ad appears at the top — just like paid search results. You pay $0. Google covers it.",
                  },
                  {
                    icon: "/icons/border/icon_blue-border.png",
                    alt: "Google Ad Grants compliance",
                    title: "The catch",
                    text: "To get and keep the grant, your campaigns must meet Google's strict compliance requirements — minimum 5% CTR, specific keyword rules, proper account structure, and regular optimization. That's where most nonprofits fail alone.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 mt-0.5">
                      <img
                        src={item.icon}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimItem>
          </AnimSection>

          {/* Right: compare table */}
          <AnimSection>
            <AnimItem variant={fadeUp}>
              <div className="h-full flex flex-col gap-4">
                {/* Without grants */}
                <div className="glass-card rounded-2xl p-6 border-red-500/15 flex-1">
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
                          className="text-red-500/60 flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* With grants */}
                <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 border border-emerald-500/20 flex-1">
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
                          className="text-emerald-400 flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google certified note */}
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <span className="text-2xl">
                    <Award size={24} className="text-yellow-400" />
                  </span>
                  <div>
                    <p className="text-white text-sm sm:text-lg font-semibold">
                      Official Google Program
                    </p>
                    <p className="text-slate-500 text-sm sm:text-lg">
                      Not a loophole — a real, stable program since 2003.
                    </p>
                  </div>
                </div>
              </div>
            </AnimItem>
          </AnimSection>
        </div>

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
