import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimSection, AnimItem, fadeUp } from "../utils/animations";

// Case Studies — ported from the audit landing (nonprofit-next). Horizontally
// scrolling carousel of real-account cards, each opening a pinch/zoom lightbox.
const cases = [
  {
    org: "Refugee support org",
    niche: "Refugee Support",
    note: "Name under NDA — resettlement and legal aid services.",
    spendFrom: "$200",
    spendTo: "$7,600",
    budget: "$0 → $7,600/mo",
    img: "/case_1.webp",
    before:
      "$200/mo of $10K. Account at risk of suspension, almost no donations from ads.",
    didIt:
      "Cleared policy violations, rebuilt account, set up tracking for donations and case referrals.",
    result:
      "$7,600/mo spent. Donations and volunteer applications every week, suspension risk gone.",
    metrics: [
      { label: "Donations", value: "+51/mo" },
      { label: "Volunteer apps", value: "+29/mo" },
    ],
    quote:
      "For the first time the grant is actually bringing people to our door.",
    author: "Head of Development",
  },
  {
    org: "Education nonprofit",
    niche: "Education",
    note: "Name under NDA — after-school literacy programs.",
    spendFrom: "$500",
    spendTo: "~$10,000",
    budget: "20× growth",
    img: "/case_2.webp",
    before:
      "Broad keywords, low CTR, one click-through risk warning from Google.",
    didIt:
      "Tightened keyword themes, fixed CTR, restructured ad groups, added program-specific landing pages.",
    result:
      "~$10,000/mo spent. Steady stream of enrolment inquiries and volunteer sign-ups.",
    metrics: [
      { label: "Enrolment inquiries", value: "+62/mo" },
      { label: "Volunteer sign-ups", value: "+38/mo" },
    ],
    quote:
      "We finally understand where the budget was leaking — and how to plug it.",
    author: "Program Director",
  },
  {
    org: "Coastal Animal Rescue",
    niche: "Animal Welfare",
    note: "Regional shelter running adoption and rescue programs.",
    spendFrom: "$0",
    spendTo: "~$10,000",
    budget: "$0 → ~$10,000/mo",
    img: "/case_3.webp",
    before:
      "No Google Ad Grant. No Google Ads account. Zero grant-funded traffic.",
    didIt:
      "Secured the Google Ad Grant, built the account from scratch, and scaled campaigns to maximise budget utilisation.",
    result:
      "~$10,000/mo consistently spent. A steady flow of donations and volunteer sign-ups every month.",
    metrics: [
      { label: "Donations", value: "+82/mo" },
      { label: "Volunteer sign-ups", value: "+64/mo" },
    ],
    quote:
      "We didn't even know we qualified for the grant — now it runs our adoption campaigns every month.",
    author: "Sarah Mitchell, Exec Director",
  },
  {
    org: "Youth mentorship org",
    niche: "Youth Programs",
    note: "Name under NDA — started with no Google Ad Grant.",
    spendFrom: "$0",
    spendTo: "~$10,000",
    budget: "~100%",
    img: "/case_4.webp",
    before:
      "No Google Ad Grant. No Google Ads account. Zero grant-funded traffic.",
    didIt:
      "Secured the Google Ad Grant, built the account, and optimised campaigns for maximum budget utilisation.",
    result:
      "~$10,000/mo consistently spent with a steady flow of donations and volunteer sign-ups.",
    metrics: [
      { label: "Donations", value: "+54/mo" },
      { label: "Contact requests", value: "+46/mo" },
    ],
    quote: "We went from no ads at all to a full grant working for us every month.",
    author: "Executive Director",
  },
];

const niches = [
  "Education",
  "Healthcare",
  "Animal Welfare",
  "Environment",
  "Faith-based",
  "Refugee Support",
  "Mental Health",
  "Arts & Culture",
  "Youth Programs",
  "International Development",
  "Other",
];

function ZoomIcon({ stroke = "#3d4a1f" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

export default function CaseStudies() {
  const trackRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null); // {org, from, to, img}

  // ---- Carousel paging ----
  const computePages = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return 1;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 1) return 1;
    return Math.max(1, Math.round(maxScroll / track.clientWidth) + 1);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Cached so the scroll handler doesn't read clientWidth — a forced layout —
    // on every frame of a touch drag. Refreshed with the page count on resize.
    let cachedWidth = track.clientWidth || 1;
    const recompute = () => {
      cachedWidth = track.clientWidth || 1;
      setPages(computePages());
    };
    recompute();
    const onScroll = () => {
      const next = Math.max(0, Math.round(track.scrollLeft / cachedWidth));
      setActive((prev) => (prev === next ? prev : next));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(recompute, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [computePages]);

  const go = (page) => {
    const track = trackRef.current;
    if (!track) return;
    const p = Math.max(0, Math.min(pages - 1, page));
    track.scrollTo({ left: p * track.clientWidth, behavior: "smooth" });
  };

  // ---- Lightbox zoom / pan ----
  const stageRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lightbox) return;
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;

    const MIN = 1;
    const MAX = 5;
    let scale = 1;
    let tx = 0;
    let ty = 0;
    const pointers = new Map();
    let pinch = null;
    let panLast = null;
    let lastTap = 0;
    let downInfo = null;

    const rect = () => stage.getBoundingClientRect();
    const clampPan = () => {
      const r = rect();
      tx = Math.min(0, Math.max(r.width * (1 - scale), tx));
      ty = Math.min(0, Math.max(r.height * (1 - scale), ty));
    };
    const apply = () => {
      img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    };
    const zoomTo = (nextScale, clientX, clientY, animate) => {
      const r = rect();
      const ox = clientX == null ? r.width / 2 : clientX - r.left;
      const oy = clientY == null ? r.height / 2 : clientY - r.top;
      const cx = (ox - tx) / scale;
      const cy = (oy - ty) / scale;
      scale = Math.min(MAX, Math.max(MIN, nextScale));
      tx = ox - cx * scale;
      ty = oy - cy * scale;
      clampPan();
      img.classList.toggle("animate", !!animate);
      apply();
    };
    const reset = (animate) => {
      scale = 1;
      tx = 0;
      ty = 0;
      img.classList.toggle("animate", !!animate);
      apply();
    };

    const onDown = (e) => {
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      img.classList.remove("animate");
      if (pointers.size === 2) {
        const p = Array.from(pointers.values());
        pinch = {
          dist: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y),
          scale,
          tx,
          ty,
          midX: (p[0].x + p[1].x) / 2,
          midY: (p[0].y + p[1].y) / 2,
        };
        downInfo = null;
      } else {
        panLast = { x: e.clientX, y: e.clientY };
        downInfo = { x: e.clientX, y: e.clientY };
      }
    };
    const onMove = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (downInfo && Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y) > 12) {
        downInfo = null;
      }
      if (pointers.size === 2 && pinch) {
        const p = Array.from(pointers.values());
        const r = rect();
        const dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        const cx = (pinch.midX - r.left - pinch.tx) / pinch.scale;
        const cy = (pinch.midY - r.top - pinch.ty) / pinch.scale;
        const midX = (p[0].x + p[1].x) / 2 - r.left;
        const midY = (p[0].y + p[1].y) / 2 - r.top;
        scale = Math.min(MAX, Math.max(MIN, pinch.scale * (dist / pinch.dist)));
        tx = midX - cx * scale;
        ty = midY - cy * scale;
        clampPan();
        apply();
      } else if (pointers.size === 1 && panLast && scale > 1) {
        stage.classList.add("is-panning");
        tx += e.clientX - panLast.x;
        ty += e.clientY - panLast.y;
        panLast = { x: e.clientX, y: e.clientY };
        clampPan();
        apply();
      }
    };
    const endPointer = (e) => {
      pointers.delete(e.pointerId);
      stage.classList.remove("is-panning");
      if (pointers.size < 2) pinch = null;
      const left = Array.from(pointers.values())[0];
      panLast = left ? { x: left.x, y: left.y } : null;
    };
    const onUp = (e) => {
      const isTap =
        downInfo &&
        pointers.size === 1 &&
        Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y) < 12;
      if (isTap) {
        const now = Date.now();
        if (now - lastTap < 300) {
          if (scale > 1.05) reset(true);
          else zoomTo(2.5, e.clientX, e.clientY, true);
          lastTap = 0;
        } else {
          lastTap = now;
        }
      }
      downInfo = null;
      endPointer(e);
    };
    const onWheel = (e) => {
      e.preventDefault();
      zoomTo(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY, false);
    };

    reset(false);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", endPointer);
    stage.addEventListener("wheel", onWheel, { passive: false });
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", endPointer);
      stage.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="case-studies" className="relative overflow-hidden bg-[#ffffff] py-16 sm:py-24 scroll-mt-10 sm:scroll-mt-2">
      <div className="pointer-events-none absolute left-0 top-0 h-[480px] w-[480px] rounded-full bg-[#d4e4a8]/25 blur-[150px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimSection>
          <AnimItem variant={fadeUp}>
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#3d4a1f] sm:text-sm">
                Case Studies
              </p>
              <h2 className="mb-5 text-3xl font-black leading-tight text-[#161514] sm:text-4xl lg:text-5xl">
                Don't believe a grant can hit $10K?{" "}
                <span className="gradient-text-lime">Here's how we did it.</span>
              </h2>
              <p className="text-base text-[#52504c] sm:text-xl">
                We've done this before. Real clients · real numbers · real
                screenshots.
              </p>
            </div>
          </AnimItem>
        </AnimSection>

        {/* Carousel */}
        <div className="relative">
          <div ref={trackRef} className="carousel-track">
            {cases.map((c) => (
              <article key={c.org} className="carousel-slide">
                <div className="glass-card flex h-full flex-col gap-5 rounded-3xl p-5 shadow-[0_12px_40px_rgba(61,74,31,0.06)] sm:p-7">
                  {/* Org header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold leading-tight text-[#161514] sm:text-xl">
                        {c.org}
                      </h3>
                      <p className="mt-1 text-sm text-[#7a7770]">{c.note}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1" role="img" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eaf3de] px-3 py-1 text-xs font-semibold text-[#3d4a1f]">
                      {c.niche}
                    </span>
                    <span className="text-xs font-medium text-[#9a9890]">
                      Clutch · verified
                    </span>
                  </div>

                  {/* Screenshot — click to enlarge & zoom */}
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({ org: c.org, from: c.spendFrom, to: c.spendTo, img: c.img })
                    }
                    className="case-chart group relative block w-full rounded-2xl border border-[#e7eed5] bg-[#f6f8ee] p-3 text-left"
                    aria-label={`Enlarge and zoom the ${c.org} Google Ads screenshot`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7770]">
                        Google Ads · real account
                      </span>
                      <span className="text-[11px] font-semibold text-[#3d4a1f]">
                        Verified screenshot
                      </span>
                    </div>

                    <div className="zoom-frame relative aspect-[2/1] overflow-hidden rounded-xl border border-[#e2e6d3] bg-[#ffffff]">
                      <img
                        src={c.img}
                        alt={`${c.org} — Google Ads monthly spend growing to ${c.spendTo}`}
                        width="1150"
                        height="575"
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-[#0b1f12]/0 transition-colors duration-300 group-hover:bg-[#0b1f12]/35 sm:flex">
                        <span className="flex scale-90 items-center gap-2 rounded-full bg-[#ffffff] px-4 py-2.5 text-sm font-bold text-[#161514] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <ZoomIcon />
                          Click to zoom in
                        </span>
                      </div>
                      <span className="zoom-pill absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#161514]/90 px-3 py-1.5 text-xs font-bold text-[#ffffff] shadow-md backdrop-blur-sm">
                        <ZoomIcon stroke="#ffffff" />
                        Tap to zoom
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between px-1">
                      <span className="text-sm font-bold text-[#b33d27]">{c.spendFrom}</span>
                      <span className="text-base font-extrabold text-[#3d4a1f] sm:text-lg">{c.spendTo}</span>
                    </div>
                  </button>

                  {/* Budget utilisation */}
                  <div className="rounded-2xl bg-[#eaf3de] py-3 text-center">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7770]">
                      Budget utilisation
                    </div>
                    <div className="text-xl font-black text-[#3d4a1f] sm:text-2xl">{c.budget}</div>
                  </div>

                  {/* Before / What we did / Result */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-[rgba(179,61,39,0.14)] bg-[rgba(179,61,39,0.06)] p-3.5">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(179,61,39,0.14)] text-[11px] font-black text-[#b33d27]">1</span>
                        <span className="text-sm font-bold text-[#b33d27]">Before</span>
                      </div>
                      <p className="text-[13px] leading-snug text-[#52504c]">{c.before}</p>
                    </div>
                    <div className="rounded-xl border border-[#e4e1d6] bg-[#f0eee6] p-3.5">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e0ddcf] text-[11px] font-black text-[#3d4a1f]">2</span>
                        <span className="text-sm font-bold text-[#3d4a1f]">What we did</span>
                      </div>
                      <p className="text-[13px] leading-snug text-[#52504c]">{c.didIt}</p>
                    </div>
                    <div className="rounded-xl border border-[#c9d9a3] bg-[#eaf3de] p-3.5">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d4e4a8] text-[11px] font-black text-[#3d4a1f]">3</span>
                        <span className="text-sm font-bold text-[#3d4a1f]">Result</span>
                      </div>
                      <p className="text-[13px] leading-snug text-[#52504c]">{c.result}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-[#ebe9e0] bg-[#f8f7f3] py-3 text-center">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-[#7a7770]">{m.label}</div>
                        <div className="text-xl font-black text-[#3d4a1f]">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <figure className="mt-auto border-t border-[#ebe9e0] pt-4">
                    <blockquote className="text-sm italic leading-relaxed text-[#161514] sm:text-base">
                      “{c.quote}”
                    </blockquote>
                    <figcaption className="mt-2 text-xs text-[#7a7770] sm:text-sm">— {c.author}</figcaption>
                  </figure>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => go(active - 1)}
            className={`carousel-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ebe9e0] bg-[#ffffff] text-[#3d4a1f] shadow-md hover:bg-[#f0eee6] sm:h-11 sm:w-11 ${
              pages <= 1 || active <= 0 ? "is-hidden" : ""
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div className="flex min-h-[39px] items-center justify-center gap-2" role="tablist" aria-label="Case study pages">
            {pages > 1 &&
              Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? "true" : "false"}
                  className="carousel-dot"
                  onClick={() => go(i)}
                />
              ))}
          </div>

          <button
            type="button"
            aria-label="Next case study"
            onClick={() => go(active + 1)}
            className={`carousel-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ebe9e0] bg-[#ffffff] text-[#3d4a1f] shadow-md hover:bg-[#f0eee6] sm:h-11 sm:w-11 ${
              pages <= 1 || active >= pages - 1 ? "is-hidden" : ""
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* Niche tags */}
        <div className="mt-12">
          <p className="mb-4 text-center text-sm font-medium text-[#7a7770]">
            Audited and scaled across every kind of mission:
          </p>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
            {niches.map((n) => (
              <span key={n} className="rounded-full border border-[#d4e4a8] bg-[#d4e4a8]/25 px-4 py-2 text-sm font-medium text-[#3d4a1f]">
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#contact-form" className="btn-primary text-base sm:text-2xl !py-3 !px-8 sm:!py-4 sm:!px-10">
            Check My Eligibility →
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox ${lightbox ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged spend chart"
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightbox(null);
        }}
      >
        {lightbox && (
          <div className="relative flex h-full w-full flex-col bg-[#ffffff] p-4 sm:h-auto sm:max-w-3xl sm:rounded-2xl sm:p-7">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0eee6] text-[#161514] shadow-sm hover:bg-[#ebe9e0]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="mb-1 pr-12 text-lg font-bold text-[#161514]">{lightbox.org}</div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#7a7770]">
              Google Ads · real account screenshot
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center">
              <div ref={stageRef} className="lightbox-stage flex max-h-full w-full items-center justify-center overflow-hidden rounded-xl border border-[#e7eed5] bg-[#ffffff]">
                <img ref={imgRef} className="lightbox-svg block h-auto max-h-full w-full select-none object-contain" alt="Google Ads account screenshot — monthly spend growth" draggable="false" src={lightbox.img} />
              </div>
            </div>

            <div className="mt-3 flex shrink-0 items-center justify-between">
              <span className="text-base font-bold text-[#b33d27]">{lightbox.from}</span>
              <span className="text-xl font-extrabold text-[#3d4a1f]">{lightbox.to}</span>
            </div>
            <p className="mt-2 shrink-0 text-center text-[11px] text-[#9a9890]">
              <span className="sm:hidden">Pinch to zoom · drag to pan · double-tap to reset</span>
              <span className="hidden sm:inline">Scroll to zoom · drag to pan · double-click to reset</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
