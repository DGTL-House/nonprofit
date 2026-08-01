import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

// 6 questions, one screen each. Answers are collected locally only —
// nothing is sent anywhere yet (see ContactFormCard for the hand-off point).
// The last question routes the visitor: only a 501(c)(3) reaches the booking
// screen, everyone else gets the "not eligible yet" screen. The routing flag is
// computed here and handed to onComplete so the answer strings stay in one file.
const STATUS_QUESTION_ID = "nonprofit_status";
const STATUS_ELIGIBLE = "Yes";

const QUESTIONS = [
  {
    id: "grant_status",
    question: "Do you currently have a Google Ad Grant?",
    options: [
      "Yes, we have an active Google Ad Grant",
      "We applied, but Google rejected us",
      "No, not yet",
    ],
  },
  {
    id: "marketing_owner",
    question: "Who handles marketing at your organization?",
    options: [
      "Me — I'm the founder/director",
      "We have a marketing person or team",
      "A volunteer or part-time helper",
      "No one right now",
    ],
  },
  {
    id: "team_size",
    question: "How many people work at your organization?",
    options: ["Just me / 1–2 people", "3–10", "11–50", "51–200", "200+"],
  },
  {
    id: "priority",
    question: "What matters most to your nonprofit right now?",
    options: [
      "More donations",
      "More volunteers",
      "Awareness for our cause",
      "Program sign-ups / service reach",
      "Other",
    ],
  },
  {
    id: "mission",
    question: "What's your mission focus?",
    options: [
      "Education & Youth",
      "Health & Medical",
      "Human Services",
      "Rights & Advocacy",
      "Animals & Environment",
      "Culture & Community",
      "Other",
    ],
  },
  {
    id: STATUS_QUESTION_ID,
    question: "Does your organization have valid 501(c)(3) status?",
    note: "501(c)(3) is required by Google for this program.",
    options: [STATUS_ELIGIBLE, "No"],
  },
];

// Endowed progress — the bar never starts at zero, so the first question
// already feels like part of the way in.
const PROGRESS_HEAD_START = 18;
const ADVANCE_DELAY = 280;
// The confirmation step's "processing" beat — long enough to read as the quiz
// crunching the answers before the results screen appears.
const CONFIRM_DELAY = 650;
const CONFIRM_LABEL = "I understand — got it";

export default function EligibilityQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  // Answer pending its auto-advance — keeps the card highlighted meanwhile.
  const [pending, setPending] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // One step past the last question is the "what the grant actually is"
  // confirmation screen, shown before the results screen.
  const isConfirm = step === QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = isConfirm
    ? 100
    : PROGRESS_HEAD_START +
      (step / QUESTIONS.length) * (100 - PROGRESS_HEAD_START);
  const chosen = q ? (pending ?? answers[q.id] ?? null) : null;

  const finish = (collected) =>
    onComplete(collected, collected[STATUS_QUESTION_ID] === STATUS_ELIGIBLE);

  const handleSelect = (option) => {
    if (pending) return; // ignore double taps while the advance is queued
    setPending(option);
    const next = { ...answers, [q.id]: option };
    setAnswers(next);

    timerRef.current = setTimeout(() => {
      setPending(null);
      setStep(step + 1); // last question advances to the confirmation screen
    }, ADVANCE_DELAY);
  };

  const handleConfirm = () => {
    if (pending) return;
    setPending(CONFIRM_LABEL); // fill the checkbox while we "process"
    timerRef.current = setTimeout(() => {
      setPending(null);
      finish(answers);
    }, CONFIRM_DELAY);
  };

  const handleBack = () => {
    clearTimeout(timerRef.current);
    setPending(null);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="bg-[#ffffff] rounded-3xl border border-gray-100 p-6 sm:p-10">
      {/* Header — static across every question */}
      <div className="mb-6">
        {/* Row is reserved even on Q1 so the header doesn't shift on Q2 */}
        <div className="h-6 mb-1">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Previous question"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-center mb-2">
          Before we book — tell us about you
        </h2>
        <p className="text-base sm:text-lg text-gray-500 text-center mb-5">
          {QUESTIONS.length} questions · under 60 seconds
        </p>

        <div
          className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.min(step + 1, QUESTIONS.length)}
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-label={`Question ${Math.min(step + 1, QUESTIONS.length)} of ${QUESTIONS.length}`}
        >
          <div
            className="h-full rounded-full bg-[#b5e550] transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-2 text-center">
          Question {Math.min(step + 1, QUESTIONS.length)} of {QUESTIONS.length}
        </p>
      </div>

      {isConfirm ? (
        /* Confirmation screen — what the grant actually is */
        <div className="quiz-fade">
          <span className="inline-flex items-center gap-1.5 bg-[#eef9d0] text-[#3B6D11] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ✓ What the grant actually is
          </span>

          <div className="rounded-2xl bg-[#f2fadf] border-2 border-[#d4e4a8] p-5 sm:p-6 mb-4">
            <p className="text-base sm:text-xl leading-relaxed">
              <span className="font-bold text-gray-900">
                $10,000/month in ad credit for Google Search.
              </span>{" "}
              <span className="text-[#5f7d2e]">
                Not cash — it works as ad spend.
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            aria-pressed={pending === CONFIRM_LABEL}
            className={`w-full min-h-14 flex items-center gap-3 text-left rounded-2xl border-2 px-5 py-4 text-base sm:text-lg font-medium transition-colors ${
              pending === CONFIRM_LABEL
                ? "border-[#b5e550] bg-[#eef9d0] text-[#3B6D11]"
                : "border-gray-200 bg-[#ffffff] text-gray-900 hover:border-[#b5e550] hover:bg-[#f7fce9]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                pending === CONFIRM_LABEL
                  ? "border-[#b5e550] bg-[#b5e550] text-[#3B6D11]"
                  : "border-[#b5e550]"
              }`}
            >
              {pending === CONFIRM_LABEL ? "✓" : ""}
            </span>
            {CONFIRM_LABEL}
          </button>
        </div>
      ) : (
        /* One question per screen */
        <div key={q.id} className="quiz-fade">
          <h3 className="text-xl sm:text-3xl font-bold leading-snug text-center mb-2">
            {q.question}
          </h3>
          {q.note && (
            <p className="text-sm text-gray-400 text-center mb-4">{q.note}</p>
          )}
          <div className="mt-4 flex flex-col gap-3">
            {q.options.map((option) => {
              const on = chosen === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  aria-pressed={on}
                  className={`w-full min-h-14 flex items-center gap-3 text-left rounded-2xl border-2 px-5 py-4 text-base sm:text-lg font-medium transition-colors ${
                    on
                      ? "border-[#b5e550] bg-[#eef9d0] text-[#3B6D11]"
                      : "border-gray-200 bg-[#ffffff] text-gray-700 hover:border-[#b5e550] hover:bg-[#f7fce9]"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                      on
                        ? "border-[#b5e550] bg-[#b5e550] text-[#3B6D11]"
                        : "border-gray-300"
                    }`}
                  >
                    {on ? "✓" : ""}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-6">
        No email required · Your answers stay private
      </p>
    </div>
  );
}
