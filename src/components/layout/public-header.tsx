"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const leftNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const rightNavLinks = [
  { href: "/events", label: "Events" },
  { href: "/archives", label: "Archives" },
];

export function PublicHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const allLinks = [...leftNavLinks, ...rightNavLinks];

  function SearchForm({
    className,
    inputClassName,
    autoFocus = false,
  }: {
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
  }) {
    return (
      <form className={className} role="search" action="/search" method="get">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <Input
            name="q"
            autoFocus={autoFocus}
            placeholder="Search…"
            type="search"
            required
            className={
              "h-10 w-full rounded-md bg-white/10 text-white placeholder:text-white/60 border-white/20 pl-9 pr-3 focus-visible:ring-white focus-visible:ring-offset-0"
              + (inputClassName ? ` ${inputClassName}` : "")
            }
          />
        </div>
      </form>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#011F4B] shadow-lg">
      {/* Desktop Header */}
      <div className="container mx-auto hidden h-24 items-center md:flex">
        <div className="flex w-full items-center">
          {/* Left Nav */}
          <nav className="flex flex-1 justify-end gap-x-8 pr-12 text-base font-bold">
            {leftNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="shrink-0 mt-8">
            <Link href="/">
              <Image
                src="/images/logo_explicit.webp"
                alt="Explorers CIT Logo"
                width={112}
                height={112}
                className="h-28 w-28"
              />
            </Link>
          </div>

          {/* Right Nav + Search */}
          <div className="flex flex-1 items-center gap-x-8 pl-12 text-base font-bold">
            <nav className="flex items-center gap-x-8">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto w-64">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="container mx-auto flex h-20 items-center gap-3 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#011F4B]/95 backdrop-blur-sm border-r-border/50 text-white"
          >
            <div className="p-4">
              <Link href="/" className="mb-8 flex items-center justify-center">
                <Image
                  src="/images/logo_explicit.webp"
                  alt="Explorers CIT Logo"
                  width={96}
                  height={96}
                  className="h-24 w-24"
                />
              </Link>

              {/* Search in Menu */}
              <SearchForm className="mb-6" autoFocus />

              <nav className="flex flex-col items-center space-y-6">
                {allLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xl font-bold uppercase tracking-widest transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Center Search on Mobile */}
        <div className="flex-1">
          <SearchForm />
        </div>

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo_explicit.webp"
            alt="Explorers CIT Logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </Link>
      </div>
    </header>
  );
}
