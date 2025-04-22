"use client";

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function Home() {
  return (
    <PageTransition>
      <PageIllustration />
      <Hero />
      
      <ScrollAnimation variant="fadeInUp" delay={0.2}>
        <Workflows />
      </ScrollAnimation>
      
      <ScrollAnimation variant="fadeInUp" delay={0.3}>
        <Features />
      </ScrollAnimation>
      
      <ScrollAnimation variant="zoomIn" delay={0.4}>
        <Cta />
      </ScrollAnimation>
    </PageTransition>
  );
}
