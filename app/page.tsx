import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { ProjectsPreview } from "./components/ProjectsPreview";
import { Contact } from "./components/Contact";
import { getSiteContent, getProjects } from "@/lib/db";
import type { SkillGroup } from "./components/Skills";
import type { ExperienceEntry } from "./components/Experience";

export const revalidate = 60; // ISR — rebuild at most once per minute

export default async function Home() {
  const [content, projects] = await Promise.all([
    getSiteContent(),
    getProjects(),
  ]);

  const tagline =
    content.tagline ??
    "I turn raw data into decisions — like finding a profit opportunity hiding in loan-grade risk.";
  const aboutText =
    content.about_text ??
    "Final-year B.Tech IT (Data Science & AI-ML) undergraduate and ONGC Foundation Scholar with hands-on internship experience and three end-to-end analytics projects across banking, retail, and quick-commerce. Based in Roorkee, Uttarakhand, India.";
  const email = content.contact_email ?? "duanantsaini2006@gmail.com";
  const phone = content.contact_phone ?? "+91 9837980319";
  const linkedinUrl =
    content.linkedin_url ?? "https://linkedin.com/in/anant-saini-0a6949210";
  const githubUrl =
    content.github_url ?? "https://github.com/anant-saini2006";
  const resumeUrl = content.resume_url ?? "/resume.pdf";

  let skills: SkillGroup[] = [
    { category: "BI & Visualization", items: ["Power BI", "Tableau", "Streamlit", "Plotly", "Matplotlib", "Seaborn"] },
    { category: "Programming & Database", items: ["Python (Pandas, NumPy, SciPy)", "SQL", "PostgreSQL", "SQLite"] },
    { category: "Analytics & Statistics", items: ["Statistical Testing", "Cohort & Risk Analysis", "EDA", "KPI Design"] },
    { category: "Tools", items: ["Excel (Pivot Tables, Power Query, openpyxl)", "Git & GitHub"] },
  ];
  if (content.skills_json) {
    try {
      skills = JSON.parse(content.skills_json);
    } catch {
      // keep fallback
    }
  }

  let experience: ExperienceEntry[] = [
    {
      title: "Data Analytics Intern",
      company: "PrimrIQ",
      period: "June–July 2026",
      bullets: [
        "Rebuilt a broken ERP data pipeline in Python (openpyxl) after merged-cell corruption, scored 95/100.",
        "Authored 10 SQL queries against SQLite, revised from an initial 78/100 using window functions and dynamic filtering per mentor feedback.",
      ],
    },
  ];
  if (content.experience_json) {
    try {
      experience = JSON.parse(content.experience_json);
    } catch {
      // keep fallback
    }
  }

  const projectPreviews = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    one_liner: p.one_liner,
    stat_label: p.stat_label,
  }));

  return (
    <>
      <Header resumeUrl={resumeUrl} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-grid-margin py-stack-gap md:py-12 flex flex-col gap-12 relative z-10">
        <Hero tagline={tagline} />
        <About aboutText={aboutText} />
        <Skills skills={skills} />
        <Experience entries={experience} />
        <ProjectsPreview projects={projectPreviews} />
        <Contact
          email={email}
          phone={phone}
          linkedinUrl={linkedinUrl}
          githubUrl={githubUrl}
        />
      </main>
      <Footer
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
        email={email}
      />
    </>
  );
}
