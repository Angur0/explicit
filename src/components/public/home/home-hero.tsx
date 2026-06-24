"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion } from "framer-motion";
import { getVariant, transitionSpringSoft } from "@/lib/motion";
import carouselImagesData from "@/data/carousel/images.json";

interface CarouselImage {
  src: string;
  alt: string;
  aiHint: string;
}

// Entrance animations removed — component renders statically

export function HomeHero() {
  const carouselImages = carouselImagesData.carouselImages;

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <>
      {/* Desktop / Large screens hero */}
      <div className="hidden md:flex relative isolate text-white min-h-[calc(100svh-var(--header-height))] items-center py-0">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/bg_hero.webp"
            alt="Hero background"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 items-center gap-8 md:gap-12 px-4">
          {/* Left Column: Text Content */}
          <motion.div
            className="max-w-2xl text-left"
            variants={getVariant("stagger", { stagger: 0.12 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <motion.h1
              className="mt-4 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight md:leading-[0.9]"
              variants={getVariant("fadeInUp", { distance: 24, transition: transitionSpringSoft })}
            >
              Welcome,{" "}
              <span
                className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                EXPLORERS!
              </span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-3 drop-shadow-lg"
              variants={getVariant("fadeInUp", { distance: 20, transition: transitionSpringSoft })}
            >
              HOME OF THE ORIGINAL CHAMPIONS
            </motion.p>

            <motion.p
              className="mt-6 md:mt-8 text-base md:text-xl leading-relaxed text-white/95 font-medium drop-shadow-lg max-w-prose md:max-w-lg"
              variants={getVariant("fadeInUp", { distance: 16, transition: transitionSpringSoft })}
            >
              Join the premier organization for Explorers in Communication And
              Information Technology students at PUP. Connect, learn, and grow
              with us.
            </motion.p>
          </motion.div>

          {/* Right Column: Carousel */}
          {carouselImages.length > 0 && (
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              variants={getVariant("fadeInUp", { distance: 24, transition: transitionSpringSoft })}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute -left-6 h-full w-px bg-white/10" />
              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl shadow-2xl border border-white/10">
                <Carousel
                  className="w-full max-w-[500px]"
                  plugins={[plugin.current]}
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {carouselImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div>
                          <Card className="overflow-hidden bg-transparent border-none">
                            <CardContent className="p-0">
                              <img
                                src={image.src}
                                alt={image.alt}
                                width={500}
                                height={500}
                                loading="lazy"
                                decoding="async"
                                className="w-[500px] h-[500px] object-cover aspect-square"
                                data-ai-hint={image.aiHint}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scrolling Bar: hidden on mobile; absolute on md+ */}
        <div className="hidden md:block md:absolute md:bottom-0 md:left-0 md:right-0 bg-black/20 backdrop-blur-sm border-t border-white/10 mt-6 md:mt-0">
          <div className="overflow-hidden py-3">
            <div className="flex whitespace-nowrap animate-scroll will-change-transform">
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🎓 Welcome to EXPLICIT - Home of the Original Champions
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🚀 Join our upcoming events and workshops
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                💻 Connect with fellow tech enthusiasts
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🏆 Discover opportunities for growth and learning
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🌟 Become part of our amazing community
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🎓 Welcome to EXPLICIT - Home of the Original Champions
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🚀 Join our upcoming events and workshops
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                💻 Connect with fellow tech enthusiasts
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🏆 Discover opportunities for growth and learning
              </span>
              <span className="text-white/90 font-medium tracking-wide mr-8">
                🌟 Become part of our amazing community
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
