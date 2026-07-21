import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug } from "@/lib/db";
import { getSiteContent } from "@/lib/db";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const [project, content] = await Promise.all([
    getProjectBySlug(slug),
    getSiteContent(),
  ]);

  if (!project) {
    notFound();
  }

  const linkedinUrl = content.linkedin_url ?? "https://linkedin.com/in/anant-saini-0a6949210";
  const githubUrl = content.github_url ?? "https://github.com/anant-saini2006";
  const email = content.contact_email ?? "duanantsaini2006@gmail.com";
  const resumeUrl = content.resume_url ?? "/resume.pdf";

  return (
    <>
      <Header resumeUrl={resumeUrl} />
      <main className="flex-grow w-full max-w-4xl mx-auto px-grid-margin py-stack-gap md:py-16 flex flex-col gap-12 relative z-10">
        
        <div className="mb-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>

        <article className="surface-card border hairline-border p-8 md:p-12">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12 border-b hairline-border pb-8">
            {project.tech_stack.map((t: string, i: number) => (
              <span key={i} className="font-data-md text-xs bg-surface-container-high px-3 py-1 rounded text-on-surface-variant border hairline-border">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            <section>
              <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">The Problem</h2>
              <p className="font-body-lg text-primary leading-relaxed">{project.problem}</p>
            </section>
            
            <section>
              <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">The Approach</h2>
              <p className="font-body-lg text-primary leading-relaxed">{project.approach}</p>
              
              {/* Image Rendering */}
              <div className="w-full bg-surface-container-high border hairline-border mt-6 flex items-center justify-center relative overflow-hidden group">
                {project.image_urls && project.image_urls.length > 0 ? (
                  <img 
                    src={project.image_urls[0]} 
                    alt={`Screenshot for ${project.title}`}
                    className="w-full h-auto object-cover block"
                  />
                ) : (
                  <div className="aspect-[16/9] w-full flex items-center justify-center">
                    <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest z-10">
                      [ Insert Screenshot Here ]
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">The Result</h2>
              <p className="font-body-lg text-primary leading-relaxed">{project.result}</p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t hairline-border flex flex-wrap gap-4">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-surface-card px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-forest-green transition-all active:scale-95 motion-reduce:transform-none">
                <Github size={18} strokeWidth={1.5} /> View on GitHub
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border hairline-border bg-surface-card text-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-bright transition-all active:scale-95 motion-reduce:transform-none">
                <ExternalLink size={18} strokeWidth={1.5} /> View Live Demo
              </a>
            )}
          </div>
        </article>

      </main>
      <Footer linkedinUrl={linkedinUrl} githubUrl={githubUrl} email={email} />
    </>
  );
}
