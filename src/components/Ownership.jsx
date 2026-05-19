import { motion } from "framer-motion";
import { Key, Shield, LogOut, X, ChevronRight } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

const points = [
  {
    icon: <Key size={20} className="text-emerald-400" />,
    title: "You have admin access at all times",
    desc: "We're added as managers to your existing Google account — or we set one up in your name. You own it from day one.",
  },
  {
    icon: <Shield size={20} className="text-emerald-400" />,
    title: "If you leave, you keep everything",
    desc: "All campaigns, all data, all history, all keyword research stays in your account. Zero lock-in.",
  },
  {
    icon: <X size={20} className="text-emerald-400" />,
    title: "Cancel anytime, no penalties",
    desc: "30 days notice is all we ask. No long-term contracts. No exit fees. No questions asked.",
  },
  {
    icon: <LogOut size={20} className="text-emerald-400" />,
    title: "We never hold your account hostage",
    desc: "Some agencies own the account and take it when you leave. That's not us. Your data is always 100% yours.",
  },
];

export default function Ownership() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden bg-[#f0eee6]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center mb-4 leading-tight">
              Your Account. Your Data.{" "}
              <span className="text-white">Always.</span>
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-14 text-sm sm:text-base">
              We work inside YOUR Google Ad Grants account — not ours. That
              means complete transparency and zero dependency.
            </p>
          </AnimItem>
          <div className="grid sm:grid-cols-2 gap-5">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.3)" }}
                className="glass-card rounded-2xl p-6 flex gap-4 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimSection>

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
      </div>
    </section>
  );
}
