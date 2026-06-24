// Restored discrete home layout (pre-parallax)
import HomeHeroSwitch from "@/components/public/home/home-hero-switch";
import HomeEvents from "@/components/public/home/home-events";
import { HomeIntro } from "@/components/public/home/home-intro";
import { HomeAchievements } from "@/components/public/home/home-achievements";
import HomeOfficers from "@/components/public/home/home-officers";
import { HomeFeaturedPhotos } from "@/components/public/home/home-featured-photos";
import { HomeCta } from "@/components/public/home/home-cta";

export default function HomePage() {
  return (
    <>
      <section className="snap-section no-pad">
        <HomeHeroSwitch />
      </section>

      <HomeIntro />

      <HomeEvents />

      <HomeAchievements />

      <HomeOfficers />

      <HomeFeaturedPhotos />

      <HomeCta />
    </>
  );
}
