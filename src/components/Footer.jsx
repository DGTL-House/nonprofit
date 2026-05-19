import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#ebe9e0] border-t border-[#dbdbd8] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-12">
          {/* Brand & Description */}
          <div className="flex-1">
            <img
              src="/nonprofit-logo.svg"
              alt="DGTL-House — Google Ad Grants for Nonprofits"
              width="140"
              height="28"
              loading="lazy"
              decoding="async"
              className="h-7 w-auto mb-5"
            />
            <p className="text-slate-500 text-sm sm:text-lg leading-relaxed max-w-sm mb-5">
              Helping nonprofits access and maximize Google Ad Grants since
              2018. Certified partner. 200+ organizations helped.
            </p>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-3 lg:text-right">
            <div className="text-sm sm:text-lg text-slate-500">
              <a
                href="mailto:nonprofit@dgtl-house.com"
                className="hover:text-emerald-400 transition-colors"
              >
                nonprofit@dgtl-house.com
              </a>
            </div>
            <div className="text-sm sm:text-lg text-slate-500">
              1 (224) 584 8401
            </div>
            <div className="text-sm sm:text-lg text-slate-500">
              1635 Eagle Grove Ct. Wheeling, IL 60090
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-600 text-sm sm:text-lg">
            © {year} DGTL-House Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm sm:text-lg text-slate-600">
            <span className="flex items-center gap-1.5">
              Google Ad Grants Certified Partner
            </span>
            <span className="text-slate-700">·</span>
            <span>Not affiliated with Google LLC</span>
            <span className="text-slate-700">·</span>
            <a
              href="https://dgtl-house.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
