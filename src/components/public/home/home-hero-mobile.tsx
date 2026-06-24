import React from "react";
import { motion } from "framer-motion";
import { getVariant, transitionSpringSoft } from "@/lib/motion";

// Simple, centered mobile hero. No hooks to keep it server-friendly if needed.
export default function HomeHeroMobile() {
    return (
        <section className="relative isolate text-white min-h-[calc(100svh-var(--header-height))]">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/images/bg_hero.webp"
                    alt="Hero background"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Centered content */}
            <div className="container mx-auto h-full px-4">
                <div className="flex h-[calc(100svh-var(--header-height))] items-center justify-center text-center">
                    <motion.div
                        className="max-w-xs"
                        variants={getVariant("stagger", { stagger: 0.12 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        <motion.h1
                            className="text-4xl font-black tracking-tighter leading-tight"
                            variants={getVariant("fadeInUp", { distance: 20, transition: transitionSpringSoft })}
                        >
                            Welcome, <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">EXPLORERS!</span>
                        </motion.h1>
                        <motion.p
                            className="text-base font-semibold text-white mt-3"
                            variants={getVariant("fadeInUp", { distance: 16, transition: transitionSpringSoft })}
                        >
                            HOME OF THE ORIGINAL CHAMPIONS
                        </motion.p>
                        <motion.p
                            className="mt-4 text-sm leading-relaxed text-white/95 font-medium"
                            variants={getVariant("fadeInUp", { distance: 12, transition: transitionSpringSoft })}
                        >
                            Join the premier organization for ECIT students at PUP. Connect, learn, and grow with us.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
