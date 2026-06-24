"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import data2024 from "@/data/legal/2024-2025.json";
import data2023 from "@/data/legal/2023-2024.json";

type Section = { title: string; items: string[] };

type LegalContent = {
    paragraphs: string[];
    articles: string[];
    closing_paragraphs: string[];
    sections?: Section[];
};

type LegalData = {
    constitution: LegalContent;
    bylaws: LegalContent;
};

const legalDataMap: Record<string, LegalData> = {
    "2024-2025": data2024,
    "2023-2024": data2023,
};

function useLatestLegal(): { preamble: string[]; vmgo: Section[] } {
    const [year] = useState(Object.keys(legalDataMap).sort().reverse()[0]);
    const [data, setData] = useState<LegalData>(legalDataMap[year]);

    useEffect(() => {
        setData(legalDataMap[year]);
    }, [year]);

    return useMemo(() => {
        const c = data?.constitution;
        const preamble = c?.paragraphs ?? [];
        const vmgo = (c?.sections ?? []).filter((s) =>
            /Section\s*(1|2|3|4)/i.test(s.title)
        );
        return { preamble, vmgo };
    }, [data]);
}

export function AboutParallax() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ container: undefined });

    // Background parallax for hero image
    const bgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
    const fgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-8%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
    // History will use a sticky scrollytelling approach instead of background parallax

    const { preamble, vmgo } = useLatestLegal();

    return (
        <div ref={containerRef} className="w-full bg-gray-50 relative">
            {/* Quick navigation */}
            <nav className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-30">
                <ul className="space-y-3 bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl px-3 py-3">
                    <li><a href="#about" className="text-sm text-slate-700 hover:text-primary">About</a></li>
                    <li><a href="#preamble" className="text-sm text-slate-700 hover:text-primary">Preamble</a></li>
                    <li><a href="#vmgo" className="text-sm text-slate-700 hover:text-primary">VMGO</a></li>
                    <li><a href="#history" className="text-sm text-slate-700 hover:text-primary">History</a></li>
                </ul>
            </nav>
            {/* Hero Section (screen height) */}
            <section id="about" className="relative h-[100svh] overflow-hidden">
                <motion.div style={{ y: bgY }} className="absolute inset-0">
                    <Image
                        src="/images/about/about-2.webp"
                        alt="Students collaborating in technology projects"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
                <motion.div
                    style={{ y: fgY, opacity: heroOpacity }}
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
                >
                    <h1 className="text-white text-4xl md:text-6xl font-headline font-bold tracking-tight mb-4">
                        About <span className="text-primary">EXPLICIT</span>
                    </h1>
                    <p className="text-white/90 max-w-2xl md:max-w-3xl text-base md:text-xl leading-relaxed">
                        A community of BSIT students at PUP–San Pedro Campus dedicated to
                        innovation, collaboration, leadership, and service through meaningful
                        technology learning and engagement.
                    </p>
                </motion.div>
            </section>

            {/* Preamble - scrollytelling with gentle reveal */}
            <section id="preamble" className="relative py-16 md:py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-3xl md:text-4xl font-headline font-bold text-slate-800 mb-6"
                    >
                        Preamble
                    </motion.h2>
                    <div className="space-y-6">
                        {preamble.map((p, i) => (
                            <motion.p
                                key={`pre-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                className="text-slate-700 text-base md:text-lg leading-relaxed"
                            >
                                {p}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>

            {/* VMGO - pinned title, animated sections */}
            <section id="vmgo" className="relative bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-16 md:py-24">
                    <div className="lg:sticky lg:top-24 self-start">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-3xl md:text-4xl font-headline font-bold text-slate-800"
                        >
                            Vision, Mission, Goals, Objectives
                        </motion.h2>
                        <p className="mt-4 text-slate-600 hidden lg:block">
                            Explore EXPLICIT’s core purpose and direction as you scroll.
                        </p>
                    </div>
                    <div className="lg:col-span-2 space-y-10">
                        {vmgo.map((s, si) => (
                            <motion.div
                                key={`vmgo-${si}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.05 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm"
                            >
                                <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">{s.title}</h3>
                                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                    {s.items.map((item, ii) => (
                                        <li key={`vmgo-${si}-item-${ii}`} className="text-sm md:text-base leading-relaxed">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History - simple cards */}
            <section id="history" className="relative bg-white py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-800 mb-8">History</h2>
                    {(() => {
                        const events = [
                            { year: 2006, title: 'BSIT Program Begins', desc: 'BSIT program started at PUP–San Pedro Campus, laying the foundation for a strong tech community.' },
                            { year: 2006, title: 'SPECS is Founded', desc: 'Students Proficient in Electronics and Communications System (SPECS) established as the pioneering org.' },
                            { year: 2010, title: 'Transition to EXPLICIT', desc: 'SPECS transitions into EXPLICIT — Explorers in Communication and Information Technology.' },
                            { year: 2024, title: 'Fifth Directors’ Cup', desc: 'EXPLICIT proudly claims its fifth Directors’ Cup, marking years of excellence.' },
                            { year: 2025, title: 'Website Launched', desc: 'The official EXPLICIT website goes live to showcase initiatives, events, and community.' },
                        ];

                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {events.map((e, idx) => (
                                    <div key={`${e.year}-${idx}`} className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-5 md:p-6 shadow-sm">
                                        <div className="text-primary text-sm font-semibold">{e.year}</div>
                                        <h3 className="text-lg md:text-xl font-semibold text-slate-800 mt-1">{e.title}</h3>
                                        <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">{e.desc}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </section>
        </div>
    );
}
