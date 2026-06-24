"use client";
import Image from "next/image";
import officerBatches from "@/data/officers";
import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselDots,
} from "@/components/ui/carousel";

type Officer = {
    name: string;
    position: string;
    image: string;
};

export function HomeOfficers() {
    const latest = officerBatches[0];
    const list = latest.items as Officer[];
    if (list.length === 0) return null;

    return (
        <section className="py-12 md:py-24 bg-background">
            <div className="container">
                <motion.div
                    className="space-y-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                        Current Officers
                    </h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                        Meet the officers serving the {latest.label} academic year.
                    </p>
                </motion.div>

                {/* Single-row, paginated carousel (responsive for mobile and desktop) */}
                <div className="relative mt-12">
                    <Carousel
                        className="px-6"
                        opts={{ align: "start", skipSnaps: false, containScroll: "trimSnaps" }}
                    >
                        <CarouselContent>
                            {list.map((o, index) => (
                                <CarouselItem
                                    // Show 2 on small screens, 3 on sm, 5 on lg+ in a single row
                                    className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
                                    key={`${o.name}-${o.position}`}
                                >
                                    <motion.div
                                        className="group"
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.04, 0.3) }}
                                    >
                                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-slate-200/60 dark:ring-white/10 bg-slate-100 dark:bg-slate-800/40">
                                            <Image
                                                src={o.image}
                                                alt={`${o.name} — ${o.position}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                                            />
                                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent h-1/3" />
                                        </div>
                                        <div className="mt-3 text-center">
                                            <p className="font-medium leading-tight text-slate-900 dark:text-white">
                                                {o.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{o.position}</p>
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {/* Navigation arrows */}
                        <CarouselPrevious className="-left-2 sm:-left-4" aria-label="Previous officers" />
                        <CarouselNext className="-right-2 sm:-right-4" aria-label="Next officers" />
                        {/* Dots pagination */}
                        <CarouselDots className="mt-6" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

export default HomeOfficers;
