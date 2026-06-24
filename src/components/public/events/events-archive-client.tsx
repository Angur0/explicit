"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
    title: string;
    date: string; // ISO string
    description: string;
    image: string;
    aiHint: string;
    tags: string[];
    status: string;
    attendees?: number;
};

interface EventsArchiveProps {
    events: Event[];
}

export default function EventsArchive({ events }: EventsArchiveProps) {
    const [query, setQuery] = useState("");
    const [year, setYear] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    const pastEvents = useMemo(() => {
        return events.filter((e) => e.status?.toLowerCase() === "past");
    }, [events]);

    const years = useMemo(() => {
        const set = new Set<string>();
        pastEvents.forEach((e) => set.add(new Date(e.date).getFullYear().toString()));
        return Array.from(set).sort((a, b) => Number(b) - Number(a));
    }, [pastEvents]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return pastEvents
            .filter((e) => (year === "all" ? true : new Date(e.date).getFullYear().toString() === year))
            .filter((e) => {
                if (!q) return true;
                const hay = [
                    e.title,
                    e.description,
                    ...(Array.isArray(e.tags) ? e.tags : []),
                ]
                    .join(" ")
                    .toLowerCase();
                return hay.includes(q);
            })
            .sort((a, b) => {
                const delta = Number(new Date(b.date)) - Number(new Date(a.date));
                return sortOrder === "desc" ? delta : -delta;
            });
    }, [pastEvents, query, year, sortOrder]);

    // Clamp or reset page when filters change or when page size changes
    const totalPages = useMemo(() => Math.max(1, Math.ceil(filtered.length / pageSize)), [filtered.length, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [query, year, sortOrder, pageSize]);

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return filtered.slice(start, end);
    }, [filtered, page, pageSize]);

    return (
        <section className="container py-12 md:py-20">
            <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-gray-900">Events Archive</h1>
                <p className="text-gray-600 md:text-lg mt-2">Browse our past events. Filter by year and search by title, tags, or description.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
                <div className="w-full md:max-w-sm">
                    <Input
                        placeholder="Search events…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search events"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="w-40">
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger aria-label="Filter by year">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All years</SelectItem>
                                {years.map((y) => (
                                    <SelectItem key={y} value={y}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-44">
                        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                            <SelectTrigger aria-label="Sort order">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="desc">Newest first</SelectItem>
                                <SelectItem value="asc">Oldest first</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-36">
                        <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                            <SelectTrigger aria-label="Page size">
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="9">9 / page</SelectItem>
                                <SelectItem value="12">12 / page</SelectItem>
                                <SelectItem value="24">24 / page</SelectItem>
                                <SelectItem value="48">48 / page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-sm text-gray-600">
                        {filtered.length === 0
                            ? "0 results"
                            : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} of ${filtered.length}`}
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center text-gray-600 py-16">No events found.</div>
            ) : (
                <div className="space-y-8">
                    <CardsGrid events={paginated} />

                    {/* Pagination Controls */}
                    <nav className="flex items-center justify-between" aria-label="Pagination">
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </nav>
                </div>
            )}
        </section>
    );
}

function CardsGrid({ events }: { events: Event[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <Card key={`${event.title}-${event.date}`} className="flex flex-col overflow-hidden bg-white border-gray-200">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="h-40 md:h-44 w-full object-cover"
                        data-ai-hint={event.aiHint}
                    />
                    <CardHeader className="p-4 pb-0">
                        <div className="flex flex-wrap gap-2">
                            {event.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <CardTitle className="font-headline pt-2 text-gray-900 text-lg">{event.title}</CardTitle>
                        <div className="font-semibold text-primary text-xs md:text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-3">
                        <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                        {Array.isArray(event.tags) && event.tags.length > 0 ? (
                            <p className="text-xs text-gray-500 mt-2" aria-label="Event tags">
                                {event.tags.join(', ')}
                            </p>
                        ) : null}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// YearSectionedGrid removed in favor of consistent pagination for performance on large datasets.
