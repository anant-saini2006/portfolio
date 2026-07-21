import { getProjects } from "@/lib/db";
import { deleteProjectAction } from "@/lib/actions";
import Link from "next/link";
import { Check, Plus, Pencil } from "lucide-react";
import { DeleteProjectButton } from "./DeleteProjectButton";

export default async function AdminProjectsPage(props: { searchParams: Promise<{ saved?: string, deleted?: string }> }) {
  const searchParams = await props.searchParams;
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Projects</h1>
          <p className="font-body-lg text-on-surface-variant">
            Manage your portfolio case studies.
          </p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-surface-card px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider hover:bg-forest-green transition-all"
        >
          <Plus size={16} strokeWidth={2} /> Add Project
        </Link>
      </div>

      {(searchParams.saved || searchParams.deleted) && (
        <div className="p-4 bg-green-50 border border-green-200 text-forest-green text-sm font-body-md flex items-center gap-2">
          <Check size={16} /> Project {searchParams.saved ? 'saved' : 'deleted'} successfully. The public site has been updated.
        </div>
      )}

      <div className="surface-card border hairline-border overflow-hidden">
        <div className="hidden md:flex bg-surface-container-low px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border-b hairline-border">
          <div className="w-1/12">Order</div>
          <div className="w-4/12">Title</div>
          <div className="w-3/12">Slug</div>
          <div className="w-2/12">Stat</div>
          <div className="w-2/12 text-right">Actions</div>
        </div>
        
        {projects.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant font-body-md">
            No projects found.
          </div>
        ) : (
          projects.map((project, idx) => (
            <div key={project.id} className={`flex flex-col md:flex-row md:items-center px-6 py-4 hover:bg-surface-bright transition-colors ${idx !== 0 ? 'border-t hairline-border' : ''}`}>
              <div className="w-full md:w-1/12 font-data-md text-sm text-on-surface-variant mb-1 md:mb-0">
                {project.display_order}
              </div>
              <div className="w-full md:w-4/12 font-headline-sm text-primary mb-1 md:mb-0 pr-4">
                {project.title}
              </div>
              <div className="w-full md:w-3/12 font-data-md text-xs text-on-surface-variant mb-2 md:mb-0 pr-4">
                {project.slug}
              </div>
              <div className="w-full md:w-2/12 font-data-md text-sm text-forest-green font-bold mb-4 md:mb-0">
                {project.stat_label}
              </div>
              <div className="w-full md:w-2/12 flex items-center justify-end gap-3">
                <Link href={`/admin/projects/${project.id}`} className="text-on-surface-variant hover:text-primary transition-colors p-2" title="Edit">
                  <Pencil size={18} strokeWidth={1.5} />
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
