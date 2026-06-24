"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import achievementsData from "@/data/achievements/featured.json";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import * as React from "react";

interface Achievement {
  event: string;
  title: string;
  image: string;
  aiHint: string;
}

interface AchievementsData {
  achievementsSection: {
    sectionTitle: string;
    sectionSubtitle: string;
    sectionDescription: string;
    buttonText: string;
    buttonLink: string;
    enabled: boolean;
    achievements: Achievement[];
  };
  editingInstructions?: Record<string, string>;
}

export function HomeAchievements() {
  const data: AchievementsData = achievementsData;
  const { achievementsSection } = data;

  // Don't render if section is disabled
  if (!achievementsSection || !achievementsSection.enabled) {
    return null;
  }

  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A1931] text-primary-foreground overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-lg font-medium text-primary-foreground/80">
              {achievementsSection.sectionSubtitle}
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white text-balance leading-tight break-words hyphens-auto">
              {achievementsSection.sectionTitle}
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              {achievementsSection.sectionDescription}
            </p>
          </motion.div>
          <motion.div
            className="mt-6 md:mt-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <Link href={achievementsSection.buttonLink}>
                {achievementsSection.buttonText}
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievementsSection.achievements.map((item, index) => (
            <AchievementCard key={index} item={item} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

type AchievementCardProps = {
  item: Achievement;
  index: number;
  progress: MotionValue<number>;
};

function AchievementCard({ item, index, progress }: AchievementCardProps) {
  const dir = index % 2 === 0 ? 1 : -1;
  const amplitude = 10 + (index % 3) * 4; // small variation per card
  const y = useTransform(progress, [0, 1], [dir * amplitude, -dir * amplitude]);

  return (
    <motion.div
      style={{ y, transformPerspective: 900 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#2C5784]/40 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 shadow-sm hover:shadow-lg"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover bg-gray-500/20 transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={item.aiHint}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <p className="text-sm text-primary-foreground/60">{item.event}</p>
          <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}
