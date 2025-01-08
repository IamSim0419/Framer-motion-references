"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export default function Page() {
    return (
        <main>
            <GradientBackground />
            <BoxShadowEffect />
            <InteractiveTransform />
        </main>
    );
}

//! Basic Example - Animate Gradient Background
export function GradientBackground() {
    const x = useMotionValue(0); // Create a motion value for the x
    const y = useMotionValue(0); // Create a motion value for the y

    // Combine motion value into a radial gradient template
    const gradient = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, #D6F8D6 0.10%, #7FC6A4 50%)`;

    const handleMoveMouse = (event: React.MouseEvent) => {
        x.set(event.clientX); // Update the x motion value
        y.set(event.clientY); // Update the y motion value
    }

  return (
    <section 
        className="h-screen"
        onMouseMove={handleMoveMouse} // Update mouse position 
    >
        <motion.div 
            className="h-full w-full flex items-center justify-center"
            style={{ background: gradient }}  // Apply dynamic gradient background
        >
             <h1 className="text-4xl font-semibold text-[#FAF33E]">Animate Gradient Background</h1>
        </motion.div>
    </section>
  )
}

//! Intermediate Example - Animate Box Shadow
export function BoxShadowEffect() {
    const constraintsRef = useRef(null); // Create a ref for the constraints
    const x = useMotionValue(0); // Create a motion value for the x
    const y = useMotionValue(0); // Create a motion value for the y

    // Combine motion value into a box shadow template
    const boxShadow = useMotionTemplate`${x}px ${y}px 50px rgba(255, 105, 180, 0.9)`;

    const handleMoveMouse = (event: React.MouseEvent) => {
        x.set(event.clientX / 20); // Scale down the x motion value
        y.set(event.clientY / 20); // Scale down the y motion value
    }

    return (
        <section ref={constraintsRef}>
            <div 
                className="h-screen flex items-center justify-center bg-slate-100" 
                onMouseMove={handleMoveMouse}
            >
                <motion.div 
                    className="w-40 h-40 bg-pink-600 rounded-lg cursor-grab"
                    drag // Enable drag gesture
                    dragConstraints={constraintsRef} // Set drag constraints
                    style={{ boxShadow }} // Apply dynamic box shadow effect
                ></motion.div>
            </div>
        </section>
    )
}

//! Advanced Example - Interactive Transformation
const spring = { stiffness: 300, damping: 20 };

export function InteractiveTransform() {
    const mouseX = useMotionValue(0); // Create a motion value for the x
    const mouseY = useMotionValue(0); // Create a motion value for the y

    // Use spring motion for smooth animation
    const springX = useSpring(mouseX, spring);
    const springY = useSpring(mouseY, spring);

    const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

    const handleMouseMove = (event: React.MouseEvent) => {
        mouseX.set(event.clientX - window.innerWidth / 2); // Update the x motion value
        mouseY.set(event.clientY - window.innerHeight / 2); // Update the y
    }

    return (
        <section>
            <div 
                className="h-screen flex justify-center items-center bg-stone-800"
                onMouseMove={handleMouseMove} // Update mouse position
            >
                <motion.div 
                    className="w-40 h-40 bg-purple-500 rounded-full"
                    style={{ transform }} // Apply dynamic transformation
                />
            </div>
        </section>
    )
}