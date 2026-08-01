// Maps quiz answers (keyed by question id; values are the on-screen labels)
// to the exact query params the GoHighLevel booking widget expects, so the
// anonymous quiz can prefill the contact's custom fields on the booking page.
//
// ⚠️ The label keys below MUST match the option strings in EligibilityQuiz.jsx
// character-for-character. GHL only records a value when it matches the field
// option exactly — note org_size uses plain hyphens (-), NOT the en-dashes (–)
// shown in the quiz labels. Anything unmatched is silently dropped.
const QUIZ_PARAM_MAP = {
  grant_status: {
    param: "grant_status",
    values: {
      "Yes, we have an active Google Ad Grant": "Active grant",
      "We applied, but Google rejected us": "Applied — rejected",
      "No, not yet": "Not yet",
    },
  },
  marketing_owner: {
    param: "marketing_owner",
    values: {
      "Me — I'm the founder/director": "Founder/director",
      "We have a marketing person or team": "Marketing person or team",
      "A volunteer or part-time helper": "Volunteer or part-time",
      "No one right now": "No one",
    },
  },
  team_size: {
    param: "org_size",
    values: {
      "Just me / 1–2 people": "1-2",
      "3–10": "3-10",
      "11–50": "11-50",
      "51–200": "51-200",
      "200+": "200+",
    },
  },
  priority: {
    param: "primary_goal",
    values: {
      "More donations": "Donations",
      "More volunteers": "Volunteers",
      "Awareness for our cause": "Awareness",
      "Program sign-ups / service reach": "Program sign-ups",
      Other: "Other",
    },
  },
  mission: {
    param: "mission_focus",
    values: {
      "Education & Youth": "Education & Youth",
      "Health & Medical": "Health & Medical",
      "Human Services": "Human Services",
      "Rights & Advocacy": "Rights & Advocacy",
      "Animals & Environment": "Animals & Environment",
      "Culture & Community": "Culture & Community",
      Other: "Other",
    },
  },
  nonprofit_status: {
    param: "eligibility",
    values: {
      Yes: "Eligible",
      No: "Not yet — no 501c3",
    },
  },
};

/** Build the { paramName: ghlValue } object from collected quiz answers. */
export function answersToBookingParams(answers) {
  const out = {};
  if (!answers) return out;
  for (const [quizId, { param, values }] of Object.entries(QUIZ_PARAM_MAP)) {
    const value = values[answers[quizId]];
    if (value != null) out[param] = value;
  }
  return out;
}

/** Return `url` with the mapped quiz answers appended as query params. */
export function appendBookingParams(url, answers) {
  try {
    const u = new URL(url);
    Object.entries(answersToBookingParams(answers)).forEach(([k, v]) =>
      u.searchParams.set(k, v),
    );
    return u.toString();
  } catch {
    return url;
  }
}
