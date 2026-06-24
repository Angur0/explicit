"use client";

import { FloatingButton } from "./floating-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaqFabSheetContent } from "@/components/public/home/faq-fab";

export function FloatingButtonWrapper() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FloatingButton tooltip="Ask EXPLICIT — FAQs & links" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="sr-only">Ask EXPLICIT</SheetTitle>
          <SheetDescription className="sr-only">
            Frequently asked questions and quick links
          </SheetDescription>
        </SheetHeader>
        <FaqFabSheetContent />
      </SheetContent>
    </Sheet>
  );
}
