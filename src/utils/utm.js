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
const LEAD_KEY = "dgtl_lead_id";

/**
 * A stable per-session id that ties a quiz submission to the same visitor's
 * later booking. Generated once, reused from sessionStorage, and appended to
 * both the quiz email and the outbound booking link.
 */
export function getLeadId() {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem(LEAD_KEY);
    if (!id) {
      id =
        window.crypto?.randomUUID?.() ||
        `lead-${Math.random().toString(36).slice(2)}${Math.random()
          .toString(36)
          .slice(2)}`;
      window.sessionStorage.setItem(LEAD_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

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
 * Return `url` with UTM params and the session lead_id appended. Existing
 * params on the target URL are preserved — values are only added when not
 * already present. lead_id is always appended so the booking can be matched
 * back to the quiz submission even when no UTMs are present.
 */
export function appendUtmParams(url) {
  if (!url) return url;
  const utm = getUtmParams();
  const leadId = getLeadId();
  try {
    const u = new URL(url, window.location.origin);
    Object.keys(utm).forEach((k) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, utm[k]);
    });
    if (leadId && !u.searchParams.has("lead_id")) {
      u.searchParams.set("lead_id", leadId);
    }
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
