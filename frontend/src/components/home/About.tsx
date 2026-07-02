"use client";

import { RefObject } from "react";
import { motion } from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

const advantages = [
    {
        title: "5+ лет на рынке",
        description:
            "Работаем со стартапами и компаниями, знаем, как быстро довести продукт до релиза.",
    },
    {
        title: "Прозрачный процесс",
        description:
            "Никаких скрытых этапов — вы видите прогресс на каждом шаге и понимаете, за что платите.",
    },
    {
        title: "Современный стек",
        description:
            "Используем актуальные технологии, которые легко поддерживать и масштабировать в будущем.",
    },
];

interface AboutProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export default function About({ containerRef }: AboutProps) {
    return (
        <section className="relative flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto border-t border-gray-200 px-6 py-12 sm:py-24">
            <Parallax containerRef={containerRef} offset={70}>
                <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-100/50 blur-3xl" />
            </Parallax>

            <div className="w-full max-w-5xl">
                <Reveal>
                    <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                        Почему выбирают нас
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
                        Не просто пишем код — помогаем бизнесу достигать целей.
                    </p>
                </Reveal>

                <motion.div
                    className="mt-6 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    {advantages.map((item) => (
                        <motion.div key={item.title} variants={staggerItem} className="text-left">
                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}