import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const events = [
  {
    title: 'Annual Tech Symposium',
    date: '2024-10-26',
    description: 'A full day of talks and workshops from industry leaders in technology.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'technology conference',
    tags: ['Tech', 'Workshop'],
  },
  {
    title: 'Career Fair Fall 2024',
    date: '2024-11-15',
    description: 'Connect with top companies and explore internship and full-time opportunities.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'career fair',
    tags: ['Career', 'Networking'],
  },
  {
    title: 'Art & Music Festival',
    date: '2024-11-22',
    description: 'An evening of live music, art exhibitions, and creative performances.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'music festival',
    tags: ['Arts', 'Social'],
  },
];

export function UpcomingEventsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Upcoming Events</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join us for our upcoming events. Don&apos;t miss out on these great opportunities.
                </p>
            </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
            {events.map((event) => (
                <Card key={event.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                    <Image 
                        src={event.image} 
                        alt={event.title} 
                        width={400}
                        height={250}
                        className="h-48 w-full object-cover"
                        data-ai-hint={event.aiHint}
                    />
                    <CardHeader>
                         <div className="flex space-x-2">
                            {event.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <CardTitle className="font-headline pt-2">{event.title}</CardTitle>
                        <p className="text-sm font-bold text-primary">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">{event.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button asChild className="w-full">
                            <Link href="/events">View Details</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
                <Link href="/events">
                    View All Events
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
