/**
 * scripts/seed.ts
 *
 * One-time idempotent seed script.
 * Creates site_content + projects tables and upserts the current real content.
 *
 * Run with:  npx tsx scripts/seed.ts
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load .env.local so DATABASE_URL is available outside Next.js
config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌  DATABASE_URL is not set. Add it to .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// ─── Schema ──────────────────────────────────────────────────────────

async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      key         TEXT PRIMARY KEY,
      value       TEXT NOT NULL,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id            SERIAL PRIMARY KEY,
      slug          TEXT UNIQUE NOT NULL,
      title         TEXT NOT NULL,
      one_liner     TEXT NOT NULL,
      stat_label    TEXT NOT NULL,
      tech_stack    TEXT[] NOT NULL DEFAULT '{}',
      problem       TEXT NOT NULL DEFAULT '',
      approach      TEXT NOT NULL DEFAULT '',
      result        TEXT NOT NULL DEFAULT '',
      github_url    TEXT,
      demo_url      TEXT,
      image_urls    TEXT[] NOT NULL DEFAULT '{}',
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("✅  Tables created (or already exist).");
}

// ─── site_content seed data ──────────────────────────────────────────

const siteContentRows: { key: string; value: string }[] = [
  {
    key: "tagline",
    value:
      "I turn raw data into decisions — like finding a profit opportunity hiding in loan-grade risk.",
  },
  {
    key: "about_text",
    value:
      "Final-year B.Tech IT (Data Science & AI-ML) undergraduate and ONGC Foundation Scholar with hands-on internship experience and three end-to-end analytics projects across banking, retail, and quick-commerce. Based in Roorkee, Uttarakhand, India.",
  },
  {
    key: "contact_email",
    value: "duanantsaini2006@gmail.com",
  },
  {
    key: "contact_phone",
    value: "+91 9837980319",
  },
  {
    key: "linkedin_url",
    value: "https://linkedin.com/in/anant-saini-0a6949210",
  },
  {
    key: "github_url",
    value: "https://github.com/anant-saini2006",
  },
  {
    key: "resume_url",
    value: "/resume.pdf",
  },
  {
    key: "skills_json",
    value: JSON.stringify([
      {
        category: "BI & Visualization",
        items: [
          "Power BI (DAX, Data Modeling, Drill-Through, KPI Cards)",
          "Tableau",
          "Streamlit",
          "Plotly",
          "Matplotlib",
          "Seaborn",
        ],
      },
      {
        category: "Programming & Database",
        items: [
          "Python (Pandas, NumPy, SciPy)",
          "SQL (Joins, CTEs, Window Functions)",
          "PostgreSQL",
          "SQLite",
        ],
      },
      {
        category: "Analytics & Statistics",
        items: [
          "Statistical Testing (Chi-Square, ANOVA)",
          "Cohort & Risk Analysis",
          "EDA",
          "KPI Design",
        ],
      },
      {
        category: "Tools",
        items: ["Excel (Pivot Tables, Power Query, openpyxl)", "Git & GitHub"],
      },
    ]),
  },
  {
    key: "experience_json",
    value: JSON.stringify([
      {
        title: "Data Analytics Intern",
        company: "PrimrIQ",
        period: "June–July 2026",
        bullets: [
          "Rebuilt a broken ERP data pipeline in Python (openpyxl) after merged-cell corruption, scored 95/100.",
          "Authored 10 SQL queries against SQLite, revised from an initial 78/100 using window functions and dynamic filtering per mentor feedback.",
        ],
      },
    ]),
  },
];

async function seedSiteContent() {
  for (const row of siteContentRows) {
    await sql`
      INSERT INTO site_content (key, value, updated_at)
      VALUES (${row.key}, ${row.value}, now())
      ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value,
            updated_at = now()
    `;
  }
  console.log(`✅  Upserted ${siteContentRows.length} site_content rows.`);
}

// ─── projects seed data ──────────────────────────────────────────────

const projectRows = [
  {
    slug: "bank-loan-portfolio-analytics",
    title: "Bank Loan Portfolio Risk & Analytics System",
    one_liner: "$78.1M profit opportunity via cohort & risk analysis.",
    stat_label: "+$78.1M",
    tech_stack: ["PostgreSQL", "Python (Pandas, SciPy)", "SQL", "Streamlit", "Plotly"],
    problem:
      "A major retail loan portfolio was experiencing higher-than-expected default rates, eating into overall net profit margins. The existing data was scattered across 500,000+ records and lacked a unified view to pinpoint the highest risk originations.",
    approach:
      "I built an ETL pipeline to load all 500,000+ retail loan records into a cloud PostgreSQL (Neon) warehouse. Using Python (Pandas, SciPy), I performed Chi-Square and ANOVA statistical testing, alongside vintage cohort analysis, which revealed that Grade F & G loans were defaulting at a rate above 50%. To make this actionable, I modeled 'Policy A' (halting Grade F & G originations) and shipped a 4-page Streamlit + Plotly dashboard with a real-time policy simulator for stakeholders.",
    result:
      "The simulation proved that executing Policy A would result in a negligible ~3% loan volume trade-off in exchange for a massive $78.1M gain in net profit.",
    github_url:
      "https://github.com/anant-saini2006/bank-loan-portfolio-analytics",
    demo_url:
      "https://github.com/anant-saini2006/bank-loan-portfolio-analytics",
    image_urls: [] as string[],
    display_order: 1,
  },
  {
    slug: "retailx-analytics-dashboard",
    title: "RetailX Analytics Dashboard",
    one_liner: "Star-schema Power BI model linking sales dimensions.",
    stat_label: "60%+ Sales",
    tech_stack: ["Power BI", "SQL", "Data Modeling"],
    problem:
      "RetailX needed clearer visibility into sales performance across regions and product lines to identify areas of underperformance.",
    approach:
      "I performed multi-table SQL joins and CTEs across 4+ tables to create an analysis-ready dataset. I then developed a star-schema Power BI model linking sales, product, and customer dimensions, and implemented DAX measures to track performance.",
    result:
      "The dashboard revealed that just 2 product lines drove over 60% of total sales, and drill-through reports successfully isolated the specific regions tied to a 30% revenue gap.",
    github_url:
      "https://github.com/anant-saini2006/RetailX-Analytics-Dashboard",
    demo_url: null,
    image_urls: [] as string[],
    display_order: 2,
  },
  {
    slug: "blinkit-sales-analytics-dashboard",
    title: "Blinkit Sales Analytics Dashboard",
    one_liner: "Quick-commerce analysis of ₹2.5Cr sales.",
    stat_label: "3x Volume",
    tech_stack: ["Power BI", "DAX", "Quick-Commerce Analytics"],
    problem:
      "Blinkit required detailed insights into simulated sales data across various outlet types and categories to optimize their quick-commerce model.",
    approach:
      "I analyzed ₹2.5Cr+ in simulated sales data across 20+ outlet types and 8 categories. I built over 10 DAX measures to calculate revenue growth, Average Order Value (AOV), outlet ranking, and category share.",
    result:
      "The analysis highlighted that Tier-1 outlets (only 30% of total locations) drove over 45% of total revenue, and the top 5 outlets outsold the bottom 10 by a factor of 3x.",
    github_url:
      "https://github.com/anant-saini2006/Blinkit-Sales-Analytics-Dashboard",
    demo_url: null,
    image_urls: [] as string[],
    display_order: 3,
  },
];

async function seedProjects() {
  for (const p of projectRows) {
    await sql`
      INSERT INTO projects
        (slug, title, one_liner, stat_label, tech_stack,
         problem, approach, result, github_url, demo_url,
         image_urls, display_order)
      VALUES
        (${p.slug}, ${p.title}, ${p.one_liner}, ${p.stat_label}, ${p.tech_stack},
         ${p.problem}, ${p.approach}, ${p.result}, ${p.github_url}, ${p.demo_url},
         ${p.image_urls}, ${p.display_order})
      ON CONFLICT (slug) DO UPDATE SET
        title         = EXCLUDED.title,
        one_liner     = EXCLUDED.one_liner,
        stat_label    = EXCLUDED.stat_label,
        tech_stack    = EXCLUDED.tech_stack,
        problem       = EXCLUDED.problem,
        approach      = EXCLUDED.approach,
        result        = EXCLUDED.result,
        github_url    = EXCLUDED.github_url,
        demo_url      = EXCLUDED.demo_url,
        image_urls    = EXCLUDED.image_urls,
        display_order = EXCLUDED.display_order
    `;
  }
  console.log(`✅  Upserted ${projectRows.length} project rows.`);
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱  Starting seed…\n");
  await createTables();
  await seedSiteContent();
  await seedProjects();
  console.log("\n🎉  Seed complete!");
}

main().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
