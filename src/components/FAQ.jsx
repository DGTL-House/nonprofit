import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

const faqs = [
  {
    q: "Does my nonprofit qualify for Google Ad Grants?",
    a: "To qualify, your organization must be a registered 501(c)(3) nonprofit in the United States, have a live website that meets Google's quality guidelines, and comply with Google's program policies. Most legitimate nonprofits qualify. The easiest way to find out: take our free eligibility check — it takes 15 minutes.",
  },
  {
    q: "Is this really free advertising? What's the catch?",
    a: 'Google Ad Grants is a real, legitimate program — Google gives up to $10,000/month in search ad credits to eligible nonprofits at no cost. The "catch" is that managing it effectively requires expertise: specific compliance rules, proper campaign structure, ongoing optimization. Without professional management, most organizations either don\'t get approved or lose the grant within months.',
  },
  {
    q: "Why do we need an agency if Google gives the grant for free?",
    a: "The grant is free. Running it well isn't simple. Google requires a minimum 5% click-through rate, proper keyword structure, regular account activity, and conversion tracking — or they suspend your account. Most nonprofits don't have the in-house expertise to maintain compliance and drive real results. Think of it like this: a business bank account is free, but you still hire an accountant.",
  },
  {
    q: "How fast can we get started?",
    a: "Your first eligibility check happens within 24 hours of reaching out. Grant approval from Google typically takes 2–4 weeks. Most clients have live campaigns within 30 days of signing on.",
  },
  {
    q: "Can this help us get more donations?",
    a: "Google Ad Grants brings targeted traffic to your website from people actively searching for what you do. Whether that traffic converts into donations depends on your website, donation page, and cause. We optimize for the conversions that matter to you — donations, volunteer signups, program applications. We don't guarantee a specific number of donations, but we build the infrastructure that makes them possible.",
  },
  {
    q: "What if we already have Google Ad Grants but it's not working?",
    a: "This is exactly the situation we help with most often. We audit your existing account, identify what's underperforming or out of compliance, rebuild campaign structure, and optimize for real results. Many of our clients came to us after failed attempts on their own or with a general-purpose agency.",
  },
  {
    q: "What if we don't get approved for the grant?",
    a: "We have a near-100% approval rate for eligible nonprofits. If your organization qualifies and we don't get you approved, we'll continue working at no charge until you're in.",
  },
  {
    q: "What do you need from our team?",
    a: "Very little. We need access to your website, a brief onboarding call to understand your goals, and a point of contact for monthly check-ins. We handle everything else. Most clients spend less than 2 hours per month on this.",
  },
  {
    q: "Do we own the ad account?",
    a: "Yes, always. We work inside your Google account, not ours. You have admin access at all times. If you ever leave, you keep everything — all campaigns, data, and history.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes. No long-term contracts. Cancel with 30 days' notice, no penalties.",
  },
  {
    q: "We don't have a website. Can you still help?",
    a: "Yes — and this is more common than you'd think. Google Ad Grants requires a quality website that meets their guidelines. If you don't have one, we'll build it as part of your onboarding: clean, fast, and optimized to convert ad traffic into donor sign-ups, volunteer registrations, and program inquiries.",
  },
  {
    q: "Why should we act now and not wait a few months?",
    a: "Every month without the grant is $10,000 in free advertising that disappears forever — it doesn't accumulate or carry over. If your board needs to approve it, we're happy to provide materials that make that conversation easier. But the math is simple: waiting 3 months to start costs you $30,000 in potential reach.",
  },
  {
    q: "We found another agency cheaper. Why should we choose you?",
    a: "If you've found a legitimate registered agency (not a freelancer) offering the same full scope of Google Ad Grants management for a lower monthly fee — show us the quote. We'll match or beat it. The difference is that we specialize exclusively in Google Ad Grants for nonprofits.",
  },
  {
    q: "We've had a bad experience with a previous agency. Why should we trust you?",
    a: "We understand — and we hear this often. Here's what's different: we specialize exclusively in Google Ad Grants for nonprofits, we provide our client references directly (you can contact them), our first month is free so you can see results before you commit, and you own everything — so there's zero lock-in risk.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`border-b border-white/[0.06] transition-colors duration-300 ${isOpen ? "border-emerald-500/20" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${isOpen ? "text-emerald-400" : "text-white group-hover:text-emerald-300"}`}
        >
          {q}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-emerald-500/20 text-emerald-400 rotate-0"
              : "bg-white/[0.04] text-slate-400 group-hover:bg-white/[0.08]"
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 text-sm sm:text-lg leading-relaxed pb-5">
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative py-8 sm:py-16 overflow-hidden bg-[#f0eee6]/60"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-3xl mx-auto leading-tight mb-4">
              Every Question. Answered.
            </h2>
            <p className="text-slate-400 text-center mb-14">
              Still skeptical? Good. Here's everything you need to know.
            </p>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <div className="glass-card rounded-2xl px-7 sm:px-10 py-2">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
