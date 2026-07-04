"use client";

import { motion } from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {constantsConfig} from "@/constants/constantsConfig";


export default function Portfolio() {
    return (
        <section className="flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto border-t border-gray-200 px-6 py-12 sm:py-24">
            <div className="w-full max-w-5xl">
                <Reveal>
                    <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                        Портфолио
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
                        Несколько проектов, которые мы недавно реализовали.
                    </p>
                </Reveal>

                <motion.div
                    className="mt-6 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    {constantsConfig.projects.map((project) => (
                        <motion.div key={project.title} variants={staggerItem}>
                            <TiltCard className="rounded-xl border border-gray-200 p-4 text-left transition-colors hover:border-gray-900 sm:p-6">
                                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    {project.description}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}