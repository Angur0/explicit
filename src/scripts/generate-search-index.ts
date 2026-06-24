import fs from "node:fs";
import path from "node:path";
import {
  loadNewsArticles,
  loadEvents,
  loadOfficers,
  loadAchievements,
} from "@/lib/search-loaders";

function writeJSON(p: string, data: any) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
}

async function main() {
  // static pages/sections
  const pages = [
    {
      kind: "page",
      title: "Home",
      url: "/",
      description: "EXPLICIT — Official site",
      keywords: ["home", "explicit", "organization"],
    },
    {
      kind: "page",
      title: "About",
      url: "/about",
      description: "About EXPLICIT",
      keywords: ["about", "vmgo", "history", "officers"],
    },
    {
      kind: "page",
      title: "Events",
      url: "/events",
      description: "Upcoming and past events",
      keywords: ["events", "workshops", "hackathon", "seminars"],
    },
    {
      kind: "page",
      title: "Archives",
      url: "/archives",
      description: "Awards, achievements, past officers, news, credits",
      keywords: [
        "archives",
        "awards",
        "achievements",
        "officers",
        "news",
        "credits",
      ],
    },
    {
      kind: "page",
      title: "Gallery",
      url: "/gallery",
      description: "Featured photos and media",
      keywords: ["gallery", "photos", "media"],
    },
    {
      kind: "page",
      title: "News",
      url: "/news",
      description: "Stories and updates",
      keywords: ["news", "articles", "updates"],
    },
  ];

  const sections = [
    {
      kind: "section",
      title: "Home – Events",
      url: "/#events",
      keywords: ["home", "events", "upcoming"],
    },
    {
      kind: "section",
      title: "About – About",
      url: "/about#about",
      keywords: ["about", "introduction"],
    },
    {
      kind: "section",
      title: "About – Preamble",
      url: "/about#preamble",
      keywords: ["about", "preamble"],
    },
    {
      kind: "section",
      title: "About – VMGO",
      url: "/about#vmgo",
      keywords: ["vision", "mission", "goals"],
    },
    {
      kind: "section",
      title: "About – History",
      url: "/about#history",
      keywords: ["history", "timeline"],
    },
    {
      kind: "section",
      title: "About – Officers",
      url: "/about#officers",
      keywords: ["officers", "leadership"],
    },
    {
      kind: "section",
      title: "Archives – Hall of Fame",
      url: "/archives#hall-of-fame",
      keywords: ["archives", "awards", "hall of fame"],
    },
    {
      kind: "section",
      title: "Archives – Achievements",
      url: "/archives#achievements",
      keywords: ["archives", "achievements"],
    },
    {
      kind: "section",
      title: "Archives – Past Officers",
      url: "/archives#past-officers",
      keywords: ["archives", "officers"],
    },
    {
      kind: "section",
      title: "Archives – News",
      url: "/archives#news",
      keywords: ["archives", "news", "articles"],
    },
    {
      kind: "section",
      title: "Archives – Credits",
      url: "/archives#credits",
      keywords: ["archives", "credits"],
    },
  ];

  const [news, events, officers, achievements] = await Promise.all([
    loadNewsArticles(),
    loadEvents(),
    loadOfficers(),
    loadAchievements(),
  ]);

  const out = {
    pages,
    sections,
    news,
    events,
    officers,
    achievements,
  };

  const outPath = path.join(process.cwd(), "public", "search-index.json");
  writeJSON(outPath, out);
  // eslint-disable-next-line no-console
  console.log("[search-index] Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
