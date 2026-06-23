import { m } from "framer-motion";
import { CheckCircle, Globe, ChevronRight } from "lucide-react";
import {
  AnimSection,
  AnimItem,
  fadeUp,
  staggerContainer,
} from "../utils/animations";

const services = [
  { icon: "✓", text: "Eligibility check and grant application" },
  {
    icon: "✓",
    text: "Website build — if you don't have one, we'll create a Google-compliant site",
  },
  { icon: "✓", text: "Account setup and full campaign architecture" },
  { icon: "✓", text: "Keyword research tailored to your mission" },
  { icon: "✓", text: "Ad copywriting, creative testing, optimization" },
  { icon: "✓", text: "Conversion tracking (donations, signups, form fills)" },
  { icon: "✓", text: "Monthly optimization and compliance management" },
  { icon: "✓", text: "Monthly performance reports" },
];

export default function Solution() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-3xl mx-auto leading-tight mb-4">
              We Handle <span className="text-white">Everything.</span>
              <br />
              You Focus on Your Mission.
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8 sm:mb-16 text-sm sm:text-lg lg:text-2xl">
              Our team takes over your Google Ad Grant from start to finish — or
              builds it from the ground up. No Google Ads expertise required. No
              new staff. No learning curve.
            </p>
          </AnimItem>
        </AnimSection>

        <div className="grid lg:grid-cols-2 gap-3 sm:gap-8 items-start">
          {/* Services list */}
          <AnimSection>
            <AnimItem variant={fadeUp}>
              <div className="glass-card rounded-2xl p-7 sm:p-9">
                <h3 className="text-white font-bold text-base sm:text-lg mb-6">
                  Everything we take off your plate:
                </h3>
                <m.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-1 sm:space-y-3"
                >
                  {services.map((s, i) => (
                    <m.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-500/5 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-md bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500/25 transition-colors">
                        <CheckCircle size={14} className="text-emerald-400" />
                      </div>
                      <span className="text-slate-300 text-sm sm:text-lg leading-relaxed">
                        {s.text}
                      </span>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </AnimItem>
          </AnimSection>

          {/* Right column */}
          <AnimSection>
            <div className="flex flex-col gap-2 sm:gap-5">
              {/* No website callout */}
              <AnimItem variant={fadeUp}>
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-700/5 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                      <Globe size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      No website? No problem.
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-4">
                    Google Ad Grants requires a quality website that meets their
                    guidelines. If you don't have one — or yours doesn't meet
                    the requirements — we'll build it for you.
                  </p>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                    <p className="text-white-400 text-base sm:text-lg font-semibold mb-2">
                      Included in your onboarding:
                    </p>
                    <ul className="space-y-1.5 text-slate-400 text-sm sm:text-lg">
                      {[
                        "Clean, fast, mobile-optimized site",
                        "Google guidelines compliant",
                        "Conversion-optimized for donations",
                        "Donation page + volunteer signup",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-400">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimItem>

              {/* What you don't need */}
              <AnimItem variant={fadeUp}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-white font-bold text-sm sm:text-lg mb-4">
                    What you DON'T need:
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      "Google Ads expertise or training",
                      "Dedicated marketing staff",
                      "Technical background",
                      "Large ad budget",
                      "Hours of your time each week",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-slate-400 text-sm sm:text-lg"
                      >
                        <span className="text-red-500/70 text-base">✗</span>
                        <span className="line-through opacity-60">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.06] text-emerald-400 text-sm sm:text-lg font-semibold">
                    You need less than 2 hours/month from your team. We handle
                    the rest.
                  </div>
                </div>
              </AnimItem>
            </div>
          </AnimSection>
        </div>
      </div>
      <div className="flex justify-center mt-6 sm:mt-10">
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
    </section>
  );
}
