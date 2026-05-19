import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProofBar from "./components/SocialProofBar";
import ContactFormCard from "./components/ContactFormCard";

// Below-the-fold components are loaded on demand to shrink the initial JS bundle.
const Problem = lazy(() => import("./components/Problem"));
const Opportunity = lazy(() => import("./components/Opportunity"));
const WhatIsGrants = lazy(() => import("./components/WhatIsGrants"));
const Credibility = lazy(() => import("./components/Credibility"));
const Guarantee = lazy(() => import("./components/Guarantee"));
const Ownership = lazy(() => import("./components/Ownership"));
const Solution = lazy(() => import("./components/Solution"));
const HowItWorks = lazy(() => import("./components/HowItWorks"));
const Pricing = lazy(() => import("./components/Pricing"));
const FAQ = lazy(() => import("./components/FAQ"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));
const Footer = lazy(() => import("./components/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

export default function App() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />
      <main id="main-content" aria-label="Main content">
        <Hero />
        <SocialProofBar />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Opportunity />
          <Problem />
          <WhatIsGrants />
          <Credibility />
          <Guarantee />
          <Ownership />
          <Solution />
          {/* <HowItWorks /> */}
          <FinalCTA />
          <Pricing />
          <ContactFormCard />
          <FAQ />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  );
}
