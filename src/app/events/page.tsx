import type { ReactNode } from "react";
import EventsArchive from "@/components/public/events/events-archive-client";
import EventsOrganizationsIntro from "@/components/public/events/events-organizations-intro";
import EventsSeparator from "@/components/public/events/events-separator";
import AnimatedSection from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Lightbulb, Trophy, Wrench } from "lucide-react";
import allEventsData from "@/data/events/all-events.json";

interface Event {
  title: string;
  date: string;
  description: string;
  image: string;
  aiHint: string;
  tags: string[];
  status: string;
  attendees?: number;
}

export default function EventsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Creative organizations intro */}
      <EventsOrganizationsIntro />

      {/* Separator */}
      <EventsSeparator />

      {/* Events archive below */}
      <EventsArchive events={allEventsData.events as Event[]} />
    </div>
  );
}
