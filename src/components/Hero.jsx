import { useEffect, useState } from "react";

// Rotating ROI projections — illustrative figures in the range the calculator
// (calculator.dgtl-house.com) returns for real nonprofit niches.
const PROJECTIONS = [
  { num: "$26,585", roi: "×4.4", conv: "7,477" },
  { num: "$48,120", roi: "×3.9", conv: "11,240" },
  { num: "$36,952", roi: "×3.1", conv: "8,890" },
  { num: "$52,741", roi: "×4.2", conv: "12,156" },
];

// Trust strip items, repeated to fill the marquee loop.
const TRUST = ["Google Partner", "200+ US nonprofits", "DH 2-Step Strategy"];

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

export default function Hero() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(true);
      const t = setTimeout(() => {
        setI((prev) => (prev + 1) % PROJECTIONS.length);
        setFade(false);
      }, 260);
      return () => clearTimeout(t);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const p = PROJECTIONS[i];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#ffffff] pt-24 sm:pt-28 pb-12 sm:pb-16 lg:flex lg:min-h-screen lg:items-center"
    >
      {/* Soft brand glow — desktop only, behind the ROI card */}
      <div className="pointer-events-none absolute right-0 top-1/4 hidden h-[520px] w-[520px] -translate-y-1/4 rounded-full bg-[#d4e4a8]/25 blur-[160px] lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-xl px-5 sm:px-6 lg:max-w-6xl">
        {/* Badge — centered across the full width */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d4e4a8] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#3d4a1f] sm:text-xs">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ffffff] text-[9px] font-bold text-[#3d4a1f]">
              G
            </span>
            Google Partner · Nonprofits only
          </span>
        </div>

        <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          {/* ---- Left: message + CTA ---- */}
          <div>
            {/* Headline */}
            <h1 className="text-center text-4xl font-black leading-[1.08] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-left lg:text-[3.5rem]">
              Grow Your Nonprofit With{" "}
              <span className="text-[#3d4a1f]">Steady Monthly Donations</span>{" "}
              From Google's $10K Ad Grant.
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-center text-base leading-relaxed text-[#5a5a5a] sm:text-lg lg:text-left">
              Google Ad Grants management, built exclusively for US nonprofits.
              Fully done-for-you — your team stays on the mission, we run the
              account.
            </p>

            {/* Service pills */}
            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <a
                href="#pricing"
                className="hero-svc flex flex-1 items-center gap-2.5 rounded-full border border-[#e5e0d0] bg-[#ffffff] px-4 py-2.5 transition-colors hover:border-[#3d4a1f] lg:flex-none lg:px-5"
              >
                <span className="hero-svc-icon">
                  <BoltIcon />
                </span>
                <span className="text-sm font-semibold leading-tight text-[#1a1a1a]">
                  Grant Management
                </span>
              </a>
              <span className="shrink-0 text-[11px] italic text-[#9a9a94]">
                or
              </span>
              <a
                href="#pricing"
                className="hero-svc flex flex-1 items-center gap-2.5 rounded-full border border-[#e5e0d0] bg-[#ffffff] px-4 py-2.5 transition-colors hover:border-[#3d4a1f] lg:flex-none lg:px-5"
              >
                <span className="hero-svc-icon">
                  <TargetIcon />
                </span>
                <span className="text-sm font-semibold leading-tight text-[#1a1a1a]">
                  Full Marketing
                </span>
              </a>
            </div>

            {/* CTA — full-width on mobile, inline on desktop. The ROI widget
                becomes the hero's right-hand focal point on desktop, so the CTA
                also renders inside that card there; here it shows below lg only. */}
            <div className="mt-5 lg:hidden">
              <a
                href="#contact-form"
                className="btn-primary attention-pulse w-full !py-4 !text-lg sm:!text-xl"
              >
                Book a Strategy Call →
              </a>
              <p className="mt-2 text-center text-[13px] text-[#5a5a5a]">
                30 min · Includes your ROI projection
              </p>
            </div>
          </div>

          {/* ---- Right: ROI widget (elevated card on desktop) ---- */}
          <div className="mt-6 lg:mt-0">
            <div className="mx-auto max-w-md rounded-3xl bg-[#f5f1e8] px-5 py-6 text-center lg:px-7 lg:py-8 lg:shadow-[0_24px_60px_rgba(61,74,31,0.14)] lg:ring-1 lg:ring-[#e5e0d0]">
              <a
                href="#roi-projection"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e0d0] bg-[#ffffff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#3d4a1f]"
              >
                Projected for your niche ▼
              </a>
              <div
                className={`mt-3 text-5xl font-black tracking-tight text-[#1a1a1a] transition-opacity duration-200 lg:text-6xl ${
                  fade ? "opacity-20" : "opacity-100"
                }`}
              >
                {p.num}
              </div>
              <div className="mt-1 text-[13px] text-[#5a5a5a]">
                in donations over 24 months
              </div>
              <div className="mt-3 flex justify-around border-t border-[#e0d9c7] pt-3 lg:mt-4 lg:pt-4">
                <div>
                  <div
                    className={`text-sm font-bold text-[#3d4a1f] transition-opacity duration-200 lg:text-base ${
                      fade ? "opacity-20" : "opacity-100"
                    }`}
                  >
                    {p.roi}
                  </div>
                  <div className="mt-0.5 text-[8px] uppercase tracking-[0.06em] text-[#5a5a5a] lg:text-[9px]">
                    ROI
                  </div>
                </div>
                <div>
                  <div
                    className={`text-sm font-bold text-[#3d4a1f] transition-opacity duration-200 lg:text-base ${
                      fade ? "opacity-20" : "opacity-100"
                    }`}
                  >
                    {p.conv}
                  </div>
                  <div className="mt-0.5 text-[8px] uppercase tracking-[0.06em] text-[#5a5a5a] lg:text-[9px]">
                    Conversions
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#3d4a1f] lg:text-base">
                    9/10
                  </div>
                  <div className="mt-0.5 text-[8px] uppercase tracking-[0.06em] text-[#5a5a5a] lg:text-[9px]">
                    Hit Result
                  </div>
                </div>
              </div>
              <div className="mt-2 text-[9px] italic text-[#5a5a5a]">
                Based on 200+ real nonprofit accounts
              </div>

              {/* CTA lives inside the card on desktop so it anchors the widget */}
              <div className="mt-5 hidden lg:block">
                <a
                  href="#contact-form"
                  className="btn-primary attention-pulse w-full !py-4 !text-lg"
                >
                  Book a Strategy Call →
                </a>
                <p className="mt-2 text-[13px] text-[#5a5a5a]">
                  30 min · Includes your ROI projection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust marquee — full width beneath both columns */}
        <div className="mt-8 overflow-hidden lg:mt-14">
          <div className="hero-marquee flex w-max whitespace-nowrap lg:justify-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex" aria-hidden={dup === 1}>
                {TRUST.map((t) => (
                  <span
                    key={dup + t}
                    className="flex items-center text-[10px] font-medium uppercase tracking-[0.08em] text-[#5a5a5a] lg:text-[11px]"
                  >
                    {t}
                    <span className="mx-3 text-[#c9c6bb]">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
