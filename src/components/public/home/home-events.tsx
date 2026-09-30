"use client";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import * as React from "react";
import eventHighlightsData from "@/data/events/featured.json";

interface EventHighlight {
  title: string;
  description: string;
  dialogContent?: string;
  image: string;
  aiHint: string;
  frequency: string;
}

interface EventHighlightsData {
  eventHighlights: {
    sectionTitle: string;
    sectionDescription: string;
    highlights: EventHighlight[];
    enabled: boolean;
  };
  editingInstructions?: Record<string, string>;
}

export default function HomeEvents() {
  const data: EventHighlightsData = eventHighlightsData;
  const { eventHighlights } = data;
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const [active, setActive] = React.useState<EventHighlight | null>(null);

  // Don't render if section is disabled
  if (!eventHighlights || !eventHighlights.enabled) {
    return null;
  }

  return (
    <section id="events" ref={sectionRef} className="py-32 md:py-40 bg-slate-50 dark:bg-[#0F172A] relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-extrabold tracking-tight font-headline text-slate-900 dark:text-white mb-4">
            {eventHighlights.sectionTitle.split(' ').map((word, index) =>
              index === eventHighlights.sectionTitle.split(' ').length - 1 ? (
                <span key={index} className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word + ' '
              )
            )}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {eventHighlights.sectionDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {eventHighlights.highlights.map((highlight, index) => (
            <EventCard
              key={index}
              highlight={highlight}
              index={index}
              progress={scrollYProgress}
              onClick={() => setActive(highlight)}
            />
          ))}
        </div>
      </div>

      {/* Dialog (plain white) */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-5xl p-0 border border-slate-200 bg-white dark:bg-white overflow-hidden">
          {active && (
            <div className="relative grid md:grid-cols-2 min-h-[60vh]">
              {/* No decorative accents for plain white dialog */}

              {/* Left: image with subtle parallax */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative h-56 md:h-full"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                </motion.div>
              </div>

              {/* Right: content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="p-6 md:p-8 text-slate-900 dark:text-slate-900"
              >
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl md:text-3xl text-slate-900 dark:text-slate-900">
                    {active.title}
                  </DialogTitle>
                  <div className="mt-3 flex items-center gap-2">
                    {active.frequency && (
                      <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200">
                        {active.frequency}
                      </Badge>
                    )}
                  </div>
                  {(active.dialogContent || active.description) && (
                    <DialogDescription className="mt-4 text-slate-700 dark:text-slate-700 whitespace-pre-line">
                      {active.dialogContent || active.description}
                    </DialogDescription>
                  )}
                </DialogHeader>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-white">
                    <Link href="/events">Explore Events</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

type EventCardProps = {
  highlight: EventHighlight;
  index: number;
  progress: MotionValue<number>;
  onClick?: () => void;
};

function EventCard({ highlight, index, progress, onClick }: EventCardProps) {
  // Alternate small vertical parallax per card
  const dir = (index % 2 === 0) ? 1 : -1;
  const amplitude = 10 + (index % 3) * 4; // vary slightly
  const y = useTransform(progress, [0, 1], [dir * amplitude, -dir * amplitude]);

  // Hover tilt
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 6;
    setTilt({ rx, ry });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      style={{ y, rotateX: tilt.rx, rotateY: tilt.ry, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="rounded-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.06, 0.4) }}
    >
      <button
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group w-full text-left rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-[#111827] shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-56 md:h-64">
          <Image
            src={highlight.image}
            alt={highlight.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={highlight.aiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/20 rounded-2xl pointer-events-none" />
        </div>

        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-headline">
            {highlight.title}
          </CardTitle>

          <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-5 line-clamp-3">
            {highlight.description}
          </CardDescription>

          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200">
            {highlight.frequency}
          </Badge>
        </CardContent>
      </button>
    </motion.div>
  );
}
