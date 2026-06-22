import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DeferredMount from "./components/DeferredMount";

// Below-the-fold components are loaded on demand to shrink the initial JS bundle.
const SocialProofBar = lazy(() => import("./components/SocialProofBar"));
const ContactFormCard = lazy(() => import("./components/ContactFormCard"));
const Problem = lazy(() => import("./components/Problem"));
const Opportunity = lazy(() => import("./components/Opportunity"));
const WhatIsGrants = lazy(() => import("./components/WhatIsGrants"));
const Credibility = lazy(() => import("./components/Credibility"));
const Guarantee = lazy(() => import("./components/Guarantee"));
const Ownership = lazy(() => import("./components/Ownership"));
const Solution = lazy(() => import("./components/Solution"));
const GooglePartnerAdvantage = lazy(
  () => import("./components/GooglePartnerAdvantage"),
);
const Pricing = lazy(() => import("./components/Pricing"));
const FAQ = lazy(() => import("./components/FAQ"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));
const Footer = lazy(() => import("./components/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Reserve vertical space so the deferred mount doesn't trigger a CLS spike
// once the lazy chunks start streaming in.
const belowFoldPlaceholder = (
  <div aria-hidden="true" style={{ minHeight: "100vh" }} />
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />
      <main id="main-content" aria-label="Main content">
        <Hero />
        {/*
          Defer mounting the rest of the page (including the SocialProofBar
          marquee) until the main thread is idle or the user starts
          interacting. This dramatically reduces TBT/LCP on mobile because
          the lazy chunks no longer compete with the LCP image's critical
          fetch window.
        */}
        <DeferredMount placeholder={belowFoldPlaceholder}>
          <Suspense fallback={belowFoldPlaceholder}>
            <SocialProofBar />
            <Opportunity />
            <Problem />
            <WhatIsGrants />
            <Credibility />
            <Guarantee />
            <Ownership />
            <Solution />
            <FinalCTA />
            <GooglePartnerAdvantage />
            <Pricing />
            <ContactFormCard />
            <FAQ />
            <Footer />
            <ScrollToTop />
          </Suspense>
        </DeferredMount>
      </main>
    </div>
  );
}
