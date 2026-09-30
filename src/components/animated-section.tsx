"use client";

import * as React from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { getVariant, type VariantName, viewportDefault } from "@/lib/motion";

type AnimatedSectionProps = {
    className?: string;
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements;
    variant?: VariantName | Variants;
    transition?: Transition;
    viewportOnce?: boolean;
    viewportAmount?: number;
    initial?: "hidden" | false;
    animateChildrenOnly?: boolean;
    id?: string;
};

export default function AnimatedSection({
    className,
    children,
    as = "section",
    variant = "fadeInUp",
    transition,
    viewportOnce,
    viewportAmount,
    initial = "hidden",
    animateChildrenOnly,
    id,
}: AnimatedSectionProps) {
    const Component = (motion[as as keyof typeof motion] ?? motion.section) as React.ElementType;

    const variants: Variants =
        typeof variant === "string"
            ? getVariant(variant, { transition })
            : (variant as Variants);

    if (animateChildrenOnly) {
        return (
            <section id={id} className={cn("snap-section", className)}>
                <motion.div
                    variants={variants}
                    initial={initial}
                    whileInView="visible"
                    viewport={{
                        once: viewportOnce ?? viewportDefault.once,
                        amount: viewportAmount ?? viewportDefault.amount,
                    }}
                >
                    {children}
                </motion.div>
            </section>
        );
    }

    return (
        <Component
            id={id}
            className={cn("snap-section", className)}
            variants={variants}
            initial={initial}
            whileInView="visible"
            viewport={{
                once: viewportOnce ?? viewportDefault.once,
                amount: viewportAmount ?? viewportDefault.amount,
            }}
        >
            {children}
        </Component>
    );
}
