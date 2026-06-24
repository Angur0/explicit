"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import featuredPhotosData from "@/data/photos/featured.json";
import Image from "next/image";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

interface Photo {
  src: string;
  alt: string;
  aiHint: string;
}

export function HomeFeaturedPhotos() {
  const photos: Photo[] = featuredPhotosData.photos ?? [];

  if (!photos.length) return null;

  const [active, setActive] = React.useState<Photo | null>(null);

  return (
    <section className="relative pt-12 md:pt-24 pb-24 md:pb-36 overflow-hidden">
      <div className="container">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Featured Photos
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            A glimpse into our vibrant community, memorable events, and member activities.
          </p>
        </motion.div>

        {/* Responsive carousel with arrows and dots on all screens */}
        <div className="relative mt-12">
          <Carousel className="px-2" opts={{ align: "start", containScroll: "trimSnaps" }}>
            <CarouselContent>
              {photos.map((p, i) => (
                <CarouselItem
                  key={`${p.src}-${i}`}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.button
                    type="button"
                    onClick={() => setActive(p)}
                    className="group relative inline-block w-full overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200/50 dark:ring-white/10 bg-slate-100 dark:bg-slate-800/40"
                    aria-label={`Open photo: ${p.alt}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        data-ai-hint={p.aiHint}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                  </motion.button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-4" aria-label="Previous photo" />
            <CarouselNext className="-right-2 sm:-right-4" aria-label="Next photo" />
            <CarouselDots className="mt-4" />
          </Carousel>
        </div>

        {/* Lightbox */}
        <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
          <DialogContent className="max-w-4xl p-0 border border-slate-200 bg-white dark:bg-[#0B1220] overflow-hidden">
            {active && (
              <div className="relative w-full h-[60vh]">
                <Image src={active.src} alt={active.alt} fill className="object-contain bg-black/5 dark:bg-white/5" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 bg-gradient-to-t from-black/50 to-transparent">
                  {active.alt}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/archives">View Archives</Link>
          </Button>
        </div>
      </div>

      {/* Wave separator into CTA (matches CTA background colors) */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full h-24 md:h-32 text-gray-50 dark:text-[#0F172A] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.12)]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,120 C240,200 480,60 720,120 C960,180 1200,140 1440,180 L1440,200 L0,200 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
