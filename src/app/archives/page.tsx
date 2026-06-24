"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// Removed AnimatedSection to disable animations on this page

import awardsData from '@/data/archives/awards.json';
import creditsData from '@/data/archives/credits.json';
import allArticles from '@/data/news/articles.json';
import achievementsFeatured from '@/data/achievements/featured.json';
import achievementsTimeline from '@/data/achievements/timeline.json';
import { officerBatches as allOfficerBatches } from '@/data/officers';

type Award = {
    year: string;
    title: string;
    recipient: { name: string; role?: string; image?: string };
    description?: string;
    image?: string;
    aiHint?: string;
};

export default function ArchivesPage() {
    const awards: Award[] = awardsData.awards || [];
    const achievements = achievementsFeatured.achievementsSection?.achievements ?? [];
    const timeline = (achievementsTimeline.years ?? []) as { year: string; items: { title: string; date?: string; description?: string; links?: { label: string; url: string }[] }[] }[];

    // Group awards by year for Hall of Fame
    const awardsByYear = awards.reduce((acc, a) => {
        (acc[a.year] ??= []).push(a);
        return acc;
    }, {} as Record<string, Award[]>);
    const hofYears = Object.keys(awardsByYear).sort((a, b) => b.localeCompare(a));

    const sections = [
        { id: 'hall-of-fame', label: 'Hall of Fame' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'past-officers', label: 'Past Officers' },
        { id: 'news', label: 'News' },
        { id: 'credits', label: 'Credits' },
    ] as const;

    const [active, setActive] = useState<(typeof sections)[number]['id']>('hall-of-fame');

    // Initialize from URL hash (e.g., /archives#credits)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const hash = window.location.hash?.replace('#', '');
        if (hash && sections.some(s => s.id === hash)) {
            setActive(hash as (typeof sections)[number]['id']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep URL hash in sync with active section without scrolling
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const newHash = `#${active}`;
        if (window.location.hash !== newHash) {
            history.replaceState(null, '', newHash);
        }
    }, [active]);

    // Keep officer batches up-to-date with the latest data
    const officerBatches = allOfficerBatches;
    const batchesToShow = (allOfficerBatches || []).filter(b => Array.isArray(b.items) && b.items.length > 0);
    const latestBatch = batchesToShow[0];
    const [selectedYear, setSelectedYear] = useState<string>(latestBatch?.label ?? '');
    const currentBatch = batchesToShow.find((b) => b.label === selectedYear) ?? latestBatch;
    const currentItems = (currentBatch?.items ?? []).filter((o: any) => o?.name && o?.position);

    return (
        <div className="container py-12 md:py-20">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-transparent to-background p-8 md:p-12 mb-8">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline">Archives</h1>
                    <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
                        A living record of excellence—awards, achievements, past officers, stories, and the people behind this site.
                    </p>
                </div>
            </div>

            {/* Mobile nav (small screens) */}
            <div className="md:hidden -mt-2 mb-6 overflow-x-auto">
                <div className="flex gap-2">
                    {sections.map((s) => (
                        <Button key={s.id} size="sm" variant={active === s.id ? 'secondary' : 'outline'} onClick={() => setActive(s.id)}>
                            {s.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content with left menu */}
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[220px_1fr]">
                <aside className="hidden md:block sticky top-24 h-fit">
                    <nav className="flex flex-col gap-2">
                        {sections.map((s) => (
                            <Button
                                key={s.id}
                                variant={active === s.id ? 'secondary' : 'ghost'}
                                className="justify-start"
                                onClick={() => setActive(s.id)}
                            >
                                {s.label}
                            </Button>
                        ))}
                    </nav>
                </aside>
                <div className="space-y-14">

                    {active === 'hall-of-fame' && (
                        <section className="max-w-6xl mx-auto" id="hall-of-fame">
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-headline font-semibold">Hall of Fame</h2>
                                <p className="text-muted-foreground">Recognizing standout members, officers, and teams.</p>
                            </div>

                            {hofYears.length === 0 && (
                                <p className="text-muted-foreground">No awards yet. Add entries in <code>src/data/archives/awards.json</code>.</p>
                            )}

                            <div className="space-y-10">
                                {hofYears.map((year) => (
                                    <div key={year}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <h3 className="text-xl md:text-2xl font-semibold font-headline">{year}</h3>
                                            <div className="h-px flex-1 bg-border" />
                                        </div>
                                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                            {awardsByYear[year].map((a, idx) => {
                                                const imgSrc = a.recipient?.image && a.recipient.image.trim() !== ''
                                                    ? a.recipient.image
                                                    : '/images/logo_explicit.webp';
                                                const initials = a.recipient?.name
                                                    ?.split(' ')
                                                    .map((n) => n[0])
                                                    .slice(0, 2)
                                                    .join('');
                                                return (
                                                    <li key={`${year}-${idx}`} className="text-center">
                                                        <div className="mx-auto w-fit">
                                                            <div className="relative">
                                                                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-cyan-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition" aria-hidden />
                                                                <Avatar className="h-28 w-28 ring-4 ring-primary/30 shadow-xl">
                                                                    <AvatarImage src={imgSrc} alt={a.recipient?.name || a.title} />
                                                                    <AvatarFallback>{initials || 'EX'}</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 space-y-1">
                                                            <div className="text-xl font-semibold font-headline leading-tight">{a.recipient?.name}</div>
                                                            {a.recipient?.role && (
                                                                <div className="text-sm text-muted-foreground">{a.recipient.role}</div>
                                                            )}
                                                            <div className="mt-2">
                                                                <Badge variant="secondary" className="rounded-full">{a.title}</Badge>
                                                            </div>
                                                            {a.description && (
                                                                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{a.description}</p>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {active === 'achievements' && (
                        <section className="max-w-6xl mx-auto mt-14" id="achievements">
                            <div className="mb-4">
                                <h2 className="text-2xl md:text-3xl font-headline font-semibold">Achievements</h2>
                                <p className="text-muted-foreground">Milestones through the years.</p>
                            </div>
                            <div className="space-y-10">
                                {timeline.length === 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="font-headline">Achievements Timeline</CardTitle>
                                            <CardDescription>No timeline data yet. Add entries in <code>src/data/achievements/timeline.json</code>.</CardDescription>
                                        </CardHeader>
                                    </Card>
                                )}

                                {timeline.map((group) => (
                                    <div key={group.year}>
                                        <h3 className="text-xl font-semibold mb-4">{group.year}</h3>
                                        <ol className="relative border-l border-muted-foreground/20 pl-6 space-y-6">
                                            {group.items.map((item, idx) => (
                                                <li key={idx} className="ml-2">
                                                    <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" aria-hidden />
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <AchievementDialog title={item.title} date={item.date} description={item.description} links={item.links} />
                                                            {item.date && (
                                                                <div className="text-xs text-muted-foreground mt-1">
                                                                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {active === 'past-officers' && (
                        <section className="max-w-6xl mx-auto mt-10" id="past-officers">
                            <Card className="shadow-none border border-dashed">
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-headline font-semibold">Officers</h2>
                                            <p className="text-muted-foreground text-sm">Browse by academic year.</p>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2 text-sm">
                                            <label htmlFor="yearFilter" className="text-muted-foreground">Year:</label>
                                            <select
                                                id="yearFilter"
                                                className="h-9 rounded-md border bg-background px-2"
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(e.target.value)}
                                            >
                                                {batchesToShow.map((b) => (
                                                    <option key={b.label} value={b.label}>{b.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {latestBatch ? (
                                        <ul className="space-y-1.5">
                                            {currentItems.map((o: any, i: number) => (
                                                <li key={`${currentBatch?.label}-${i}`} className="px-2 py-1.5">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="secondary" className="shrink-0">{o.position}</Badge>
                                                        <span className="font-medium leading-relaxed">{o.name}</span>
                                                    </div>
                                                </li>
                                            ))}
                                            {currentItems.length === 0 && (
                                                <li className="text-sm text-muted-foreground px-2 py-1.5">No officers match this filter.</li>
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No officer records found. Add files in <code>src/data/officers</code> and export them in <code>src/data/officers/index.ts</code>.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </section>
                    )}

                    {active === 'news' && (
                        <section className="max-w-6xl mx-auto mt-14" id="news">
                            <div className="mb-4">
                                <h2 className="text-2xl md:text-3xl font-headline font-semibold">News</h2>
                                <p className="text-muted-foreground">Stories, updates, and announcements.</p>
                            </div>
                            <div className="grid gap-8 max-w-4xl">
                                {allArticles.map((article) => (
                                    <Card key={article.slug} className="w-full">
                                        <CardHeader>
                                            <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                                            <CardDescription>
                                                Posted on {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} by {article.author}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{article.excerpt}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild variant="link" className="p-0">
                                                <Link href={`/archives/${article.slug}`}>
                                                    Read More
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {active === 'credits' && (
                        <section className="max-w-6xl mx-auto mt-14" id="credits">
                            <div className="mb-4">
                                <h2 className="text-2xl md:text-3xl font-headline font-semibold">Credits</h2>
                                <p className="text-muted-foreground">The people behind the website.</p>
                            </div>
                            <div className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">Creator</CardTitle>
                                        <CardDescription>Original author and developer</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14">
                                            <AvatarImage src={creditsData.creator.image} alt={creditsData.creator.name} />
                                            <AvatarFallback>{creditsData.creator.name.split(' ')[0]?.[0]}{creditsData.creator.name.split(' ')[1]?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{creditsData.creator.name}</div>
                                            <div className="text-sm text-muted-foreground">{creditsData.creator.role}</div>
                                            <div className="mt-1 flex flex-wrap gap-2 text-sm">
                                                {creditsData.creator.links?.map((l: any, i: number) => (
                                                    <Button key={i} asChild size="sm" variant="link" className="h-auto p-0">
                                                        <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">Contributors</CardTitle>
                                        <CardDescription>Design, content, and code collaborators</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {creditsData.contributors?.map((p: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={p.image} alt={p.name} />
                                                        <AvatarFallback>{p.name.split(' ')[0]?.[0]}{p.name.split(' ')[1]?.[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{p.name}</div>
                                                        <div className="text-sm text-muted-foreground">{p.role}</div>
                                                        <div className="mt-1 flex flex-wrap gap-2 text-sm">
                                                            {p.links?.map((l: any, i: number) => (
                                                                <Button key={i} asChild size="sm" variant="link" className="h-auto p-0">
                                                                    <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">Maintainers</CardTitle>
                                        <CardDescription>Students or officers who will maintain the site</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {creditsData.futureMaintainers?.map((p: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={p.image} alt={p.name} />
                                                        <AvatarFallback>{p.name.split(' ')[0]?.[0]}{p.name.split(' ')[1]?.[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{p.name}</div>
                                                        <div className="text-sm text-muted-foreground">{p.role}</div>
                                                        <div className="mt-1 flex flex-wrap gap-2 text-sm">
                                                            {p.links?.map((l: any, i: number) => (
                                                                <Button key={i} asChild size="sm" variant="link" className="h-auto p-0">
                                                                    <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

function AchievementDialog({ title, date, description, links }: { title: string; date?: string; description?: string; links?: { label: string; url: string }[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-left font-medium underline underline-offset-4 hover:text-primary focus:outline-none">
                    {title}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {date && (
                        <DialogDescription>
                            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
                {links && links.length > 0 && (
                    <div className="mt-4 space-x-3">
                        {links.map((l, i) => (
                            <Button key={i} asChild variant="link" className="h-auto p-0">
                                <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                            </Button>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
