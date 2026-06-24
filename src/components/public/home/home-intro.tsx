"use client";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import Image from "next/image";

export function HomeIntro() {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const [bubbleOpen, setBubbleOpen] = React.useState(false);
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setBubbleOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section ref={ref} className="relative py-12 md:py-20 bg-white dark:bg-[#0B1220] overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
            {/* Decorative background accents (fade/slide in when in view) */}
            <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            />
            {/* Subtle gradient wash */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/60 dark:to-[#0D1222]/70" />

            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
                    {/* Copy */}
                    <div className="text-center md:text-left max-w-xl md:max-w-none mx-auto">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-sm font-semibold tracking-wider text-primary uppercase mb-3"
                        >
                            A quick intro
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight font-headline text-slate-900 dark:text-white"
                        >
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">EXPLICIT</span> at PUP San Pedro
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                            className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300"
                        >
                            We’re a student community exploring communication and information technology through projects, workshops, and events.
                            Our story is best told by what we do—on campus and beyond.
                        </motion.p>

                        {/* Arrow moved to bottom-center for clearer affordance */}
                    </div>

                    {/* Mascot visual (hover + click bubble) */}
                    <motion.button
                        type="button"
                        aria-label="Toggle mascot speech bubble"
                        aria-expanded={bubbleOpen}
                        onClick={() => setBubbleOpen((v) => !v)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.99 }}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="relative group aspect-[4/3] w-full max-w-lg md:max-w-xl mx-auto md:-mt-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-3xl"
                    >
                        <Image
                            src="/images/mascot.webp"
                            alt="EXPLICIT Mascot"
                            fill
                            className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                            priority
                        />
                        {/* subtle ring overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10" />
                        {/* floating accent shapes */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
                            className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-primary/30 blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
                            className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-accent/30 blur-md"
                        />

                        {/* Speech bubble */}
                        {bubbleOpen && (
                            <motion.div
                                id="mascot-bubble"
                                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute -top-4 left-2 md:left-4 md:-top-6 z-20"
                            >
                                <div className="relative max-w-[18rem] md:max-w-sm rounded-2xl bg-white/95 dark:bg-[#111827]/95 shadow-xl ring-1 ring-black/5 backdrop-blur px-4 py-3 md:px-5 md:py-4 text-left">
                                    <p className="text-sm md:text-base text-slate-800 dark:text-slate-100">
                                        Hi there! Welcome to EXPLICIT.
                                    </p>
                                    <div className="mt-2 text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                                        Design by Alleah Mae Sumile
                                    </div>
                                    {/* Tail */}
                                    <div className="absolute -bottom-2 left-8 h-3 w-3 rotate-45 bg-white dark:bg-[#111827] shadow-sm ring-1 ring-black/5" />
                                </div>
                            </motion.div>
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Bottom-centered arrow over the wave */}
            <motion.a
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                href="#events"
                aria-label="Scroll to events"
                className="absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-28 z-20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
                <ChevronDown className="h-8 w-8 animate-bounce" />
            </motion.a>

            {/* Creative wave transition into next section (uses next section bg color) */}
            <motion.svg
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="pointer-events-none absolute bottom-0 left-0 w-full h-28 md:h-36 text-slate-50 dark:text-[#0F172A] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d="M0,120 C240,200 480,60 720,120 C960,180 1200,140 1440,180 L1440,200 L0,200 Z" fill="currentColor" />
            </motion.svg>
        </section>
    );
}
