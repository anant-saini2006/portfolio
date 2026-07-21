import { neon } from "@neondatabase/serverless";

/**
 * Returns a SQL-tagged-template function connected to the Neon database.
 * Each call creates a fresh stateless HTTP connection (Neon serverless driver).
 */
function getSQL() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local or your Vercel environment."
    );
  }
  return neon(databaseUrl);
}

// ─── site_content helpers ────────────────────────────────────────────

export type SiteContentRow = {
  key: string;
  value: string;
  updated_at: string;
};

/** Fetch all site_content rows and return them as a key→value map. */
export async function getSiteContent(): Promise<Record<string, string>> {
  const sql = getSQL();
  const rows = await sql`SELECT key, value FROM site_content`;
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

/** Fetch a single site_content value by key, or null if missing. */
export async function getSiteContentValue(
  key: string
): Promise<string | null> {
  const sql = getSQL();
  const rows = await sql`SELECT value FROM site_content WHERE key = ${key}`;
  return rows.length > 0 ? rows[0].value : null;
}

// ─── projects helpers ────────────────────────────────────────────────

export type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  one_liner: string;
  stat_label: string;
  tech_stack: string[];
  problem: string;
  approach: string;
  result: string;
  github_url: string | null;
  demo_url: string | null;
  image_urls: string[];
  display_order: number;
  created_at: string;
};

/** Fetch all projects, ordered by display_order ascending. */
export async function getProjects(): Promise<ProjectRow[]> {
  const sql = getSQL();
  const rows = await sql`
    SELECT id, slug, title, one_liner, stat_label, tech_stack,
           problem, approach, result, github_url, demo_url,
           image_urls, display_order, created_at
    FROM projects
    ORDER BY display_order ASC
  `;
  return rows as unknown as ProjectRow[];
}

/** Fetch a single project by slug, or null if not found. */
export async function getProjectBySlug(
  slug: string
): Promise<ProjectRow | null> {
  const sql = getSQL();
  const rows = await sql`
    SELECT id, slug, title, one_liner, stat_label, tech_stack,
           problem, approach, result, github_url, demo_url,
           image_urls, display_order, created_at
    FROM projects
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows.length > 0 ? (rows[0] as unknown as ProjectRow) : null;
}

/** Fetch a single project by numeric id, or null if not found. */
export async function getProjectById(
  id: number
): Promise<ProjectRow | null> {
  const sql = getSQL();
  const rows = await sql`
    SELECT id, slug, title, one_liner, stat_label, tech_stack,
           problem, approach, result, github_url, demo_url,
           image_urls, display_order, created_at
    FROM projects
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows.length > 0 ? (rows[0] as unknown as ProjectRow) : null;
}

/** Fetch all site_content rows with updated_at for admin display. */
export async function getAllSiteContentRows(): Promise<SiteContentRow[]> {
  const sql = getSQL();
  const rows = await sql`SELECT key, value, updated_at FROM site_content ORDER BY key ASC`;
  return rows as unknown as SiteContentRow[];
}

// ─── Write helpers (admin) ───────────────────────────────────────────

/** Upsert a single site_content row. */
export async function upsertSiteContent(
  key: string,
  value: string
): Promise<void> {
  const sql = getSQL();
  await sql`
    INSERT INTO site_content (key, value, updated_at)
    VALUES (${key}, ${value}, now())
    ON CONFLICT (key) DO UPDATE
      SET value = EXCLUDED.value,
          updated_at = now()
  `;
}

/** Insert or update a project row. Returns the id of the upserted row. */
export async function upsertProject(data: {
  id?: number;
  slug: string;
  title: string;
  one_liner: string;
  stat_label: string;
  tech_stack: string[];
  problem: string;
  approach: string;
  result: string;
  github_url: string | null;
  demo_url: string | null;
  image_urls: string[];
  display_order: number;
}): Promise<number> {
  const sql = getSQL();

  if (data.id) {
    // Update existing
    await sql`
      UPDATE projects SET
        slug = ${data.slug},
        title = ${data.title},
        one_liner = ${data.one_liner},
        stat_label = ${data.stat_label},
        tech_stack = ${data.tech_stack},
        problem = ${data.problem},
        approach = ${data.approach},
        result = ${data.result},
        github_url = ${data.github_url},
        demo_url = ${data.demo_url},
        image_urls = ${data.image_urls},
        display_order = ${data.display_order}
      WHERE id = ${data.id}
    `;
    return data.id;
  } else {
    // Insert new
    const rows = await sql`
      INSERT INTO projects
        (slug, title, one_liner, stat_label, tech_stack,
         problem, approach, result, github_url, demo_url,
         image_urls, display_order)
      VALUES
        (${data.slug}, ${data.title}, ${data.one_liner}, ${data.stat_label}, ${data.tech_stack},
         ${data.problem}, ${data.approach}, ${data.result}, ${data.github_url}, ${data.demo_url},
         ${data.image_urls}, ${data.display_order})
      RETURNING id
    `;
    return rows[0].id as number;
  }
}

/** Delete a project by id. */
export async function deleteProjectById(id: number): Promise<void> {
  const sql = getSQL();
  await sql`DELETE FROM projects WHERE id = ${id}`;
}
