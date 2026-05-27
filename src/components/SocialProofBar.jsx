const clients = [
  "Hope Foundation",
  "Green Earth Fund",
  "Shelter First",
  "Veterans United",
  "Animal Rescue Alliance",
  "City Food Bank",
  "Mental Health Matters",
  "Education Unlocked",
  "Ocean Guardians",
  "Families First",
  "Youth Opportunity",
  "Healing Hearts",
];

export default function SocialProofBar() {
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-12 bg-[#f0eee6] border-y border-[#ebe9e0] overflow-hidden">
      <p className="text-center text-slate-500 text-base sm:text-lg font-semibold tracking-[0.2em] uppercase mb-8">
        Trusted by 200+ nonprofits across the US
      </p>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="mx-4 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] whitespace-nowrap"
            >
              <span className="text-slate-300 text-sm sm:text-lg font-medium">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Certification badges */}
      {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 relative z-20">
        {[
          {
            icon: <Award size={24} className="text-yellow-400" />,
            title: "Google Ad Grants",
            sub: "Certified Partner",
            color: "from-emerald-500/15 to-emerald-700/5 border-emerald-500/20",
          },
          {
            icon: <Star size={24} className="text-yellow-400 " />,
            title: "4.9 / 5.0",
            sub: "Average client rating",
            color: "from-yellow-400/15 to-yellow-600/5 border-yellow-400/20",
          },
          {
            icon: <Lock size={24} className="text-yellow-400" />,
            title: "BBB Accredited",
            sub: "A+ Rating",
            color: "from-blue-500/15 to-blue-700/5 border-blue-500/20",
          },
          {
            icon: <CheckCircle size={24} className="text-yellow-400" />,
            title: "99% Approval Rate",
            sub: "For eligible nonprofits",
            color: "from-emerald-500/15 to-emerald-700/5 border-emerald-500/20",
          },
        ].map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-br ${badge.color} border w-56 sm:w-64`}
          >
            {badge.icon}
            <div>
              <div className="text-white font-bold text-base sm:text-lg leading-tight">
                {badge.title}
              </div>
              <div className="text-slate-400 text-sm sm:text-lg">
                {badge.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
    </section>
  );
}
