"use client";

import { RefObject } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

interface CTAProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export default function CTA({ containerRef }: CTAProps) {
    return (
        <section className="relative flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto border-t border-gray-200 bg-gray-900 px-6 py-12 text-center sm:py-24">
            <Parallax containerRef={containerRef} offset={90}>
                <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700/30 blur-3xl" />
            </Parallax>

            <Reveal>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Готовы обсудить ваш проект?
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="mt-2 max-w-xl mx-auto text-sm text-gray-300 sm:text-base">
                    Расскажите, что хотите построить — предложим план и сроки в течение дня.
                </p>
            </Reveal>
            <Reveal delay={0.2}>
            <a
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200 sm:mt-8 sm:text-base"
                >
                Связаться с нами
            </a>
        </Reveal>
</section>
);
}