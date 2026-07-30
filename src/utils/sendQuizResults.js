// Sends completed quiz answers to nonprofit@dgtl-house.com via Web3Forms.
//
// The access key is safe to expose in frontend code — it only lets this form
// deliver to the address it was created for (nonprofit@dgtl-house.com); it
// can't read anything.
const ACCESS_KEY = "48fb5802-a6b0-4f70-8201-d8711ba621df";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * @param {Record<string, string>} fields  Human-readable label → answer.
 * @param {{ eligible: boolean }} meta
 */
export async function sendQuizResults(fields, { eligible }) {
  const mission = fields["What's your mission focus?"] || "Nonprofit";
  const payload = {
    access_key: ACCESS_KEY,
    subject: `New quiz lead — ${eligible ? "Eligible ✅" : "Not eligible yet ⚠️"} — ${mission}`,
    from_name: "Google Grant Eligibility Quiz",
    "501(c)(3) eligible": eligible ? "Yes" : "No",
    ...fields,
    "Submitted at": new Date().toLocaleString("en-US"),
    Page: typeof window !== "undefined" ? window.location.href : "",
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    // Never let a delivery hiccup break the results screen.
    if (import.meta.env.DEV) console.warn("[quiz] send failed", err);
    return false;
  }
}
