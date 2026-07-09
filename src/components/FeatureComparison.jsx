import { Fragment, useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";

// Column order matches the `plans` prop order: [starter, standard, premium]
const groups = [
  {
    title: "Google Ad Grant",
    rows: [
      {
        label: "Google for Nonprofits registration",
        values: [true, true, true],
      },
      { label: "Ad Grant application & approval", values: [true, true, true] },
      {
        label: "Conversion tracking setup in Google Ads",
        values: [true, true, true],
      },
      { label: "Performance Max campaign setup", values: [true, true, true] },
      {
        label: "Ongoing high-intent keyword research",
        values: [true, true, true],
      },
      {
        label: "Ongoing campaign creation, testing, and launch",
        values: [true, true, true],
      },
      {
        label: "Ongoing optimization to reach the full $10K/month",
        values: [true, true, true],
      },
      { label: "Grant compliance monitoring", values: [true, true, true] },
      {
        label: "Heatmaps & visitor recordings setup",
        values: [false, true, true],
      },
      {
        label: "Monthly performance reporting",
        values: ["Monthly report", "Monthly report", "Monthly report"],
      },
    ],
  },
  {
    title: "AEO, SEO & Organic Growth",
    rows: [
      { label: "On-page SEO", values: [false, "2 hrs/mo", "4 hrs/mo"] },
      { label: "Technical SEO", values: [false, true, true] },
      {
        label: "Full web analytics setup (GA4, GTM, GSC and Lookers reports)",
        values: [false, true, true],
      },
      {
        label: "AEO - Answer Engine Optimization",
        values: [false, false, true],
      },
      {
        label: "Local SEO & Google Business Profile",
        values: [false, false, true],
      },
    ],
  },
  {
    title: "Website",
    rows: [
      {
        label: "CRO - Conversion rate optimization",
        values: [false, false, true],
      },
      {
        label: "Website support",
        values: ["full price", "50% off", "70% off"],
      },
    ],
  },
  {
    title: "Content & Social",
    rows: [
      {
        label: "Blog research, writing & publishing",
        values: [false, false, true],
      },
      { label: "Social media content & posting", values: [false, false, true] },
      {
        label: "Email marketing (up to 3/mo + automation)",
        values: [false, false, true],
      },
    ],
  },
  {
    title: "Support",
    rows: [{ label: "Personal project manager", values: [false, true, true] }],
  },
];

function CellValue({ value, center = false }) {
  if (value === true)
    return (
      <Check
        size={20}
        className={`text-[#3d4a1f] ${center ? "mx-auto" : ""}`}
        strokeWidth={2.5}
      />
    );
  if (value === false || value == null)
    return (
      <Minus size={18} className={`text-slate-400 ${center ? "mx-auto" : ""}`} />
    );
  return (
    <span className="text-[#3d4a1f] font-bold text-sm sm:text-base">
      {value}
    </span>
  );
}

export default function FeatureComparison({ plans, money }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    plans.find((p) => p.popular)?.id ?? plans[0].id,
  );

  const activeIndex = plans.findIndex((p) => p.id === active);

  return (
    <div className="my-8">
      <div className="flex justify-center">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 text-white font-bold text-lg sm:text-2xl border-b-2 border-current pb-1 hover:opacity-70 transition-opacity"
        >
          Compare all features
          <ChevronDown
            size={22}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-6 rounded-3xl border border-[#ebe9e0] bg-[#ffffff] overflow-hidden">
          {/* Viewport-bound, internally scrollable list */}
          <div className="max-h-[75vh] overflow-y-auto px-4 sm:px-7 py-4 sm:py-5">
            {/* Desktop table */}
            <table className="hidden lg:table w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[40%] sticky top-0 z-10 bg-[#ffffff]" />
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`align-top px-3 py-3 text-center sticky top-0 z-10 ${
                        plan.popular
                          ? "bg-[#f3f8e6] border-t-2 border-[#b5e550] rounded-t-xl"
                          : "bg-[#ffffff]"
                      }`}
                    >
                      <div className="text-[#161514] font-black text-base">
                        {plan.compareName ?? plan.name}
                      </div>
                      <div className="text-slate-400 font-normal text-sm">
                        {money(plan.monthly)}/mo
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <Fragment key={group.title}>
                    <tr>
                      <td
                        colSpan={1 + plans.length}
                        className="pt-7 pb-2 text-[#3d4a1f] font-black uppercase text-xs tracking-[0.15em]"
                      >
                        {group.title}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-t border-[#ebe9e0]">
                        <td className="py-3 pr-4 text-[#2a2a26] text-sm sm:text-base">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td
                            key={i}
                            className={`py-3 px-3 text-center ${
                              plans[i].popular ? "bg-[#f3f8e6]" : ""
                            }`}
                          >
                            <CellValue value={v} center />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>

            {/* Mobile: tabs + single column */}
            <div className="lg:hidden">
              <div className="grid grid-cols-3 gap-2 mb-4 sticky top-0 z-10 bg-[#ffffff] pt-1 pb-2">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setActive(plan.id)}
                    className={`rounded-xl px-2 py-2.5 text-center transition-colors ${
                      active === plan.id
                        ? "bg-[#eef9d0] border border-[#b5e550]"
                        : "border border-transparent opacity-50"
                    }`}
                  >
                    <div className="text-[#161514] font-bold text-sm leading-tight">
                      {plan.compareName ?? plan.name}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {money(plan.monthly)}/mo
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-[#ebe9e0] overflow-hidden">
                {groups.map((group) => (
                  <Fragment key={group.title}>
                    <div className="bg-[#f0eee6] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                      {group.title}
                    </div>
                    {group.rows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[#ebe9e0]"
                      >
                        <span className="text-[#2a2a26] text-sm">
                          {row.label}
                        </span>
                        <span className="flex-shrink-0 text-right">
                          <CellValue value={row.values[activeIndex]} />
                        </span>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
