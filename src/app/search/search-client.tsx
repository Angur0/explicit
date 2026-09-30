"use client";

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type PageIndex = {
    kind: 'page';
    title: string;
    url: string;
    description?: string;
    keywords?: string[];
};

type SectionIndex = {
    kind: 'section';
    title: string;
    url: string;
    description?: string;
    keywords?: string[];
};

type Article = {
    slug: string;
    title: string;
    date: string;
    author?: string;
    excerpt?: string;
    content?: string;
};

type Event = {
    title: string;
    date?: string;
    description?: string;
    tags?: string[];
};

type Officer = {
    name: string;
    position: string;
    batch?: string;
};

type Achievement = {
    title: string;
    context?: string;
    year?: number | string;
};

type SearchIndex = {
    pages: PageIndex[];
    sections: SectionIndex[];
    news: Article[];
    events: Event[];
    officers: Officer[];
    achievements: Achievement[];
};

function normalize(s: string | undefined) {
    return (s || '').toString().toLowerCase();
}

function includes(text: string | undefined, q: string | undefined) {
    const hay = normalize(text);
    const needle = normalize(q);
    if (!needle) return false;
    return hay.includes(needle);
}

export function SearchClient() {
    const searchParams = useSearchParams();
    const q = (searchParams.get('q') || '').trim();

    const [index, setIndex] = React.useState<SearchIndex | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let ignore = false;
        async function run() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/search-index.json`, { cache: 'no-store' });
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const json = (await res.json()) as SearchIndex;
                if (!ignore) setIndex(json);
            } catch (e: unknown) {
                if (!ignore) setError(e instanceof Error ? e.message : 'Failed to search');
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        run();
        return () => {
            ignore = true;
        };
    }, [q]);

    if (!q) {
        return (
            <div className="container py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Search</CardTitle>
                            <CardDescription>Enter a query in the header to find news, events, and more.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container py-12 md:py-20">
                <p className="text-muted-foreground">Searching for “{q}”…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-12 md:py-20">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Something went wrong</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    // Compute filtered results
    const pagesResults = (index?.pages || []).filter(
        (p) => includes(p.title, q) || includes(p.description, q) || (p.keywords || []).some((k) => includes(k, q))
    );
    const sectionsResults = (index?.sections || []).filter(
        (s) => includes(s.title, q) || includes(s.description, q) || (s.keywords || []).some((k) => includes(k, q))
    );
    const newsResults = (index?.news || []).filter(
        (a) => includes(a.title, q) || includes(a.excerpt, q) || includes(a.content, q) || includes(a.author, q)
    );
    const eventsResults = (index?.events || []).filter(
        (e) => includes(e.title, q) || includes(e.description, q) || (e.tags || []).some((t) => includes(t, q))
    );
    const officersResults = (index?.officers || []).filter(
        (o) => includes(o.name, q) || includes(o.position, q)
    );
    const achievementsResults = (index?.achievements || []).filter(
        (a) => includes(a.title, q) || includes(a.context, q)
    );

    const total =
        newsResults.length +
        eventsResults.length +
        officersResults.length +
        achievementsResults.length +
        pagesResults.length +
        sectionsResults.length;

    return (
        <div className="container py-12 md:py-20">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Search Results</h1>
                <p className="text-muted-foreground mt-2">{total} result{total === 1 ? '' : 's'} for &quot;{q}&quot;</p>
            </div>

            {total === 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">No results</CardTitle>
                        <CardDescription>Try different keywords or check spelling.</CardDescription>
                    </CardHeader>
                </Card>
            )}

            {(pagesResults.length + sectionsResults.length) > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold font-headline mb-4">Pages & Sections</h2>
                    <ul className="space-y-3">
                        {[...pagesResults, ...sectionsResults].map((item, idx) => (
                            <li key={`p-${idx}`} className="rounded-lg border p-4 hover:bg-accent/10 transition-colors">
                                <Link href={item.url} className="block">
                                    <div className="text-lg font-medium">{item.title}</div>
                                    {item.description && (
                                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {(newsResults.length) > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold font-headline mb-4">News</h2>
                    <ul className="space-y-4">
                        {newsResults.map((a) => (
                            <li key={a.slug} className="rounded-lg border p-4 hover:bg-accent/10 transition-colors">
                                <Link href={`/archives/${a.slug}`} className="block">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-lg font-medium">{a.title}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                {a.author ? ` • by ${a.author}` : ''}
                                            </div>
                                        </div>
                                    </div>
                                    {a.excerpt && (
                                        <p className="mt-2 text-muted-foreground line-clamp-2">{a.excerpt}</p>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {(eventsResults.length) > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold font-headline mb-4">Events</h2>
                    <ul className="space-y-4">
                        {eventsResults.map((e, idx) => (
                            <li key={`${e.title}-${idx}`} className="rounded-lg border p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-lg font-medium">{e.title}</div>
                                        {e.date && (
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(e.date as string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(e.tags || []).map((t: string) => (
                                            <Badge key={t} variant="secondary">{t}</Badge>
                                        ))}
                                    </div>
                                </div>
                                {e.description && <p className="mt-2 text-muted-foreground">{e.description}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {(officersResults.length) > 0 && (
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold font-headline mb-4">Officers</h2>
                    <ul className="space-y-2">
                        {officersResults.map((o, i) => (
                            <li key={`off-${i}`} className="rounded-md border p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary" className="shrink-0">{o.position}</Badge>
                                    <span className="font-medium">{o.name}</span>
                                    {o.batch && (
                                        <span className="text-xs text-muted-foreground">({o.batch})</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {(achievementsResults.length) > 0 && (
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold font-headline mb-4">Achievements</h2>
                    <ul className="space-y-2">
                        {achievementsResults.map((a, i) => (
                            <li key={`ach-${i}`} className="rounded-md border p-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                    <span className="font-medium">{a.title}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {a.context ? a.context : a.year ? `Year ${a.year}` : ''}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
