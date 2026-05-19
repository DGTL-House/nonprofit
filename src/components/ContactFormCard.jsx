export default function ContactFormCard() {
  return (
    <section
      id="contact-form"
      className="py-8 sm:py-16 bg-gray-50 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#ffffff] rounded-3xl border border-gray-100 p-6 sm:p-10">
          <span className="inline-flex items-center gap-1.5 bg-[#eef9d0] text-[#3B6D11] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            📅 Free 30-minute call
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-2">
            Book Your Free
            <br />
            Eligibility Call
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mb-7">
            Find out in 30 minutes if your nonprofit qualifies for $10,000/month
            in free Google Ads.
          </p>

          <hr className="border-gray-100 mb-6" />

          {/* What we'll cover */}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            What we'll cover
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Review your nonprofit's profile and current digital presence",
              "Confirm your eligibility for the Google Ad Grant program",
              "Walk you through the next steps — whether you qualify or not",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base sm:text-lg text-gray-700"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#b5e550] flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#3B6D11]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="https://api.dgtl-house.com/widget/booking/tFEuSDRUuOmEuv7QjTPA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#b5e550] hover:bg-[#a3d444] text-black font-semibold text-base sm:text-2xl py-3 sm:py-4 px-6 rounded-full transition-colors"
          >
            Schedule a Call — It's Free →
          </a>
          <p className="text-center text-sm sm:text-lg text-gray-400 mt-4">
            No pressure · No commitment · Takes 30 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
