"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export function useSnapScroll(sectionCount: number) {
    const containerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        const container = containerRef.current;
        if (!container || isAnimatingRef.current) return;

        const clamped = Math.max(0, Math.min(sectionCount - 1, index));
        if (clamped === indexRef.current) return;

        isAnimatingRef.current = true;
        indexRef.current = clamped;
        setActiveIndex(clamped);

        const from = container.scrollTop;
        const to = clamped * container.clientHeight;

        animate(from, to, {
            duration: 0.9,
            ease: [0.65, 0, 0.35, 1],
            onUpdate: (value) => {
                container.scrollTop = value;
            },
            onComplete: () => {
                isAnimatingRef.current = false;
            },
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            if (isAnimatingRef.current) return;

            if (event.deltaY > 0) {
                scrollToIndex(indexRef.current + 1);
            } else if (event.deltaY < 0) {
                scrollToIndex(indexRef.current - 1);
            }
        };

        let touchStartY = 0;
        const handleTouchStart = (event: TouchEvent) => {
            touchStartY = event.touches[0].clientY;
        };
        const handleTouchEnd = (event: TouchEvent) => {
            if (isAnimatingRef.current) return;
            const deltaY = touchStartY - event.changedTouches[0].clientY;
            if (Math.abs(deltaY) < 50) return;

            if (deltaY > 0) {
                scrollToIndex(indexRef.current + 1);
            } else {
                scrollToIndex(indexRef.current - 1);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown" || event.key === "PageDown") {
                event.preventDefault();
                scrollToIndex(indexRef.current + 1);
            } else if (event.key === "ArrowUp" || event.key === "PageUp") {
                event.preventDefault();
                scrollToIndex(indexRef.current - 1);
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sectionCount]);

    return { containerRef, activeIndex };
}