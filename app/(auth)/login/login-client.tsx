"use client";

import SignInForm from "@/components/signin-form";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function LoginClient() {
  return (
    <PageTransition className="flex flex-col flex-grow">
      <section className="flex flex-col flex-grow items-center justify-center w-full py-14 md:py-20">
        <div className="w-full max-w-sm mx-auto px-4">
          <ScrollAnimation
            variant="fadeInUp"
            className="text-center mb-12"
          >
            <h1 className="h1 text-4xl md:text-5xl font-bold font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">Bienvenido de nuevo</h1>
          </ScrollAnimation>
          <ScrollAnimation
            variant="fadeInUp"
            delay={0.1}
          >
            <SignInForm />
          </ScrollAnimation>
        </div>
      </section>
    </PageTransition>
  );
} 