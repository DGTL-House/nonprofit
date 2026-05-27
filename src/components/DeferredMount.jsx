import { useEffect, useState } from "react";

/**
 * Delays mounting `children` until the browser is idle OR the user
 * triggers an interaction (scroll / pointer / key). This keeps the
 * critical path (Header + Hero + SocialProofBar) small so the LCP
 * image and main thread aren't competing with lazy-chunk fetches on
 * mobile.
 *
 * Props:
 *  - idleTimeout: hard fallback (ms) if requestIdleCallback never fires
 *  - placeholder: optional element rendered before mount (default null)
 */
export default function DeferredMount({
  children,
  idleTimeout = 1500,
  placeholder = null,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let timeoutId;
    let idleId;
    const events = ["scroll", "pointerdown", "touchstart", "keydown"];

    const trigger = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      events.forEach((e) =>
        window.removeEventListener(e, trigger, { passive: true }),
      );
      setReady(true);
    };

    events.forEach((e) =>
      window.addEventListener(e, trigger, { passive: true, once: true }),
    );

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(trigger, { timeout: idleTimeout });
    } else {
      timeoutId = setTimeout(trigger, idleTimeout);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      events.forEach((e) =>
        window.removeEventListener(e, trigger, { passive: true }),
      );
    };
  }, [ready, idleTimeout]);

  if (!ready) return placeholder;
  return children;
}
