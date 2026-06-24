import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeAbout() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-headline">
            ABOUT US
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explorers in Communication and Information Technology (EXPLICIT) is
            the premier student organization for technology enthusiasts at PUP
            San Pedro. We are dedicated to fostering a community of learners,
            innovators, and future leaders in the tech industry.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
