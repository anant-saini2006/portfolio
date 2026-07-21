"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyPassword, createSession, destroySession, verifySession } from "./auth";
import { upsertSiteContent, upsertProject, deleteProjectById } from "./db";

// ─── Auth actions ────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const password = formData.get("password") as string;

  if (!password || !verifyPassword(password)) {
    return { error: "Invalid password. Please try again." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// ─── Content actions ─────────────────────────────────────────────────

export async function updateSiteContentAction(
  formData: FormData
): Promise<void> {
  const isValid = await verifySession();
  if (!isValid) redirect("/admin/login");

  const keys = [
    "tagline",
    "about_text",
    "contact_email",
    "contact_phone",
    "linkedin_url",
    "github_url",
    "resume_url",
    "skills_json",
    "experience_json",
  ];

  for (const key of keys) {
    const value = formData.get(key) as string | null;
    if (value !== null) {
      await upsertSiteContent(key, value);
    }
  }

  revalidatePath("/");
  revalidatePath("/projects/[slug]", "page");
  redirect("/admin/content?saved=1");
}

// ─── Project actions ─────────────────────────────────────────────────

export async function upsertProjectAction(
  formData: FormData
): Promise<void> {
  const isValid = await verifySession();
  if (!isValid) redirect("/admin/login");

  const rawId = formData.get("id") as string;
  const id = rawId && rawId !== "new" ? parseInt(rawId, 10) : undefined;

  const techStackRaw = formData.get("tech_stack") as string;
  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const imageUrlsRaw = formData.get("image_urls") as string;
  const imageUrls = imageUrlsRaw
    ? imageUrlsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  await upsertProject({
    id,
    slug: (formData.get("slug") as string) || "",
    title: (formData.get("title") as string) || "",
    one_liner: (formData.get("one_liner") as string) || "",
    stat_label: (formData.get("stat_label") as string) || "",
    tech_stack: techStack,
    problem: (formData.get("problem") as string) || "",
    approach: (formData.get("approach") as string) || "",
    result: (formData.get("result") as string) || "",
    github_url: (formData.get("github_url") as string) || null,
    demo_url: (formData.get("demo_url") as string) || null,
    image_urls: imageUrls,
    display_order: parseInt((formData.get("display_order") as string) || "0", 10),
  });

  revalidatePath("/");
  revalidatePath("/projects/[slug]", "page");
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(
  formData: FormData
): Promise<void> {
  const isValid = await verifySession();
  if (!isValid) redirect("/admin/login");

  const id = parseInt(formData.get("id") as string, 10);
  if (!isNaN(id)) {
    await deleteProjectById(id);
  }

  revalidatePath("/");
  redirect("/admin/projects?deleted=1");
}
