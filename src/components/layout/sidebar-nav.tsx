"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  navigationItems: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarNav({
  navigationItems,
  isOpen,
  onClose,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">
            Navigation
          </h2>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-gray-100 text-gray-900"
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="left" className="w-64">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">
                Navigation
              </h2>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} onClick={onClose}>
                        <Button
                          variant={
                            pathname === item.href ? "secondary" : "ghost"
                          }
                          className={cn(
                            "w-full justify-start",
                            pathname === item.href &&
                              "bg-gray-100 text-gray-900"
                          )}
                        >
                          <Icon className="mr-3 h-4 w-4" />
                          {item.title}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
