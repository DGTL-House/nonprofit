import { m } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Eye } from "lucide-react";
import {
  AnimSection,
  AnimItem,
  fadeUp,
  staggerContainer,
} from "../utils/animations";

const pains = [
  {
    icon: <TrendingDown size={22} className="text-red-400" />,
    title: "Donations are unpredictable",
    desc: "You rely on the same donors year after year — and one bad quarter can threaten everything.",
  },
  // {
  //   icon: <AlertTriangle size={22} className="text-orange-400" />,
  //   title: "You can't grow your programs",
  //   desc: "You can't consistently bring in new supporters, volunteers, or funding to expand your impact.",
  // },
  {
    icon: <Users size={22} className="text-red-400" />,
    title: "Your team is stretched thin",
    desc: "Everyone is doing three jobs. Marketing — if it happens at all — falls to whoever has 20 minutes to spare.",
  },
  {
    icon: <Eye size={22} className="text-orange-400" />,
    title: "They're finding others, not you",
    desc: "People are searching for exactly what you do — but they're finding other organizations, not yours.",
  },
  // {
  //   icon: <AlertTriangle size={22} className="text-red-400" />,
  //   title: "Online visibility feels impossible",
  //   desc: "Ads cost money, SEO takes forever, and social media feels like shouting into the void.",
  // },
];

export default function Problem() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-4xl mx-auto leading-tight mb-6">
              Running a Nonprofit Is Hard Enough Without{" "}
              <span className="text-red-400">
                Worrying About Where the Next Donor Comes From.
              </span>
            </h2>
          </AnimItem>
          <AnimItem variant={fadeUp}>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16 text-base sm:text-lg lg:text-2xl">
              Most nonprofits we talk to are stuck in the same place:
            </p>
          </AnimItem>
          {/* Pain cards */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
          >
            {pains.map((pain, i) => (
              <m.div
                key={i}
                variants={fadeUp}
                className="glass-card rounded-2xl p-6 hover:border-red-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {pain.icon}
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                  {pain.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                  {pain.desc}
                </p>
              </m.div>
            ))}

            {/* Closing insight */}
            <m.div
              variants={fadeUp}
              className="sm:col-span-2 lg:col-span-3 rounded-2xl p-6 bg-gradient-to-r from-red-500/10 via-orange-500/5 to-red-500/10 border border-red-500/15"
            >
              <p className="text-slate-200 text-center text-sm sm:text-lg font-medium leading-relaxed">
                Your mission is clear.{" "}
                <span className="text-red-400 font-bold">
                  The problem? The people who need you can't find you.
                </span>
              </p>
            </m.div>
          </m.div>
          <AnimItem variant={fadeUp}>
            <div className="flex justify-center mt-8">
              <a
                href="#contact-form"
                className="btn-primary text-base sm:text-2xl !py-3 sm:!py-4 !px-6 sm:!px-8"
              >
                Check My Eligibility →
              </a>
            </div>
          </AnimItem>{" "}
        </AnimSection>
      </div>
    </section>
  );
}
