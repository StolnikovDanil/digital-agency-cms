"use client";

import { motion } from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {constantsConfig} from "@/constants/constantsConfig";

export default function Testimonials() {
    return (
        <section className="flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto border-t border-gray-200 px-6 py-12 sm:py-24">
            <div className="w-full max-w-5xl">
                <Reveal>
                    <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                        Отзывы клиентов
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
                        Что говорят те, кто уже работал с нами.
                    </p>
                </Reveal>

                <motion.div
                    className="mt-6 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    {constantsConfig.testimonials.map((item) => (
                        <motion.div key={item.name} variants={staggerItem}>
                            <TiltCard
                                maxTilt={5}
                                className="rounded-xl border border-gray-200 p-4 text-left sm:p-6"
                            >
                                <p className="text-sm text-gray-700 sm:text-base">«{item.quote}»</p>
                                <div className="mt-3 sm:mt-4">
                                    <p className="text-sm font-semibold text-gray-900 sm:text-base">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 sm:text-sm">{item.role}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}