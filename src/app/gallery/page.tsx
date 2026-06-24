import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const galleryImages = [
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 1', aiHint: 'students event' },
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 2', aiHint: 'tech conference' },
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 3', aiHint: 'hackathon event' },
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 4', aiHint: 'group of students' },
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 5', aiHint: 'networking event' },
  { src: 'https://placehold.co/600x400.png', alt: 'Event photo 6', aiHint: 'student presentation' },
];

export default function GalleryPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Gallery</h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          A glimpse into our community, events, and activities.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden group">
            <CardContent className="p-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.aiHint}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
