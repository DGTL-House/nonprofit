import { CheckCircle } from "lucide-react";
import {
  AnimSection,
  AnimItem,
  fadeUp,
  slideRight,
} from "../utils/animations";
import ContactFormCard from "./ContactFormCard";

const guarantees = [
  "Grant approval guaranteed",
  "We get your Google Ad Grant — completely free",
  "Cancel anytime",
  "Your account stays yours, always",
  "No website? We'll build one",
];

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-8 sm:py-16 overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.05] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14">
          {/* Left: image */}
          <AnimItem
            variant={fadeUp}
            className="hidden lg:block shrink-0 lg:w-[420px] xl:w-[460px]"
          >
            <div className="w-full max-w-sm mx-auto lg:max-w-none lg:h-full">
              <img
                src="/slide_2.webp"
                alt="Nonprofit team getting Google Ad Grants results"
                width="920"
                height="614"
                loading="lazy"
                decoding="async"
                className="w-full h-64 sm:h-80 lg:h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </AnimItem>

          {/* Right: text content */}
          <div className="flex-1 min-w-0">
            <AnimSection>
              <AnimItem variant={fadeUp}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-400 pulse-green" />
                  <span className="text-red-400 text-base sm:text-lg font-bold">
                    4 spots remaining this month
                  </span>
                </div>
              </AnimItem>

              <AnimItem variant={fadeUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                  While you're thinking, other nonprofits are already getting
                  donors{" "}
                  <span className="text-white">— with zero ad budget.</span>
                </h2>
              </AnimItem>

              {/* All guarantees */}
              <AnimItem variant={fadeUp}>
                <div className="space-y-3 mb-10">
                  {guarantees.map((g, i) => (
                    <AnimItem
                      key={i}
                      variant={slideRight}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={12} className="text-emerald-400" />
                      </div>
                      <span className="text-slate-200 font-medium text-base sm:text-lg">
                        {g}
                      </span>
                    </AnimItem>
                  ))}
                </div>
              </AnimItem>

              {/* Social trust */}
              <AnimItem variant={fadeUp}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex -space-x-2">
                    {[
                      {
                        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces&auto=format",
                        alt: "Sarah J.",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces&auto=format",
                        alt: "Marcus W.",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&auto=format",
                        alt: "Elena R.",
                      },
                      {
                        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces&auto=format",
                        alt: "Lisa B.",
                      },
                    ].map((person, i) => (
                      <img
                        key={i}
                        src={person.src}
                        alt={person.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#f8f7f3]"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base sm:text-lg">
                      200+ nonprofits already growing
                    </div>
                    <div className="text-slate-500 text-sm sm:text-lg">
                      Join them today
                    </div>
                  </div>
                </div>
              </AnimItem>
            </AnimSection>
          </div>
        </div>
      </div>
    </section>
  );
}
