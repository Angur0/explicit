import { loadNewsArticles } from '@/lib/search-loaders';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await loadNewsArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default function LegacyNewsArticleRedirect({ params }: { params: { slug: string } }) {
  const target = `/archives/${params.slug}`;
  return (
    <div className="container py-10">
      <p className="text-muted-foreground">Redirecting…</p>
      <a className="underline" href={target}>
        Click here if you are not redirected.
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
    </div>
  );
}
