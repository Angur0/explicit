import Image from 'next/image';

const photos = [
    { src: 'https://placehold.co/600x400.png', alt: 'Event photo 1', hint: 'students conference' },
    { src: 'https://placehold.co/600x400.png', alt: 'Event photo 2', hint: 'group discussion' },
    { src: 'https://placehold.co/600x400.png', alt: 'Event photo 3', hint: 'guest speaker presentation' },
];

export function FeaturedPhotos() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Moments We've Shared</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        A glimpse into our vibrant community and memorable events.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {photos.map((photo, index) => (
                    <div key={index} className="overflow-hidden rounded-lg group">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={600}
                            height={400}
                            data-ai-hint={photo.hint}
                            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
