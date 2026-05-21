// UTM forwarding helper.
// Captures UTM/click-id params from the landing URL into sessionStorage
// and appends them to outbound booking-widget links so attribution is
// preserved across the cross-domain handoff to api.dgtl-house.com.

const FORWARD_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "_gl",
];

const STORAGE_KEY = "dgtl_utm_params";

function readFromLocation() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out = {};
  FORWARD_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}

function readStored() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStored(data) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/**
 * Capture UTM params from the current URL and merge them into sessionStorage.
 * Should be called once on app start.
 */
export function captureUtmParams() {
  const fromUrl = readFromLocation();
  if (Object.keys(fromUrl).length > 0) {
    const merged = { ...readStored(), ...fromUrl };
    writeStored(merged);
    return merged;
  }
  return readStored();
}

/**
 * Get the current set of UTM params (URL takes precedence over stored).
 */
export function getUtmParams() {
  return { ...readStored(), ...readFromLocation() };
}

/**
 * Return `url` with UTM params appended. Existing params on the target URL
 * are preserved — UTMs are only added when not already present.
 */
export function appendUtmParams(url) {
  if (!url) return url;
  const utm = getUtmParams();
  const keys = Object.keys(utm);
  if (keys.length === 0) return url;
  try {
    const u = new URL(url, window.location.origin);
    keys.forEach((k) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, utm[k]);
    });
    return u.toString();
  } catch {
    return url;
  }
}

// Capture at module load so any later render that calls appendUtmParams
// has the data available even if the URL changes (e.g. SPA navigation).
if (typeof window !== "undefined") {
  captureUtmParams();
}
