export type AppCategory =
  | 'Keyword Research'
  | 'PPC Ads'
  | 'Competitor Intel'
  | 'Listing & SEO'
  | 'Data Tools'
  | 'Profit & FBA'
  | 'Supply Chain'
  | 'Compliance'
  | 'Ops Automation'
  | 'Other';

export interface AppMeta {
  slug: string;
  name: string;
  description: string;
  category: AppCategory;
  tags?: string[];
  order?: number;
}
