"use client";

import { motion } from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {constantsConfig} from "@/constants/constantsConfig";


export default function Services() {
    return (
        <section className="flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto px-6 py-12 sm:py-24">
            <div className="w-full max-w-5xl">
                <Reveal>
                    <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                        Услуги
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
                        Полный цикл разработки digital-продукта — от идеи до запуска.
                    </p>
                </Reveal>

                <motion.div
                    className="mt-6 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    {constantsConfig.services.map((service) => (
                        <motion.div key={service.title} variants={staggerItem}>
                            <TiltCard className="rounded-xl border border-gray-200 p-4 text-left transition-colors hover:border-gray-900 sm:p-6">
                                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    {service.description}
                                </p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}