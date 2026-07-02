"use client";

import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Portfolio from "@/components/home/Portfolio";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { useSnapScroll } from "@/components/motion/useSnapScroll";

const SECTION_COUNT = 6;

export default function Home() {
    const { containerRef } = useSnapScroll(SECTION_COUNT);

    return (
        <div ref={containerRef} className="h-screen overflow-hidden">
            <main className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
                <Parallax containerRef={containerRef} offset={60}>
                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200/40 blur-3xl" />
                </Parallax>

                <Reveal>
                    <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-gray-500">
                        Диджитал-агентство
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h1 className="max-w-3xl text-4xl font-bold text-gray-900 sm:text-5xl">
                        Создаём digital-продукты, которые растят ваш бизнес
                    </h1>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="mt-6 max-w-xl text-lg text-gray-600">
                        Веб-разработка, дизайн и стратегия для стартапов и компаний,
                        готовых масштабироваться онлайн.
                    </p>
                </Reveal>
            </main>

            <Services />
            <About containerRef={containerRef} />
            <Portfolio />
            <Testimonials />
            <CTA containerRef={containerRef} />
        </div>
    );
}