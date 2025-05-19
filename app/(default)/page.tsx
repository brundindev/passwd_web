"use client";

import Image from "next/image";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";
import PageIllustration from "@/components/page-illustration";
import Tutorial from "@/components/ui/Tutorial";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/* Tutorial de la aplicación */}
        <Tutorial />
        
        <main className="-mt-32 w-full">
          {/* Illustration */}
          <PageIllustration />

          {/* Hero section */}
          <ScrollAnimation className="mb-8">
            <Hero />
          </ScrollAnimation>

          {/* How it works */}
          <ScrollAnimation className="mb-16">
            <Workflows />
          </ScrollAnimation>

          {/* Features */}
          <ScrollAnimation className="mb-20">
            <Features />
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation>
            <Cta />
          </ScrollAnimation>
        </main>
      </div>
    </PageTransition>
  );
}
