"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, Star, Zap } from "lucide-react";
import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function HomeCta() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [24, -12]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const features: Feature[] = [
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded students and professionals"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Earn badges and recognition for your participation"
    },
    {
      icon: Star,
      title: "Growth",
      description: "Develop skills through workshops and events"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Stay ahead with cutting-edge technology insights"
    }
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 bg-gray-50 dark:bg-[#0F172A]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl font-extrabold tracking-tight font-headline text-slate-900 dark:text-white mb-4"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            Why Choose <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">EXPLICIT?</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            style={{ y: subtitleY, opacity: subtitleOpacity }}
          >
            Join a community that values innovation, collaboration, and continuous learning.
            Discover opportunities that will shape your future in technology.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  feature: Feature;
  index: number;
  scrollYProgress: MotionValue<number>;
};

function FeatureCard({ feature, index, scrollYProgress }: FeatureCardProps) {
  const dir = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [dir * 18, -dir * 18]);
  const Icon = feature.icon;

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.06, 0.4) }}
      whileHover={{ y: dir * -2, scale: 1.02 }}
      className="will-change-transform"
    >
      <Card className="text-center bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-headline">
            {feature.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
