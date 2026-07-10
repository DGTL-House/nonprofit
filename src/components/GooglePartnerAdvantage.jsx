import { Zap, Target, Handshake } from "lucide-react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

const GoogleG = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const cards = [
  {
    icon: Handshake,
    statNode: (
      <span className="flex items-baseline gap-2">
        <span className="text-[#3d4a1f]">$250</span>
        <span className="text-2xl sm:text-3xl text-slate-500 line-through">
          $1,000+
        </span>
      </span>
    ),
    title: "Partner-subsidized rates",
    body: "For-profit businesses pay $1,000+/month for the exact same Google Ads management work. As a Google Partner focused exclusively on nonprofits, we subsidize our rates and pass the savings to you — starting at just $250/mo.",
  },
  {
    icon: Zap,
    stat: "Hours",
    statSub: "not days",
    title: "Direct Google support line",
    body: "When problems hit — account suspensions, ad rejections, grants not spending — we have a direct line to Google's partner team. Issues that take regular agencies 7–10 days, we resolve the same day.",
  },
  {
    icon: Target,
    stat: "Performance Max",
    title: "Google's full ad inventory",
    body: "Most Ad Grants agencies can only run search ads. As a Google Partner, we unlock Performance Max — reaching donors across Search, YouTube, Display, Gmail, and Maps. Up to 10× more reach from the same $10K grant.",
  },
];

export default function GooglePartnerAdvantage() {
  return (
    <section
      id="google-partner-advantage"
      className="relative py-8 sm:py-16 overflow-hidden bg-[#f5f1e8] scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            {/* Top badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#eaf6cc] border border-[#d4e4a8] shadow-sm">
                <GoogleG size={18} />
                <span className="text-[#3d4a1f] text-xs sm:text-sm font-black tracking-[0.15em] uppercase">
                  Official Google Partner
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center max-w-4xl mx-auto leading-tight mb-4">
              We're Not Just Another Agency. We're a Google Partner.
            </h2>
            <p className="text-slate-400 text-center text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-3 sm:mb-14">
              Direct access to Google's resources means we deliver results
              others can't — at prices others can't match.
            </p>
          </AnimItem>
        </AnimSection>

        {/* Cards */}
        <AnimSection>
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <AnimItem key={i} variant={fadeUp}>
                  <div className="h-full glass-card rounded-2xl p-7 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="w-12 h-12 rounded-xl bg-[#d4e4a8] flex items-center justify-center mb-5">
                      <Icon size={24} className="text-[#3d4a1f]" />
                    </div>

                    <div className="mb-4">
                      <div className="text-white font-black text-3xl sm:text-4xl leading-none">
                        {card.statNode ?? card.stat}
                      </div>
                      {card.statSub && (
                        <div className="text-slate-500 text-sm sm:text-base mt-1">
                          {card.statSub}
                        </div>
                      )}
                    </div>

                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </AnimItem>
              );
            })}
          </div>
        </AnimSection>

        {/* Bridge sentence */}
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <p className="text-center text-[#3d4a1f] font-bold text-lg sm:text-2xl mt-12">
              Same expertise. Same results. A fraction of the price.{" "}
              <span className="inline-block animate-bounce">↓</span>
            </p>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
