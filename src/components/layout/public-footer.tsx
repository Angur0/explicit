"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Calendar, Info } from "lucide-react";
import { FaDiscord, FaEnvelope, FaFacebookSquare } from "react-icons/fa";

export function PublicFooter() {
  const pathname = usePathname();

  // Don't show footer on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const footerLinks = {
    explore: [
      { name: "Home", href: "/" },
      { name: "Events", href: "/events" },
    ],
    about: [
      { name: "About Us", href: "/about#about" },
      { name: "Preamble", href: "/about#preamble" },
      { name: "VMGO", href: "/about#vmgo" },
      { name: "History", href: "/about#history" },
      { name: "Officers", href: "/about#officers" },
    ],
    archives: [
      { name: "Hall of Fame", href: "/archives#hall-of-fame" },
      { name: "Achievements", href: "/archives#achievements" },
      { name: "Past Officers", href: "/archives#past-officers" },
      { name: "News", href: "/archives#news" },
      { name: "Credits", href: "/archives#credits" },
    ],
  } as const;

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookSquare className="h-5 w-5" />,
      href: "https://www.facebook.com/explicitpupspc",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="h-5 w-5" />,
      href: "mailto:explicitpupspc@gmail.com",
    },
    {
      name: "Discord",
      icon: <FaDiscord className="h-5 w-5" />,
      href: null,
      disabled: true,
    },
  ] as const;

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#011F4B] text-white">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-1 lg:col-span-2 relative">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src="/images/logo_explicit.webp"
                alt="EXPLICIT Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <h3 className="text-xl font-bold">EXPLICIT</h3>
                <p className="text-sm text-blue-200">Explorers</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Empowering students through technology, innovation, and community.
              Join us in exploring the future of computing and information technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                social.href ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-blue-200 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ) : (
                  <span
                    key={social.name}
                    className="text-blue-200/50 cursor-default"
                    aria-label={`${social.name} coming soon`}
                    title={`${social.name} invite coming soon`}
                  >
                    {social.icon}
                  </span>
                )
              ))}
            </div>

            {/* Mascot removed per request */}
          </div>

          {/* Explore */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Archives */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="font-semibold mb-4">Archives</h4>
            <ul className="space-y-2">
              {footerLinks.archives.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-blue-800/70 bg-[#001737]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Ready to Get Involved?</h3>
              <p className="text-blue-200 text-sm">
                Explore our events and become part of our community
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full !bg-transparent border-blue-300/70 text-blue-200 hover:bg-blue-300/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <Link href="/events" className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>View Events</span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-blue-500 hover:bg-blue-600 text-white focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Learn More</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-800/70">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-2 md:mb-0">
              <p className="text-sm text-blue-200">
                © {year} EXPLICIT — Explorers. All rights reserved.
              </p>
            </div>
            <nav className="flex items-center gap-4 text-xs text-blue-200">
              <Link href="/archives#news" className="hover:text-white">News</Link>
              <span className="opacity-30">•</span>
              <Link href="/events" className="hover:text-white">Events</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
