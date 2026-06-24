# Archives Data Guide

This folder holds structured content for the Archives page.

## Files

- `awards.json` — Hall of Fame awards between members and officers.
- `credits.json` — Site creator, contributors, and future maintainers.

You can also use existing data elsewhere in `src/data` for other archive sections:

- `achievements/featured.json` — Highlights for the Achievements tab.
- `events/all-events.json` — Past events for the Events tab.
- `officers/{year}.json` — Past officers per school year.
- `legal/{year}.json` — Constitution and bylaws.

## awards.json shape

```json
{
  "awards": [
    {
      "year": "2024-2025",
      "title": "Member of the Year",
      "recipient": {
        "name": "Sample Member",
        "role": "Member",
        "image": "/images/avatar.png"
      },
      "description": "Recognized for outstanding contributions, leadership, and community impact.",
      "image": "/images/photos/photo-5.webp",
      "aiHint": "award ceremony portrait"
    }
  ]
}
```

- `year`: School year or calendar year.
- `title`: Award name (e.g., Member of the Year).
- `recipient`: Name, role, and optional image.
- `description`: Short explanation.
- `image`: Public image path (under `public/images`).

## credits.json shape

```json
{
  "creator": {
    "name": "Your Name",
    "role": "Website Creator",
    "image": "/images/avatar.png",
    "links": [{ "label": "GitHub", "url": "https://github.com/yourhandle" }]
  },
  "contributors": [
    {
      "name": "Contributor One",
      "role": "UI/UX",
      "image": "/images/avatar.png",
      "links": []
    }
  ],
  "futureMaintainers": [
    {
      "name": "Maintainer Candidate",
      "role": "Developer",
      "image": "/images/avatar.png",
      "links": []
    }
  ]
}
```

## Tips

- Images should live under `public/images/...` and be referenced by their public path.
- To add officer archives, create another file under `src/data/officers` with the pattern `YYYY-YYYY.json` and entries with `{ name, position, image }`.
- After editing JSON files, the page updates automatically in dev mode.
