import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const articles = [
    { title: 'Tech Symposium Recap', date: '2024-10-28', author: 'Jane Doe', excerpt: 'Our annual Tech Symposium was a huge success, with over 150 attendees and guest speakers from top tech companies...' },
    { title: 'Upcoming Career Fair Details', date: '2024-10-25', author: 'John Smith', excerpt: 'Get your resumes ready! The Fall 2024 Career Fair is just around the corner, featuring over 50 companies...' },
    { title: 'Member Spotlight: Emily Carter', date: '2024-10-22', author: 'Jane Doe', excerpt: 'This month, we are proud to feature Emily Carter, a 3rd year Computer Science student who recently won...' },
];

export function LatestNewsSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Latest Updates</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Stay up to date with the latest announcements and stories from our organization.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-3 mt-8">
                    {articles.map((article) => (
                        <Card key={article.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline">{article.title}</CardTitle>
                                <CardDescription>
                                    {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} by {article.author}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button asChild variant="link" className="p-0">
                                    <Link href="/archives">
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Button variant="outline" asChild>
                        <Link href="/archives">
                            View Archives
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
