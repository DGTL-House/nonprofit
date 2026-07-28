import { useState } from "react";

const PHONE = "+1 (224) 313-4445";
const PHONE_HREF = "tel:+1224313445";
const IRS_URL =
  "https://www.irs.gov/charities-non-profits/application-for-recognition-of-exemption";

// Shown when the quiz's 501(c)(3) question comes back "No". The email is kept
// client-side only for now — wire it to the CRM where noted below.
export default function NotEligibleCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `email` to the CRM/reminder list once an endpoint exists.
    setSubmitted(true);
  };

  return (
    <div className="bg-[#ffffff] rounded-3xl border border-gray-100 p-6 sm:p-10 quiz-fade">
      <span className="inline-flex items-center gap-1.5 bg-[#f3ebe6] text-[#8a4b2f] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
        ✕ Not eligible yet
      </span>

      <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-3">
        Google Requires <br /> 501(c)(3) Status
      </h2>

      <p className="text-base sm:text-lg text-gray-500 mb-7">
        Google requires valid 501(c)(3) status for the Ad Grant program. Once
        your status is approved, you're eligible for $10,000/month in ad credit
        — and we'll be here to set it up.
      </p>

      {/* Primary action — the reminder capture */}
      <div className="rounded-2xl bg-[#eef9d0] border border-[#d4e4a8] p-5 sm:p-6">
        <p className="font-bold text-[#3B6D11] text-lg sm:text-xl mb-3">
          Want us to check in later?
        </p>

        {submitted ? (
          <p className="text-[#3B6D11] text-base sm:text-lg font-semibold">
            ✓ Got it — we'll send one reminder to {email}.
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="notify-email" className="sr-only">
                Email address
              </label>
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 rounded-full border border-[#d4e4a8] bg-[#ffffff] px-5 py-3 text-base sm:text-lg outline-none focus:border-[#b5e550]"
              />
              <button
                type="submit"
                className="bg-[#b5e550] hover:bg-[#a3d444] text-black font-bold text-base sm:text-lg rounded-full px-6 py-3 transition-colors whitespace-nowrap"
              >
                Notify Me →
              </button>
            </form>
            <p className="text-[#3B6D11]/80 text-sm mt-3">
              We'll send one reminder when it's time — no newsletter.
            </p>
          </>
        )}
      </div>

      {/* Secondary — phone */}
      <hr className="border-gray-100 my-7" />
      <p className="text-base sm:text-lg text-gray-500 mb-3">
        Already approved, or have questions?
      </p>
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex border-2 border-gray-200 hover:border-[#b5e550] text-gray-700 font-semibold text-base sm:text-lg rounded-full px-6 py-3 transition-colors"
      >
        📞 {PHONE}
      </a>

      <p className="text-sm text-gray-400 mt-7">
        New to 501(c)(3)?{" "}
        <a
          href={IRS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600 transition-colors"
        >
          See the IRS application overview →
        </a>
      </p>
    </div>
  );
}
