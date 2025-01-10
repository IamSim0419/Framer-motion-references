"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react";

export default function ScrollPage() {
  return (
    <main>
        <ScrollTracker />
        <ElementScroll />
        <ParallaxScroll />
    </main>
  )
}

//! ScrollTracker component
export function ScrollTracker() {
  const { scrollYProgress } = useScroll(); // scroll position
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  }); // spring smoothing

  return (
    <section className="bg-neutral-700 border-b-4 border-amber-500">
      <motion.div className="fixed top-0 left-0 right-0 origin-left bg-pink-600 h-4 z-20" style={{ scaleX }} />
      <h1 className="text-center py-24 text-4xl text-white/80 font-semibold">
        <code>useScroll</code> with spring smoothing
      </h1>
      <div className="h-[200vh]" />
    </section>
  );
}

//! Element Scroll Component
export function ElementScroll() {
    const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref, // Target element to track
    offset: ["start end", "end start"], // Started/End points of animation
  });

  return (
    <section className="h-[150vh] flex justify-center items-center">
        <motion.div 
            ref={ref}
            className="w-64 h-64 bg-purple-600"
            style={{
                opacity: scrollYProgress, 
                scale: scrollYProgress,
            }}  
        />
    </section>
  )
}

//! Parallax Scroll Component
export function ParallaxScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });

    // Parallax effect- Map progress values to transform
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section className="h-[200vh] flex justify-center items-center bg-slate-800">
            <div ref={ref} className="relative w-full h-[100vh]">
                <motion.div 
                    className="absolute top-20 left-1/4 text-4xl text-blue-500"
                    style={{ y: y1 }}
                >
                    Layer 1
                </motion.div>

                <motion.div
                    className="absolute top-40 left-1/3 text-4xl text-purple-500"
                    style={{ y: y2 }}
                >
                    Layer 2
                </motion.div>
            </div>
        </section>
    )
}