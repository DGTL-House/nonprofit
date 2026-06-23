import { LazyMotion, domAnimation } from "framer-motion";

// Loads only the `domAnimation` feature set (animation, variants, exit,
// inView, hover/tap/focus) instead of the full motion bundle. Everything
// below the fold uses the lightweight `m` component, so drag/layout features
// — which we don't use — are never shipped. This roughly halves the
// framer-motion chunk. Kept in its own module so it stays off the critical
// path (it's lazy-loaded with the rest of the deferred tree).
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
