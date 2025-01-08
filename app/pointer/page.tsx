"use client";

import { frame, motion, useMotionValue, useSpring } from "motion/react";
import React, { useEffect, useRef } from "react";

// Spring configuration for smooth animation
const spring = {
    damping: 5,
    stiffness: 50,
};

export default function FollowPointer() {
    const ref = useRef<HTMLDivElement | null>(null);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    // Create spring animations for the x and y motion values
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);

    useEffect(() => {
        if (!ref.current) return;

        const handlePointerMove = (event: MouseEvent) => {
             //To access the element's properties offsetLeft and offsetWidth
            const element = ref.current;

            frame.read(() => {
                if (element === null) return;
                // Update the motion values based on the pointer position
                pointerX.set(
                    event.clientX - element.offsetLeft - element.offsetWidth / 2
                );
                pointerY.set(
                    event.clientY - element.offsetTop - element.offsetHeight / 2
                );
            });
        };

        // Add event listener for pointer movement
        window.addEventListener("pointermove", handlePointerMove);

        // Clean up event listener on component unmount
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, []);

    return (
        <main className="h-screen bg-stone-800 flex items-center justify-center">
            <motion.div
                ref={ref}
                className="pointer-events-none rounded-full inline-flex items-center justify-center blur-xl"
                style={{ x, y }}
            >
                {/* Inner circles with different styles */}
                <div className="w-28 h-28 -m-16 bg-pink-500 rounded-full inline-block animate-pulse"></div>
                <div className="w-36 h-36 z-40 bg-slate-200  rounded-full inline-block"></div>
                <div className="w-28 h-28 -m-16 bg-blue-500 rounded-full inline-block animate-pulse"></div>
            </motion.div>
        </main>
    );
}
