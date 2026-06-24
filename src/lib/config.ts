// External data sources configuration
export const EXTERNAL_DATA_CONFIG = {
  // GitHub raw URLs for dynamic content
  GITHUB_RAW_BASE:
    "https://raw.githubusercontent.com/EXPLICIT-PUPSPC/explicit-website-data",

  // Specific data endpoints
  FEATURED_EVENT: "/refs/heads/main/data/events/featured.json",
  NEWS_ARTICLES: "/src/data/news/articles.json",
  OFFICERS: "/src/data/officers/2024-2025.json",
  LEGAL: "/src/data/legal/2024-2025.json",
  CAROUSEL_IMAGES: "/refs/heads/main/data/carousel/images.json",
  ACHIEVEMENTS: "/refs/heads/main/data/achievements/featured.json",
  FEATURED_PHOTOS: "/refs/heads/main/data/photos/featured.json",
  ALL_EVENTS: "/refs/heads/main/data/events/all-events.json",
  EVENTS_HIGHLIGHTS: "/refs/heads/main/data/events/highlights.json",
} as const;

// Helper function to get full GitHub raw URL
export const getGitHubRawUrl = (path: string): string => {
  return `${EXTERNAL_DATA_CONFIG.GITHUB_RAW_BASE}${path}`;
};

// Pre-built URLs for common data sources
export const DATA_URLS = {
  featuredEvent: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.FEATURED_EVENT),
  newsArticles: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.NEWS_ARTICLES),
  officers: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.OFFICERS),
  legal: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.LEGAL),
  carouselImages: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.CAROUSEL_IMAGES),
  achievements: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.ACHIEVEMENTS),
  featuredPhotos: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.FEATURED_PHOTOS),
  allEvents: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.ALL_EVENTS),
  eventsHighlights: getGitHubRawUrl(EXTERNAL_DATA_CONFIG.EVENTS_HIGHLIGHTS),
} as const;
