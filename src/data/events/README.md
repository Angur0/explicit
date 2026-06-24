# Event Data Management

## Updating Event Highlights

To update the event highlights section on the homepage, edit the `featured.json` file in this directory.

### Quick Edit Guide

1. Open `featured.json`
2. Update the fields under `eventHighlights`:
   - **sectionTitle**: Main heading (e.g., "Event Highlights")
   - **sectionDescription**: Brief description of your events
   - **highlights**: Array of event types you conduct (max 3-4 recommended)
   - **callToAction**: The buttons at the bottom

### Editing Event Highlights

Each highlight in the `highlights` array has:

- **title**: Name of the event type (e.g., "Workshops", "Hackathons")
- **description**: What this event type involves
- **image**: Path to image file (e.g., "/images/events/workshop.jpg")
- **aiHint**: Description for AI image generation
- **frequency**: How often (e.g., "Monthly", "Quarterly", "Annually")

### Example Update

```json
{
  "eventHighlights": {
    "sectionTitle": "Our Events",
    "sectionDescription": "Join us for exciting programs throughout the year",
    "highlights": [
      {
        "title": "Weekly Meetups",
        "description": "Casual networking sessions with tech talks and discussions",
        "image": "/images/events/meetup.jpg",
        "aiHint": "students networking and discussing",
        "frequency": "Weekly"
      },
      {
        "title": "Coding Bootcamps",
        "description": "Intensive programming workshops for all skill levels",
        "image": "/images/events/bootcamp.jpg",
        "aiHint": "coding workshop classroom",
        "frequency": "Monthly"
      },
      {
        "title": "Innovation Awards",
        "description": "Annual recognition ceremony for outstanding student projects",
        "image": "/images/events/awards.jpg",
        "aiHint": "awards ceremony with students",
        "frequency": "Annually"
      }
    ],
    "enabled": true
  }
}
```

### Image Guidelines

- **Image size**: Recommended 400x250 pixels or similar 16:10 aspect ratio
- **File format**: JPG, PNG, or WebP
- **Location**: Store images in `/public/images/events/` folder
- **File naming**: Use descriptive names like `tech-symposium.jpg`, `coding-workshop.jpg`
- **AI Hint**: Brief description for AI-generated images (e.g., "students coding together")

### Tips

- Keep highlight titles short and impactful (2-3 words)
- Descriptions should be one sentence explaining what attendees get
- Use frequency to set expectations (Weekly, Monthly, etc.)
- Set `enabled: false` to hide the entire event highlights section
- The last word in `sectionTitle` gets the gradient accent automatically
- Store event images in `/public/images/events/` for organization
- Use descriptive AI hints for better image generation results

### Need Help?

If you need to add new fields or change the layout, contact your developer to modify the component code.
