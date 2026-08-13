import { useState } from "react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

// "ROI Projection" — invite-to-forecast widget (New blocks mockup, Block 5).
// The chips/toggles are selectable for engagement; the real forecast is built
// on the call, so every path leads to the booking CTA.
const NICHES = [
  "Education",
  "Youth & Family",
  "Health",
  "Mental Health",
  "Hunger",
  "Animal Welfare",
  "Environment",
  "Refugee",
];

const PLANS = ["Starter", "Growth Partner", "Impact Partner"];
const PERIODS = ["Monthly", "Annual"];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" />
    </svg>
  );
}

export default function RoiProjection() {
  const [niche, setNiche] = useState("");
  const [plan, setPlan] = useState("Growth Partner");
  const [period, setPeriod] = useState("Monthly");

  return (
    <section
      id="roi-projection"
      className="bg-[#ffffff] py-14 sm:py-20 scroll-mt-10 sm:scroll-mt-2"
    >
      <div className="max-w-xl lg:max-w-4xl mx-auto px-5 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4a1f]">
              ROI Projection
            </span>
            <h2 className="mt-3 text-center text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#1a1a1a]">
              Marketing Isn't Unpredictable.{" "}
              <span className="text-[#3d4a1f]">Here's Your Forecast.</span>
            </h2>
            <p className="mt-4 text-center text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
              Most agencies can't give you numbers before you sign. We can —
              built on data from 200+ real nonprofit accounts. Pick your niche
              and plan, we'll build the full forecast on the call.
            </p>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <div className="mt-8 rounded-3xl bg-[#f5f1e8] p-6 sm:p-7 lg:p-9">
              <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                <div>
              {/* Niche picker */}
              <div className="text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3d4a1f] lg:text-left lg:text-xs">
                Select your focus area
              </div>
              <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 lg:justify-start lg:gap-2">
                {NICHES.map((n) => {
                  const on = niche === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNiche(on ? "" : n)}
                      className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors lg:px-4 lg:py-2 lg:text-sm ${
                        on
                          ? "border-[#3d4a1f] bg-[#d4e4a8] font-semibold text-[#3d4a1f]"
                          : "border-[#e5e0d0] bg-[#ffffff] text-[#3d4a1f] hover:border-[#3d4a1f]"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
                <span className="rounded-full border border-dashed border-[#3d4a1f] bg-[#eaf3de] px-3 py-1.5 text-[11px] font-semibold text-[#3d4a1f] lg:px-4 lg:py-2 lg:text-sm">
                  Your niche →
                </span>
              </div>

              {/* Plan picker */}
              <div className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3d4a1f] lg:mt-8 lg:text-left lg:text-xs">
                Choose your plan
              </div>
              <div className="mt-2.5 flex flex-wrap justify-center gap-1 lg:justify-start lg:gap-1.5">
                {PLANS.map((pl) => {
                  const on = plan === pl;
                  return (
                    <button
                      key={pl}
                      type="button"
                      onClick={() => setPlan(pl)}
                      className={`rounded-full px-3 py-1.5 text-[11px] text-[#3d4a1f] transition-colors lg:px-4 lg:py-2 lg:text-sm ${
                        on ? "bg-[#d4e4a8] font-semibold" : "hover:bg-[#eaf3de]"
                      }`}
                    >
                      {pl}
                    </button>
                  );
                })}
              </div>

              {/* Period toggle */}
              <div className="mt-2.5 text-center lg:mt-4 lg:text-left">
                <div className="inline-flex rounded-full bg-[#ebe6d8] p-1">
                  {PERIODS.map((pr) => {
                    const on = period === pr;
                    return (
                      <button
                        key={pr}
                        type="button"
                        onClick={() => setPeriod(pr)}
                        className={`rounded-full px-3.5 py-1.5 text-[11px] transition-colors lg:px-5 lg:py-2 lg:text-sm ${
                          on
                            ? "bg-[#d4e4a8] font-semibold text-[#3d4a1f]"
                            : "text-[#5a5a5a]"
                        }`}
                      >
                        {pr}
                      </button>
                    );
                  })}
                </div>
              </div>

                </div>

                {/* Unlock card */}
                <div className="mt-5 lg:mt-0 rounded-2xl border border-dashed border-[#3d4a1f] bg-[#ffffff] p-6 text-center lg:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4e4a8] lg:h-14 lg:w-14 [&_svg]:h-[22px] [&_svg]:w-[22px] lg:[&_svg]:h-7 lg:[&_svg]:w-7 [&_svg]:stroke-[#3d4a1f] [&_svg]:stroke-2 [&_svg]:fill-none [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
                  <StarIcon />
                </span>
                <div className="mt-3.5 text-lg font-bold leading-tight text-[#1a1a1a] lg:mt-4 lg:text-2xl">
                  Your projection is ready to build.
                </div>
                <p className="mt-2.5 text-sm text-[#5a5a5a] leading-relaxed lg:mt-3 lg:text-base">
                  On a 30-min strategy call, we'll build your full month-by-month
                  forecast — donations, conversions, grant utilization — tailored
                  to your niche, city, and organization size.
                </p>
                <a
                  href="#contact-form"
                  className="btn-primary mt-4 !text-base !py-3 !px-6 lg:mt-6 lg:!text-lg lg:!py-4 lg:!px-8"
                >
                  Book a Strategy Call →
                </a>
                </div>
              </div>
            </div>
          </AnimItem>

          <AnimItem variant={fadeUp}>
            <p className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.06em] leading-relaxed text-[#5a5a5a]">
              Based on 200+ real nonprofit accounts · Updated daily · Google
              Partner data
            </p>
          </AnimItem>
        </AnimSection>
      </div>
    </section>
  );
}
