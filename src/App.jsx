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
          {/*
            One Suspense per section rather than one around all of them: a
            shared boundary holds its fallback until the *slowest* chunk
            resolves, so a single slow request kept the entire page below the
            hero blank. Split, each section paints as soon as its own chunk
            lands. Only the first boundary reserves a viewport of height —
            the rest would otherwise stack placeholders into a huge blank page.
          */}
          <Suspense fallback={belowFoldPlaceholder}>
            <Opportunity />
          </Suspense>
          <Suspense fallback={null}>
            <WhatIsGrants />
          </Suspense>
          <Suspense fallback={null}>
            <CaseStudies />
          </Suspense>
          <Suspense fallback={null}>
            <HowWeGetYouThere />
          </Suspense>
          <Suspense fallback={null}>
            <Problem />
          </Suspense>
          <Suspense fallback={null}>
            <WhoWeAre />
          </Suspense>
          <Suspense fallback={null}>
            <RoiProjection />
          </Suspense>
          <Suspense fallback={null}>
            <Pricing />
          </Suspense>
          <Suspense fallback={null}>
            <ContactFormCard />
          </Suspense>
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          <Suspense fallback={null}>
            <BlockSwitcher />
          </Suspense>
        </DeferredMount>
      </main>
    </div>
  );
}
