"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Lightbulb, Trophy, Wrench } from "lucide-react";
import allEventsData from "@/data/events/all-events.json";

type Event = {
    title: string;
    date: string;
    description: string;
    image: string;
    aiHint: string;
    tags: string[];
    status: string;
    attendees?: number;
};

export default function EventsOrganizationsIntro() {
    const events = allEventsData.events as Event[];

    const { totalEvents, yearsCovered, uniqueTags } = useMemo(() => {
        const totalEvents = events.length;
        const years = new Set<number>();
        const tags = new Set<string>();
        events.forEach((e) => {
            years.add(new Date(e.date).getFullYear());
            e.tags?.forEach((t) => tags.add(t));
        });
        return {
            totalEvents,
            yearsCovered: years.size,
            uniqueTags: Array.from(tags).sort(),
        };
    }, [events]);

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white">
            {/* Decorative gradient blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />

            <AnimatedSection className="container py-12 md:py-20" animateChildrenOnly>
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <Badge className="bg-primary/10 text-primary border-primary/20">Organizations Experience</Badge>
                    <h2 className="mt-4 text-3xl md:text-5xl font-bold font-headline tracking-tight text-gray-900">
                        What to expect in EXPLICIT
                    </h2>
                    <p className="mt-3 md:mt-4 text-gray-600 md:text-lg max-w-3xl mx-auto">
                        At EXPLICIT, you’ll find a vibrant mix of community, learning, and hands‑on programs—from workshops and talks to hackathons—designed to help you grow and ship meaningful work.
                    </p>
                </div>

                {/* Main creative block */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                    {/* Collage */}
                    <div className="relative h-full min-h-[32rem] md:min-h-[34rem]">
                        <FloatingCard className="left-2 top-[12%] rotate-[-3deg]">
                            <Image
                                src="/images/events/workshop.webp"
                                alt="Workshops"
                                width={540}
                                height={360}
                                className="h-48 w-80 md:h-56 md:w-[28rem] object-cover rounded-md"
                            />
                        </FloatingCard>
                        <FloatingCard className="right-2 top-[32%] rotate-[2deg]">
                            <Image
                                src="/images/events/tech.webp"
                                alt="Tech Talks"
                                width={480}
                                height={320}
                                className="h-40 w-64 md:h-48 md:w-96 object-cover rounded-md"
                            />
                        </FloatingCard>
                        <FloatingCard className="left-6 top-[52%] rotate-[4deg]">
                            <Image
                                src="/images/events/hackathon.webp"
                                alt="Hackathons"
                                width={460}
                                height={320}
                                className="h-40 w-64 md:h-48 md:w-96 object-cover rounded-md"
                            />
                        </FloatingCard>
                        <FloatingBubble className="-left-4 top-[6%]" Icon={Users} label="Community" />
                        <FloatingBubble className="right-0 top-[10%]" Icon={Wrench} label="Workshops" />
                        <FloatingBubble className="-right-3 top-[40%]" Icon={Lightbulb} label="Talks" />
                        <FloatingBubble className="left-4 bottom-10" Icon={Trophy} label="Hackathons" />
                    </div>

                    {/* Experience track + stats */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <ExperienceItem
                                icon={<Users className="h-5 w-5" />}
                                title="Find your people"
                                desc="Join EXPLICIT squads, collaborate on initiatives, and build genuine friendships across batches."
                            />
                            <ExperienceItem
                                icon={<Wrench className="h-5 w-5" />}
                                title="Build real skills"
                                desc="Hands‑on workshops and projects guided by EXPLICIT mentors and peers to level up fast."
                            />
                            <ExperienceItem
                                icon={<Lightbulb className="h-5 w-5" />}
                                title="Learn from practitioners"
                                desc="Tech talks and panels with alumni and industry guests—get insights you won’t find in class."
                            />
                            <ExperienceItem
                                icon={<Trophy className="h-5 w-5" />}
                                title="Ship and showcase"
                                desc="Test your ideas in EXPLICIT hackathons and competitions—and have fun while you’re at it."
                            />
                            <ExperienceItem
                                icon={<Calendar className="h-5 w-5" />}
                                title="Stay in the loop"
                                desc="General assemblies and updates keep you aligned with EXPLICIT programs and opportunities."
                            />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            <StatCard label="Past Events" value={totalEvents.toString()} />
                            <StatCard label="Years Covered" value={yearsCovered.toString()} />
                            <StatCard label="Unique Tags" value={uniqueTags.length.toString()} />
                        </div>

                        {/* Marquee */}
                        {uniqueTags.length > 0 && (
                            <div className="relative overflow-hidden rounded-md border bg-white/70 backdrop-blur">
                                <TagMarquee tags={uniqueTags} />
                            </div>
                        )}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
}

function FloatingCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={`absolute drop-shadow-xl ${className ?? ""}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
        >
            <div className="rounded-xl border bg-white">{children}</div>
        </motion.div>
    );
}

function FloatingBubble({
    Icon,
    label,
    className,
}: {
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    className?: string;
}) {
    return (
        <motion.div
            className={`absolute inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5 text-sm text-gray-800 backdrop-blur ${className ?? ""}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -2 }}
        >
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
        </motion.div>
    );
}

function ExperienceItem({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <motion.div
            className="group rounded-lg border bg-white/70 p-4 backdrop-blur transition-colors hover:bg-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
        >
            <div className="flex items-start gap-3">
                <div className="mt-1 rounded-md bg-primary/10 p-2 text-primary">{icon}</div>
                <div>
                    <div className="font-semibold text-gray-900">{title}</div>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <Card className="bg-white border-gray-200">
            <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{label}</div>
            </CardContent>
        </Card>
    );
}

function TagMarquee({ tags }: { tags: string[] }) {
    const row = [...tags];
    const speed = 30; // seconds per full cycle

    return (
        <div className="relative h-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
                className="absolute left-0 top-0 flex h-12 w-max items-center gap-3 pr-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            >
                {/* Duplicate the row twice to create a seamless loop */}
                <div className="flex items-center gap-3">
                    {row.map((t, i) => (
                        <Badge key={`${t}-${i}`} variant="secondary" className="whitespace-nowrap bg-gray-100 text-gray-700">
                            {t}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    {row.map((t, i) => (
                        <Badge key={`dup-${t}-${i}`} variant="secondary" className="whitespace-nowrap bg-gray-100 text-gray-700">
                            {t}
                        </Badge>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
