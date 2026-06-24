"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Link as LinkIcon, Sparkles } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

type FAQ = {
    id: string;
    q: string;
    a: string | JSX.Element;
    tags: string[];
};

const FAQS: FAQ[] = [
    {
        id: "what-is-explicit",
        q: "What is EXPLICIT?",
        a: (
            <span>
                EXPLICIT is a student organization focused on Communication & IT, hosting events, workshops, and community initiatives.
            </span>
        ),
        tags: ["about", "org", "mission"],
    },
    {
        id: "join-org",
        q: "How can I join the organization?",
        a: (
            <span>
                Any PUPSPC BSIT student can become a member. Watch for recruitment posts on the News page, visit our booth during events, or message us on our official Facebook page to get started.
            </span>
        ),
        tags: ["join", "membership", "students"],
    },
    {
        id: "events-info",
        q: "Where can I see upcoming events?",
        a: (
            <span>
                Check the Events page to see upcoming activities and highlights. Past events may also appear in Archives.
            </span>
        ),
        tags: ["events", "schedule", "activities"],
    },
    {
        id: "news-updates",
        q: "How do I get the latest updates?",
        a: (
            <span>
                For the latest updates, follow our official Facebook page and check the News page for announcements.
            </span>
        ),
        tags: ["news", "updates", "announcements"],
    },
    {
        id: "gallery-photos",
        q: "Do you have photos from previous events?",
        a: (
            <span>
                Yes. You can see photos from previous events on our Gallery page.
            </span>
        ),
        tags: ["gallery", "photos", "media"],
    },
    {
        id: "archives",
        q: "Where can I see awards and past achievements?",
        a: (
            <span>
                Explore Archives to discover awards, credits, and our journey over time.
            </span>
        ),
        tags: ["archives", "awards", "history"],
    },
    {
        id: "contact-officers",
        q: "How can I contact the officers?",
        a: (
            <span>
                You can contact us on our official Facebook page, or approach us during events. Basic info and links are also listed on the About page.
            </span>
        ),
        tags: ["contact", "officers", "about"],
    },
];

export function FaqFabSheetContent() {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return FAQS.filter((f) => {
            if (!q) return true;
            const hay = `${f.q} ${typeof f.a === "string" ? f.a : ""}`.toLowerCase();
            return hay.includes(q);
        });
    }, [query]);

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="relative mb-3 flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/10 ring-1 ring-primary/20">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: [0, 10, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <Image
                            src="/images/mascot.webp"
                            alt="EXPLICIT Mascot"
                            fill
                            sizes="40px"
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">Ask EXPLICIT</h2>
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quick answers and handy links. Try a keyword like “events” or “join”.
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="pl-9"
                    aria-label="Search FAQs"
                />
            </div>

            {/* Tags removed */}

            {/* Results */}
            <ScrollArea className="mt-4 h-[55vh] pr-4">
                {results.length === 0 ? (
                    <div className="rounded-md border p-4 text-sm text-muted-foreground">
                        No matches. Try different keywords.
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {results.map((f) => (
                            <AccordionItem value={f.id} key={f.id}>
                                <AccordionTrigger>
                                    <div className="text-left">
                                        <div className="font-medium">{f.q}</div>
                                        {/* Tag badges removed */}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="leading-relaxed text-muted-foreground">
                                        {f.a}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </ScrollArea>

            {/* Quick Links */}
            <div className="mt-4 rounded-lg border bg-muted/30 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <LinkIcon className="h-4 w-4" /> Quick links
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="secondary">
                        <Link href="/events">Events</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                        <Link href="/news">News</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                        <Link href="/gallery">Gallery</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                        <Link href="/archives">Archives</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                        <Link href="/about">About</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
