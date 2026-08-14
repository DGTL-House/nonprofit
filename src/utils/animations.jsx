import { useEffect, useRef } from "react";

// Scroll-reveal primitives. These used to be framer-motion wrappers; the whole
// library bought us fadeUp/fadeIn/scaleIn/slideLeft/slideRight plus a stagger,
// all of which are a CSS transition and one IntersectionObserver. Dropping it
// takes ~124 KB of JS off the deferred path and, more importantly, removes the
// chunk that every below-the-fold section had to wait on before it could render.
//
// The exported names and props are unchanged, so existing call sites — roughly
// 180 of them — keep working as-is.

// Variant tokens. Formerly framer variant objects, now just class names, which
// is why `variant={fadeUp}` still reads the same at the call site.
export const fadeUp = "anim-fade-up";
export const fadeIn = "anim-fade-in";
export const scaleIn = "anim-scale-in";
export const slideLeft = "anim-slide-left";
export const slideRight = "anim-slide-right";
// Kept only so existing imports resolve; the stagger now lives in AnimSection.
export const staggerContainer = "anim-stagger";

// Matches the old `staggerChildren: 0.12`.
const STAGGER_STEP = 0.12;

export function AnimSection({ children, className = "", skipInitial = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      // Delay by position in tree order, the way staggerChildren did. CSS
      // nth-child can't express this once items sit at different depths.
      el.querySelectorAll("[data-anim-item]").forEach((item, i) => {
        item.style.transitionDelay = `${i * STAGGER_STEP}s`;
      });
      el.classList.add("is-visible");
    };

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (skipInitial || reduced || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    // threshold is deliberately 0 with a bottom rootMargin instead of the old
    // `amount: 0.12`: a section taller than the viewport can never reach a 0.12
    // intersection ratio, so a ratio-based trigger would never fire on it.
    let delivered = false;
    const io = new IntersectionObserver(
      (entries) => {
        delivered = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);

    // Failsafe. Observing always produces one callback, even for an off-screen
    // target, so silence means the observer isn't delivering — and since the
    // content starts at opacity 0, that would leave the section permanently
    // invisible. Showing it unanimated is the right way to fail here.
    const failsafe = setTimeout(() => {
      if (!delivered) {
        el.classList.add("is-visible");
        io.disconnect();
      }
    }, 1500);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, [skipInitial]);

  return (
    <div ref={ref} className={`anim-section ${className}`}>
      {children}
    </div>
  );
}

export function AnimItem({ children, variant = fadeUp, className = "" }) {
  return (
    <div data-anim-item className={`anim-item ${variant} ${className}`}>
      {children}
    </div>
  );
}
