import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

// "How We Get You There" — DH 2-Step Strategy (ported from the New blocks mockup).
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

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="4,12 10,18 20,6" />
    </svg>
  );
}

const STEPS = [
  {
    meta: "Step 1 of 2 · Months 1–4",
    Icon: BoltIcon,
    title: "Get the Full $10K Grant Actually Spending.",
    sub: "Grant management + SEO. Better-optimized landing pages help your ads score higher — unlocking Google's full budget faster.",
    bullets: [
      ["Rebuild your account structure", " the way Google Ad Grants actually requires."],
      ["Tune keywords, bid strategy & ad quality", " for Grant's stricter auction."],
      ["Set up real conversion tracking", " — donations, volunteers, program inquiries."],
      ["Optimize your landing pages", " so Google rewards you with lower cost per click and more traffic."],
    ],
    result: "9 out of 10 accounts hit the full $10,000/month within 4 months.",
  },
  {
    meta: "Step 2 of 2 · Months 4+",
    Icon: TargetIcon,
    title: "Turn Every Site Visit Into a Real Donation.",
    sub: "Website conversion work — improving your site so more visitors actually donate. A separate team focused on this one thing.",
    bullets: [
      ["Separate conversion team", " reviews your entire donor flow — from ad click to donation confirmation."],
      ["Fix the invisible drop-offs.", " We've seen hundreds of hidden donate buttons."],
      ["Rewrite key pages, simplify forms, speed up loads", " — quiet conversion killers."],
      ["Test what works for YOUR donors", " — not a generic nonprofit."],
    ],
    result: "Same $10K grant, 2–3× more donations — because traffic finally converts.",
  },
];

function StepCard({ step }) {
  const { Icon } = step;
  return (
    <div className="h-full rounded-2xl border border-[#ebe6d8] bg-[#ffffff] p-6 sm:p-7">
      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3d4a1f]">
        {step.meta}
      </span>
      <div className="mt-3 mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4e4a8] [&_svg]:h-[22px] [&_svg]:w-[22px] [&_svg]:stroke-[#3d4a1f] [&_svg]:stroke-2 [&_svg]:fill-none [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
        <Icon />
      </div>
      <h3 className="text-xl font-bold leading-snug text-[#1a1a1a]">
        {step.title}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
        {step.sub}
      </p>
      <div className="mt-4 space-y-2.5">
        {step.bullets.map(([lead, rest]) => (
          <div key={lead} className="flex gap-2.5 text-sm sm:text-base text-[#1a1a1a] leading-relaxed">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#d4e4a8] [&_svg]:h-3 [&_svg]:w-3 [&_svg]:stroke-[#3d4a1f] [&_svg]:stroke-[2.5] [&_svg]:fill-none">
              <Check />
            </span>
            <span>
              <span className="font-semibold">{lead}</span>
              {rest}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#eaf3de] p-3.5 text-sm text-[#3d4a1f] leading-snug">
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#c9e37a] [&_svg]:h-3 [&_svg]:w-3 [&_svg]:stroke-[#3d4a1f] [&_svg]:stroke-[2.5] [&_svg]:fill-none">
          <Check />
        </span>
        <span>
          <span className="font-semibold">Result:</span> {step.result}
        </span>
      </div>
    </div>
  );
}

export default function HowWeGetYouThere() {
  return (
    <section
      id="how-we-get-you-there"
      className="bg-[#f5f1e8] py-14 sm:py-20 scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="max-w-xl lg:max-w-5xl mx-auto px-5 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4a1f]">
              How We Get You There
            </span>
            <h2 className="mt-3 text-center text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#1a1a1a]">
              How We Turn Your $10K Google Grant{" "}
              <span className="text-[#3d4a1f]">
                Into Steady Monthly Donations.
              </span>
            </h2>
            <p className="mt-4 text-center text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
              DH 2-Step Strategy — the exact method we built after 200+ nonprofit
              accounts. Two moves, in the right order.
            </p>
          </AnimItem>

          {/* Two steps: stacked on mobile, side-by-side with a horizontal
              "Then" connector on desktop. */}
          <AnimItem variant={fadeUp}>
            <div className="mt-8 flex flex-col lg:flex-row lg:items-stretch lg:gap-4">
              <div className="lg:flex-1">
                <StepCard step={STEPS[0]} />
              </div>

              {/* Connector — vertical on mobile, horizontal on desktop */}
              <div className="flex items-center justify-center py-3 lg:py-0">
                <div className="flex flex-col items-center lg:flex-row">
                  <div className="h-6 w-px bg-[#d4d0c0] lg:h-px lg:w-5" />
                  <span className="rounded-full border border-[#e5e0d0] bg-[#ffffff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3d4a1f]">
                    Then
                  </span>
                  <div className="h-6 w-px bg-[#d4d0c0] lg:h-px lg:w-5" />
                </div>
              </div>

              <div className="lg:flex-1">
                <StepCard step={STEPS[1]} />
              </div>
            </div>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <div className="mt-6 rounded-2xl bg-[#3d4a1f] p-7 text-center text-[#f5f1e8]">
              <div className="text-xl sm:text-2xl font-bold leading-tight">
                Steady Monthly Donations. On Autopilot.
              </div>
              <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-85">
                A predictable donation channel with $0 ad spend — Google covers
                the ads, you cover only our management fee. Fully done-for-you,
                because both moves need dedicated specialists.
              </p>
            </div>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
