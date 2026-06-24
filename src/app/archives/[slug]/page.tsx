import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { loadNewsArticles, type NewsArticle } from '@/lib/search-loaders';

// Ensure no params other than those returned by generateStaticParams are allowed at runtime
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    const articles = await loadNewsArticles();
    return articles.map((article) => ({ slug: article.slug }));
}
export default async function ArchiveArticlePage({ params }: { params: { slug: string } }) {
    const articles: NewsArticle[] = await loadNewsArticles();
    const article = articles.find((a) => a.slug === params.slug) as (NewsArticle & { image?: string; aiHint?: string; content?: string }) | undefined;

    if (!article) {
        notFound();
    }

    return (
        <div className="container py-12 md:py-24">
            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <Button asChild variant="ghost" className="mb-4 pl-0">
                        <Link href="/archives">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Archives
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{article.title}</h1>
                    <CardDescription>
                        Posted on {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} by {article.author}
                    </CardDescription>
                </header>

                <Image
                    src={article.image || '/images/logo_explicit.webp'}
                    alt={article.title}
                    width={1200}
                    height={600}
                    className="w-full rounded-lg aspect-video object-cover mb-8"
                    data-ai-hint={article.aiHint}
                />

                <div
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />
            </article>
        </div>
    );
}
