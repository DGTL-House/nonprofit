import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DeferredMount from "./components/DeferredMount";

// Below-the-fold components are loaded on demand to shrink the initial JS bundle.
// Block order follows the new-landing structure doc:
//   Hero → Ad Credit → What is Ad Grants → Case Studies → How We Get You There
//   → Pain → Who We Are + Google Partner → ROI Projection → Pricing → Final CTA
const Opportunity = lazy(() => import("./components/Opportunity")); // "Ad Credit Isn't Cash" (#ad-credit)
const WhatIsGrants = lazy(() => import("./components/WhatIsGrants"));
const CaseStudies = lazy(() => import("./components/CaseStudies"));
const HowWeGetYouThere = lazy(() => import("./components/HowWeGetYouThere"));
const Problem = lazy(() => import("./components/Problem")); // "Боли"
const WhoWeAre = lazy(() => import("./components/WhoWeAre"));
const RoiProjection = lazy(() => import("./components/RoiProjection"));
const Pricing = lazy(() => import("./components/Pricing"));
const FAQ = lazy(() => import("./components/FAQ"));
const ContactFormCard = lazy(() => import("./components/ContactFormCard")); // Final CTA (quiz)
const Footer = lazy(() => import("./components/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const BlockSwitcher = lazy(() => import("./components/BlockSwitcher"));
const MotionProvider = lazy(() => import("./components/MotionProvider"));

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
          Defer mounting the rest of the page until the main thread is idle or
          the user starts interacting. Keeps TBT/LCP low on mobile because the
          lazy chunks no longer compete with the hero's critical render.
        */}
        <DeferredMount placeholder={belowFoldPlaceholder}>
          <Suspense fallback={belowFoldPlaceholder}>
            <MotionProvider>
              <Opportunity />
              <WhatIsGrants />
              <CaseStudies />
              <HowWeGetYouThere />
              <Problem />
              <WhoWeAre />
              <RoiProjection />
              <Pricing />
              <ContactFormCard />
              <FAQ />
              <Footer />
              <ScrollToTop />
              <BlockSwitcher />
            </MotionProvider>
          </Suspense>
        </DeferredMount>
      </main>
    </div>
  );
}
