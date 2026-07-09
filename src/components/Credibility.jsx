import { m } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  AnimSection,
  AnimItem,
  fadeUp,
  staggerContainer,
} from "../utils/animations";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    company: "Shelter First",
    avatar: "SJ",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces&auto=format",
    color: "from-emerald-500 to-emerald-700",
    rating: 5,
    quote:
      "Before DGTL-House, we spent $1,200/month on Google ads with mediocre results. Now we're at the top of search for every relevant keyword in our city — and paying nothing. Our donation page visits went up 340% in 3 months.",
  },
  {
    name: "Marcus Williams",
    role: "Development Director",
    company: "City Food Bank",
    avatar: "MW",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces&auto=format",
    color: "from-blue-500 to-blue-700",
    rating: 5,
    quote:
      "We'd applied for Google Ad Grants ourselves and got rejected twice. DGTL-House handled everything — and we were approved in 12 days. Three months in, we've added over 80 new regular donors.",
  },
  {
    name: "Dr. Elena Reyes",
    role: "CEO",
    company: "Mental Health Matters",
    avatar: "ER",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&auto=format",
    color: "from-purple-500 to-purple-700",
    rating: 4.5,
    quote:
      "Our cause is urgent but we had zero online presence. DGTL-House built our website, got the grant, and launched campaigns — all in one month. We now get 200+ calls per month from people who found us via Google.",
  },
];

const niches = [
  "Food Security",
  "Animal Welfare",
  "+ Whatever your mission is",
  "Education",
  "Mental Health",
  "Homeless Services",
  "Veterans Support",
  "Environmental",
  "Youth Programs",
  "Disability Services",
  "Women & Families",
  "Immigrant Support",
  "Arts & Culture",
];

const team = [
  {
    name: "Alex Rivera",
    role: "Head of Grant Strategy",
    exp: "8 years Google Ads",
    avatar: "AR",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=faces&auto=format",
  },
  {
    name: "Jordan Kim",
    role: "Lead Campaign Manager",
    exp: "200+ accounts managed",
    avatar: "JK",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces&auto=format",
  },
  {
    name: "Sam Patel",
    role: "Compliance Specialist",
    exp: "99% retention rate",
    avatar: "SP",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces&auto=format",
  },
];

export default function Credibility() {
  const scrollToEligibility = () => {
    document
      .querySelector("#contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="credibility"
      className="relative py-8 sm:py-16 overflow-hidden scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-3xl mx-auto leading-tight mb-4">
              We've Done This Before.{" "}
              <span className="text-white">Here's the Proof.</span>
            </h2>
            <p className="text-slate-400 text-center mb-8 sm:mb-16 max-w-xl mx-auto text-sm sm:text-base">
              Real results from real nonprofits.
            </p>
          </AnimItem>
        </AnimSection>

        {/* Clutch badge */}
        <div className="flex justify-center mb-4">
          <img
            src="/icons/poweredCluch.png"
            alt="Clutch — Top Rated Google Ad Grants Agency"
            width="200"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "inline";
            }}
          />
        </div>

        {/* Testimonials */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid lg:grid-cols-3 gap-6 mb-8"
        >
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="testimonial-card p-6 flex flex-col gap-4"
            >
              {/* Author at top */}
              <div className="flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-white/10"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} items-center justify-center text-white font-bold text-lg flex-shrink-0 hidden`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-base sm:text-lg leading-tight">
                    {t.name}
                  </div>
                  <div className="text-slate-400 text-sm sm:text-lg mt-0.5">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>

              {/* Stars + rating */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id={`star-${i}-${s}`}>
                          <stop
                            offset={`${Math.min(100, Math.max(0, (t.rating - s + 1) * 100))}%`}
                            stopColor="#ef4444"
                          />
                          <stop
                            offset={`${Math.min(100, Math.max(0, (t.rating - s + 1) * 100))}%`}
                            stopColor="#374151"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={`url(#star-${i}-${s})`}
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-slate-300 text-base sm:text-lg font-semibold">
                  {t.rating.toFixed(1)}
                </span>
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </m.div>
          ))}
        </m.div>
        <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 flex justify-center">
          <button
            onClick={scrollToEligibility}
            className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
          >
            Check My Eligibility →
          </button>
        </div>
        {/* Niches */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="glass-card rounded-2xl p-7 sm:p-9 mb-10">
              <h3 className="text-white font-bold text-base sm:text-lg text-center mb-2">
                We've worked with nonprofits in:
              </h3>
              <p className="text-slate-400 text-center text-sm sm:text-lg mb-7">
                Every niche, every mission.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {niches.map((n, i) => (
                  <m.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={`px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-sm sm:text-base font-medium hover:bg-emerald-500/20 transition-colors cursor-default ${i === 2 ? "font-bold" : "text-slate-400"}`}
                    style={
                      i === 2 ? { color: "#52504c", fontWeight: "bold" } : {}
                    }
                  >
                    {n}
                  </m.span>
                ))}
              </div>
            </div>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
