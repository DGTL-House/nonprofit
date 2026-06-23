import { m } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

const steps = [
  {
    step: "01",
    time: "Day 1",
    title: "Free Eligibility Check",
    desc: "We confirm your 501(c)(3) status and assess if you're a good fit for the program. Takes 15 minutes. We tell you exactly what results are realistic for your mission.",
    bg: "linear-gradient(135deg, #aac976, #3f5028)",
    glowColor: "rgba(170,201,118,0.5)",
  },
  {
    step: "02",
    time: "Week 1–2",
    title: "Grant Application",
    desc: "We handle the full application process with Google — all paperwork, compliance checks, and submission. Approval typically takes 2–4 weeks.",
    bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    glowColor: "rgba(59,130,246,0.5)",
  },
  {
    step: "03",
    time: "Week 3–4",
    title: "Account Setup & Launch",
    desc: "We build your campaigns from scratch — keyword research, ad copywriting, conversion tracking, compliance setup. Everything ready for traffic.",
    bg: "linear-gradient(135deg, #a855f7, #7e22ce)",
    glowColor: "rgba(168,85,247,0.5)",
  },
  {
    step: "04",
    time: "Month 2+",
    title: "First Traffic & Optimization",
    desc: "Campaigns go live. We monitor, test, and optimize weekly. You receive a monthly report in plain English — no jargon.",
    bg: "linear-gradient(135deg, #f59e0b, #b45309)",
    glowColor: "rgba(245,158,11,0.5)",
  },
  {
    step: "05",
    time: "Month 3+",
    title: "Ongoing Growth",
    desc: "As we learn what works for your audience, results improve each month. More donors, more volunteers, more program inquiries.",
    bg: "linear-gradient(135deg, #c4ed82, #3f5028)",
    glowColor: "rgba(196,237,130,0.5)",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-8 sm:py-16 overflow-hidden bg-[#f0eee6]/60"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-3xl mx-auto leading-tight mb-4">
              From "I'm Interested" to{" "}
              <span className="text-white">Live Campaigns in 30 Days.</span>
            </h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-16 text-sm sm:text-base">
              A clear, simple process — we handle everything, you get results.
            </p>
          </AnimItem>
        </AnimSection>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-blue-500/20 to-emerald-500/10 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`relative flex flex-col sm:flex-row gap-6 items-start ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Connector dot */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-12 h-12 hidden sm:flex items-center justify-center z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg text-white shadow-lg"
                    style={{
                      background: step.bg,
                      boxShadow: `0 0 20px ${step.glowColor}`,
                    }}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "sm:mr-auto sm:pr-6" : "sm:ml-auto sm:pl-6"}`}
                >
                  <m.div
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-emerald-500/20"
                  >
                    {/* Mobile step number */}
                    <div
                      className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg mb-4"
                      style={{ background: step.bg }}
                    >
                      {step.step}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm sm:text-lg font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </m.div>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {/* Timeline summary */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="mt-14 glass-card rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-white text-base sm:text-lg font-bold mb-2">
                Total time from first contact to live campaigns:
              </p>
              <p className="text-5xl font-black gradient-text mb-3">~30 days</p>
              <p className="text-slate-400">
                Your team spends less than 2 hours on this. We handle everything
                else.
              </p>
            </div>
          </AnimItem>
        </AnimSection>
      </div>
      <div className="flex justify-center mt-10">
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
