"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    distance?: number;
    className?: string;
    stagger?: boolean;
}

export default function ScrollReveal({
    children,
    width = "100%",
    delay = 0,
    direction = "up",
    duration = 0.8,
    distance = 50,
    className,
    stagger = false,
}: ScrollRevealProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...directions[direction]
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
                when: stagger ? "beforeChildren" : undefined,
                staggerChildren: stagger ? 0.1 : undefined,
            }
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ width }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = motion.div;
