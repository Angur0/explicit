# Achievements Data Management

## Updating the Achievements Section

To update the achievements section on the homepage, edit the `featured.json` file in this directory.

### Quick Edit Guide

1. Open `featured.json`
2. Update the fields under `achievementsSection`:
   - **sectionTitle**: Main heading (e.g., "Achievements", "Awards")
   - **sectionSubtitle**: Small text above title (e.g., "Highlights", "Our Pride")
   - **sectionDescription**: Brief description of what achievements represent
   - **buttonText**: Text for the button (e.g., "See More", "View All")
   - **buttonLink**: Link for the button (e.g., "/about", "/achievements")
   - **achievements**: Array of achievements to display

### Editing Individual Achievements

Each achievement in the `achievements` array has:

- **event**: Name of the competition/event where achievement was earned
- **title**: The specific award or recognition received
- **image**: Path to achievement image (photos, certificates, trophies)
- **aiHint**: Description for AI image generation

### Example Update

```json
{
  "achievementsSection": {
    "sectionTitle": "Awards & Recognition",
    "sectionSubtitle": "Our Pride",
    "sectionDescription": "These achievements reflect our dedication to excellence and the hard work of our members.",
    "buttonText": "View All Awards",
    "buttonLink": "/about",
    "achievements": [
      {
        "event": "National Programming Contest 2024",
        "title": "1st Place - Web Development",
        "image": "/images/achievements/programming-contest.jpg",
        "aiHint": "students with programming award"
      },
      {
        "event": "University Innovation Fair 2024",
        "title": "Best Student Organization",
        "image": "/images/achievements/innovation-award.jpg",
        "aiHint": "innovation award ceremony"
      },
      {
        "event": "Tech Excellence Awards 2023",
        "title": "Outstanding Community Impact",
        "image": "/images/achievements/community-award.jpg",
        "aiHint": "community service award"
      }
    ],
    "enabled": true
  }
}
```

### Image Guidelines

- **Image size**: Recommended 400x300 pixels (4:3 aspect ratio)
- **File format**: JPG, PNG, or WebP
- **Location**: Store images in `/public/images/achievements/` folder
- **File naming**: Use descriptive names like `directors-cup-2024.jpg`
- **Content**: Photos of awards, certificates, team celebrations, trophies

### Tips

- Keep achievement titles concise but descriptive
- Event names should be the full, official name of the competition
- Use high-quality images that clearly show the achievement
- Set `enabled: false` to temporarily hide the achievements section
- The button can link to any page with more details about your achievements
- Recommended: 4-6 achievements for best visual balance

### Need Help?

If you need to add new fields or change the layout, contact your developer to modify the component code.
