import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAppBySlug } from "@/lib/registry";

// Import all app components
import KeywordDedupApp from "@/apps/keyword-dedup/App";
import CsvConverterApp from "@/apps/csv-converter/App";
import ProfitCalculatorApp from "@/apps/profit-calculator/App";
import AsinKeywordsApp from "@/apps/asin-keywords/App";

const appComponents: Record<string, ComponentType> = {
  "keyword-dedup": KeywordDedupApp,
  "csv-converter": CsvConverterApp,
  "profit-calculator": ProfitCalculatorApp,
  "asin-keywords": AsinKeywordsApp,
};

// ✅ Next.js 15: params is a Promise
export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const app = getAppBySlug(slug);
  if (!app) notFound();

  const AppComponent = appComponents[app.slug];
  if (!AppComponent) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            ← 返回首页
          </Link>
          <h1 style={{ margin: "10px 0 0 0", fontSize: "28px" }}>{app.name}</h1>
        </div>
      </header>

      {/* App Content */}
      <main>
        <AppComponent />
      </main>
    </div>
  );
}

// Generate static params for all apps
export async function generateStaticParams() {
  const { allApps } = await import("@/lib/registry");
  return allApps.map((app) => ({
    slug: app.slug,
  }));
}
