import fs from "node:fs";
import path from "node:path";

function readJsonFiles(dirRel: string) {
  const dir = path.join(process.cwd(), dirRel);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const p = path.join(dir, f);
    try {
      const raw = fs.readFileSync(p, "utf-8");
      const data = JSON.parse(raw);
      return { file: f, path: p, data };
    } catch {
      return { file: f, path: p, data: null };
    }
  });
}

export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  content?: string;
};
export async function loadNewsArticles(): Promise<NewsArticle[]> {
  const docs = readJsonFiles("src/data/news");
  const items: NewsArticle[] = [];
  for (const d of docs) {
    if (Array.isArray(d.data)) {
      for (const a of d.data) {
        if (a && a.slug && a.title) items.push(a);
      }
    }
  }
  return items;
}

export type EventItem = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
};
export async function loadEvents(): Promise<EventItem[]> {
  const docs = readJsonFiles("src/data/events");
  const items: EventItem[] = [];
  for (const d of docs) {
    if (d?.data?.events && Array.isArray(d.data.events)) {
      for (const e of d.data.events) {
        if (e && e.title) items.push(e);
      }
    }
  }
  return items;
}

export type OfficerItem = {
  name: string;
  position: string;
  image?: string;
  batch?: string;
};
export async function loadOfficers(): Promise<OfficerItem[]> {
  const docs = readJsonFiles("src/data/officers");
  const items: OfficerItem[] = [];
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

export type AchievementItem = {
  title: string;
  context?: string;
  date?: string;
  year?: string;
};
export async function loadAchievements(): Promise<AchievementItem[]> {
  const docs = readJsonFiles("src/data/achievements");
  const items: AchievementItem[] = [];
  for (const d of docs) {
    const data = d.data;
    if (!data) continue;
    // featured.json shape
    const feat = data.achievementsSection?.achievements;
    if (Array.isArray(feat)) {
      for (const a of feat) {
        if (a?.title) items.push({ title: a.title, context: a.event });
      }
    }
    // timeline.json shape
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
