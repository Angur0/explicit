"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Trophy, Star, Zap } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function EmbeddedFooter() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join EXPLICIT?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Connect with fellow students, participate in exciting events, and build your skills in a supportive community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Link href="/events">View Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function HomeCta() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [24, -12]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Background glow accents move slower for depth
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Connect with like-minded students and professionals"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Achievements",
      description: "Earn badges and recognition for your participation"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Growth",
      description: "Develop skills through workshops and events"
    },
    {
      icon: <Zap className="h-6 w-6" />,
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
          {features.map((feature, index) => {
            const dir = index % 2 === 0 ? 1 : -1;
            const y = useTransform(scrollYProgress, [0, 1], [dir * 18, -dir * 18]);
            return (
              <motion.div
                key={index}
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
                      {feature.icon}
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
          })}
        </div>
      </div>
    </section>
  );
}
