"use client";

import { useRef, RefObject, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
    containerRef: RefObject<HTMLDivElement | null>;
    children?: ReactNode;
    className?: string;
    offset?: number;
}

export function Parallax({ containerRef, children, className = "", offset = 80 }: ParallaxProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const rawY = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.3 });

    return (
        <motion.div
            ref={sectionRef}
            style={{ y }}
            className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
            aria-hidden
        >
            {children}
        </motion.div>
    );
}