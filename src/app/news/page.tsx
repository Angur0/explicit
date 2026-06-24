export const dynamic = 'force-static';

export default function NewsRedirect() {
  const target = '/archives';
  return (
    <div className="container py-10">
      <p className="text-muted-foreground">This page moved to Archives.</p>
      <a className="underline" href={target}>Go to Archives</a>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
    </div>
  );
}
