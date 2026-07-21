import { getProjectById } from "@/lib/db";
import { upsertProjectAction } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AdminProjectEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === "new";
  
  let project = null;
  if (!isNew) {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) notFound();
    
    project = await getProjectById(id);
    if (!project) notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/admin/projects" className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2">
          {isNew ? "New Project" : `Edit Project: ${project?.title}`}
        </h1>
      </div>

      <form action={upsertProjectAction} className="surface-card border hairline-border p-8 flex flex-col gap-8">
        <input type="hidden" name="id" value={isNew ? "new" : project?.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-primary border-b hairline-border pb-2">Basic Info</h2>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Title *</label>
              <input type="text" id="title" name="title" defaultValue={project?.title || ""} required className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="font-label-sm uppercase tracking-widest text-on-surface-variant">URL Slug *</label>
              <input type="text" id="slug" name="slug" defaultValue={project?.slug || ""} required className="bg-background border hairline-border p-3 font-data-md text-sm text-primary focus:outline-none focus:border-forest-green" />
              <span className="text-xs text-on-surface-variant font-body-md">Example: my-awesome-project</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="one_liner" className="font-label-sm uppercase tracking-widest text-on-surface-variant">One-Liner Synopsis *</label>
              <input type="text" id="one_liner" name="one_liner" defaultValue={project?.one_liner || ""} required className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="stat_label" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Key Stat *</label>
                <input type="text" id="stat_label" name="stat_label" defaultValue={project?.stat_label || ""} required className="bg-background border hairline-border p-3 font-data-md text-sm text-primary focus:outline-none focus:border-forest-green" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="display_order" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Display Order *</label>
                <input type="number" id="display_order" name="display_order" defaultValue={project?.display_order ?? 0} required className="bg-background border hairline-border p-3 font-data-md text-sm text-primary focus:outline-none focus:border-forest-green" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="image_urls" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Image URLs (comma separated)</label>
              <input type="text" id="image_urls" name="image_urls" defaultValue={project?.image_urls?.join(", ") || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
              <span className="text-xs text-on-surface-variant font-body-md">Example: /projects/screenshot1.png</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tech_stack" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Tech Stack (comma separated)</label>
              <input type="text" id="tech_stack" name="tech_stack" defaultValue={project?.tech_stack?.join(", ") || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-primary border-b hairline-border pb-2">Case Study Details</h2>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="problem" className="font-label-sm uppercase tracking-widest text-on-surface-variant">The Problem</label>
              <textarea id="problem" name="problem" defaultValue={project?.problem || ""} rows={4} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="approach" className="font-label-sm uppercase tracking-widest text-on-surface-variant">The Approach</label>
              <textarea id="approach" name="approach" defaultValue={project?.approach || ""} rows={4} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="result" className="font-label-sm uppercase tracking-widest text-on-surface-variant">The Result</label>
              <textarea id="result" name="result" defaultValue={project?.result || ""} rows={4} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="github_url" className="font-label-sm uppercase tracking-widest text-on-surface-variant">GitHub URL</label>
                <input type="url" id="github_url" name="github_url" defaultValue={project?.github_url || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="demo_url" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Demo URL</label>
                <input type="url" id="demo_url" name="demo_url" defaultValue={project?.demo_url || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-4 border-t hairline-border">
          <button 
            type="submit" 
            className="inline-flex items-center justify-center bg-forest-green text-surface-card px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 motion-reduce:transform-none"
          >
            {isNew ? "Create Project" : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
