"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
    const rotateX = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]),
        springConfig
    );
    const rotateY = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]),
        springConfig
    );
    const scale = useSpring(1, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const card = ref.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseEnter = () => {
        scale.set(1.03);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        scale.set(1);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
                transformPerspective: 800,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}