"use client";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HomeHero } from "./home-hero";
import HomeHeroMobile from "./home-hero-mobile";

// Renders exactly one hero: desktop on md+ and mobile below md.
export function HomeHeroSwitch() {
    const isMobile = useIsMobile();

    // Avoid double-rendering: choose one based on client width
    return isMobile ? <HomeHeroMobile /> : <HomeHero />;
}

export default HomeHeroSwitch;
