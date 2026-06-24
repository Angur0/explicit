// Build-time script to generate public/search-index.json for static search
// Usage: node scripts/generate-search-index.js
const fs = require("node:fs");
const path = require("node:path");

function readJsonFiles(dirRel) {
  const dir = path.join(process.cwd(), dirRel);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const p = path.join(dir, f);
    try {
      const raw = fs.readFileSync(p, "utf-8");
      const data = JSON.parse(raw);
      return { file: f, path: p, data };
    } catch (e) {
      return { file: f, path: p, data: null };
    }
  });
}

function loadNewsArticles() {
  const docs = readJsonFiles("src/data/news");
  const items = [];
  for (const d of docs) {
    if (Array.isArray(d.data)) {
      for (const a of d.data) {
        if (a && a.slug && a.title) items.push(a);
      }
    }
  }
  return items;
}

function loadEvents() {
  const docs = readJsonFiles("src/data/events");
  const items = [];
  for (const d of docs) {
    if (d?.data?.events && Array.isArray(d.data.events)) {
      for (const e of d.data.events) {
        if (e && e.title) items.push(e);
      }
    }
  }
  return items;
}

function loadOfficers() {
  const docs = readJsonFiles("src/data/officers");
  const items = [];
  for (const d of docs) {
    if (Array.isArray(d.data)) {
      const batch = path.basename(d.file, ".json");
      for (const o of d.data) {
        if (o && o.name && o.position) items.push({ ...o, batch });
      }
    }
  }
  return items;
}

function loadAchievements() {
  const docs = readJsonFiles("src/data/achievements");
  const items = [];
  for (const d of docs) {
    const data = d.data;
    if (!data) continue;
    const feat = data.achievementsSection?.achievements;
    if (Array.isArray(feat)) {
      for (const a of feat) {
        if (a?.title) items.push({ title: a.title, context: a.event });
      }
    }
    if (Array.isArray(data.years)) {
      for (const y of data.years) {
        if (Array.isArray(y?.items)) {
          for (const it of y.items) {
            if (it?.title)
              items.push({ title: it.title, date: it.date, year: y.year });
          }
        }
      }
    }
  }
  return items;
}

function main() {
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

  const news = loadNewsArticles();
  const events = loadEvents();
  const officers = loadOfficers();
  const achievements = loadAchievements();

  const out = { pages, sections, news, events, officers, achievements };
  const outPath = path.join(process.cwd(), "public", "search-index.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("[search-index] Wrote", outPath);
}

main();
