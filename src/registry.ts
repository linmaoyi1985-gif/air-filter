import type { AppMeta } from './types';

// Import all app metadata
import { meta as keywordDedupMeta } from './apps/keyword-dedup/meta';
import { meta as csvConverterMeta } from './apps/csv-converter/meta';
import { meta as profitCalculatorMeta } from './apps/profit-calculator/meta';
import { meta as asinKeywordsMeta } from './apps/asin-keywords/meta';

// Central registry of all apps
export const allApps: AppMeta[] = [
  keywordDedupMeta,
  csvConverterMeta,
  profitCalculatorMeta,
  asinKeywordsMeta,
];

// Get app by slug
export function getAppBySlug(slug: string): AppMeta | undefined {
  return allApps.find(app => app.slug === slug);
}

// Group apps by category
export function getAppsByCategory() {
  const grouped = new Map<string, AppMeta[]>();

  allApps.forEach(app => {
    const category = app.category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(app);
  });

  // Sort apps within each category by order
  grouped.forEach(apps => {
    apps.sort((a, b) => (a.order || 999) - (b.order || 999));
  });

  return grouped;
}

// Get all unique categories
export function getAllCategories(): string[] {
  return Array.from(new Set(allApps.map(app => app.category)));
}

// Search apps by query (name, description, tags)
export function searchApps(query: string): AppMeta[] {
  const lowerQuery = query.toLowerCase();
  return allApps.filter(app => {
    const searchText = [
      app.name,
      app.description,
      ...(app.tags || []),
    ].join(' ').toLowerCase();

    return searchText.includes(lowerQuery);
  });
}
