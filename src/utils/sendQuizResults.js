// Sends quiz submissions to nonprofit@dgtl-house.com via Web3Forms.
//
// The access key is safe to expose in frontend code — it only lets this form
// deliver to the address it was created for (nonprofit@dgtl-house.com); it
// can't read anything.
import { getUtmParams, getLeadId } from "./utm.js";

const ACCESS_KEY = "48fb5802-a6b0-4f70-8201-d8711ba621df";

const ENDPOINT = "https://api.web3forms.com/submit";

// Attribution fields shared by every submission — the lead_id also rides the
// booking link, so a quiz lead can be matched to the booking it turns into.
function attribution() {
  return {
    "Lead ID": getLeadId(),
    ...getUtmParams(),
    "Submitted at": new Date().toLocaleString("en-US"),
    Page: pageUrl(),
  };
}

// Shared POST helper — never throws, so a delivery hiccup can't break the UI.
async function submit(payload, context) {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
    });
    return res.ok;
  } catch (err) {
    if (import.meta.env.DEV) console.warn(`[${context}] send failed`, err);
    return false;
  }
}

const pageUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";

/**
 * Full quiz results.
 * @param {Record<string, string>} fields  Human-readable label → answer.
 * @param {{ eligible: boolean }} meta
 */
export function sendQuizResults(fields, { eligible }) {
  const mission = fields["What's your mission focus?"] || "Nonprofit";
  return submit(
    {
      subject: `New quiz lead — ${eligible ? "Eligible ✅" : "Not eligible yet ⚠️"} — ${mission}`,
      from_name: "Google Grant Eligibility Quiz",
      "501(c)(3) eligible": eligible ? "Yes" : "No",
      ...fields,
      ...attribution(),
    },
    "quiz",
  );
}

/**
 * "Notify me later" reminder request from the not-eligible screen.
 * @param {string} email
 */
export function sendReminderRequest(email) {
  return submit(
    {
      subject: "New reminder request — 501(c)(3) pending",
      from_name: "Google Grant Eligibility Quiz",
      email,
      Request: "Remind me when I'm eligible for the Google Ad Grant",
      Source: "Not-eligible screen (501(c)(3) pending)",
      ...attribution(),
    },
    "reminder",
  );
}
