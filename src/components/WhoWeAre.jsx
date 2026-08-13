import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

// "Who We Are + Google Partner" — combined block (New blocks mockup, Block 3).
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="13,2 3,14 12,14 11,22 21,10 12,10" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="#3d4a1f" stroke="none" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 11l4 4 4-4" />
      <path d="M20 12v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2" />
      <path d="M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4" />
    </svg>
  );
}

const METRICS = [
  { num: "10 yrs", label: "Inside the program" },
  { num: "200+", label: "Nonprofits supported" },
  { num: "US-wide", label: "Missions served" },
];

const CARDS = [
  {
    Icon: BoltIcon,
    stat: "Hours",
    statSub: "not days",
    title: "Direct Google support line",
    body: "When problems hit — account suspensions, ad rejections — we have a direct line to Google's partner team. Issues that take regular agencies 7–10 days, we resolve the same day.",
  },
  {
    Icon: TargetIcon,
    stat: "Performance Max",
    title: "Google's full ad inventory",
    body: "Most Ad Grants agencies only run search ads. As a Google Partner, we unlock Performance Max — reaching donors across Search, YouTube, Display, Gmail, and Maps. Up to 10× more reach.",
  },
  {
    Icon: InboxIcon,
    priceHi: "$250",
    priceLo: "$1,000+",
    title: "Partner-subsidized rates",
    body: "For-profit businesses pay $1,000+/month for the exact same Google Ads management. As a Google Partner focused exclusively on nonprofits, we subsidize our rates — starting at $250/mo.",
  },
];

export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="bg-[#ffffff] py-14 sm:py-20 scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="max-w-xl lg:max-w-5xl mx-auto px-5 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4a1f]">
              Who We Are
            </span>
            <h2 className="mt-3 text-center text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#1a1a1a]">
              10 Years Inside Nonprofit Marketing.{" "}
              <span className="text-[#3d4a1f]">That's All We Do.</span>
            </h2>
            <p className="mt-4 text-center text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
              DGTL House is a Google-partnered agency that works exclusively with
              US nonprofits. 10 years, 200+ organizations, every typical failure
              scenario — and how to get out of it.
            </p>
          </AnimItem>

          {/* Metrics strip */}
          <AnimItem variant={fadeUp}>
            <div className="mt-8 flex text-center">
              {METRICS.map((m, idx) => (
                <div
                  key={m.num}
                  className={`flex-1 px-2 ${idx > 0 ? "border-l border-[#e5e5e0]" : ""}`}
                >
                  <div className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                    {m.num}
                  </div>
                  <div className="mt-1.5 text-[11px] text-[#5a5a5a] leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimItem>

          {/* Divider with Google Partner pill */}
          <AnimItem variant={fadeUp}>
            <div className="my-9 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e5e5e0]" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d4e4a8] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3d4a1f]">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ffffff] text-[8px] font-bold text-[#3d4a1f]">
                  G
                </span>
                Official Google Partner
              </span>
              <div className="h-px flex-1 bg-[#e5e5e0]" />
            </div>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <h3 className="text-center text-xl font-bold leading-snug text-[#1a1a1a]">
              Not Just an Agency.{" "}
              <span className="text-[#3d4a1f]">A Google Partner</span> — With
              Access Other Agencies Don't Have.
            </h3>
            <p className="mt-3 text-center text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
              Direct access to Google's resources means we deliver results others
              can't — at prices they can't match.
            </p>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-5">
              {CARDS.map((c) => {
                const { Icon } = c;
                return (
                  <div
                    key={c.title}
                    className="h-full rounded-2xl border border-[#ebe6d8] bg-[#ffffff] p-6"
                  >
                  <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4e4a8] [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[#3d4a1f] [&_svg]:stroke-2 [&_svg]:fill-none [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
                    <Icon />
                  </div>
                  {c.priceHi ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black tracking-tight text-[#3d4a1f]">
                        {c.priceHi}
                      </span>
                      <span className="text-base text-[#9a9a94] line-through">
                        {c.priceLo}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[26px] font-black leading-none tracking-tight text-[#1a1a1a]">
                        {c.stat}
                      </span>
                      {c.statSub && (
                        <span className="ml-1.5 text-[11px] text-[#5a5a5a]">
                          {c.statSub}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-3.5 text-base font-bold text-[#1a1a1a]">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm text-[#5a5a5a] leading-relaxed">
                    {c.body}
                  </p>
                  </div>
                );
              })}
            </div>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <p className="mt-7 text-center text-base font-semibold leading-snug text-[#3d4a1f]">
              Same expertise. Same results. →
            </p>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
