"use client";

import Link from "next/link";
import { useState } from "react";

export interface ProjectPreviewItem {
  id: number;
  slug: string;
  title: string;
  one_liner: string;
  stat_label: string;
}

interface ProjectsPreviewProps {
  projects: ProjectPreviewItem[];
}

/** Map stat_label values to color classes. Forest-green for money/multiplier stats. */
function statColor(stat: string): string {
  if (stat.includes("$") || stat.includes("x") || stat.includes("X")) {
    return "text-forest-green";
  }
  return "text-primary";
}

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const [flashedId, setFlashedId] = useState<number | null>(null);

  const triggerFlash = (id: number) => {
    setFlashedId(id);
    setTimeout(() => setFlashedId(null), 500);
  };

  return (
    <section id="projects" className="max-w-7xl mx-auto w-full mb-16 pt-8 scroll-mt-20 border-t hairline-border">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3">
            Sorted by impact
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Projects Ledger</h2>
        </div>
      </div>
      
      <div className="border hairline-border bg-white flex flex-col gap-px bg-hairline">
        {/* Header */}
        <div className="hidden md:flex bg-surface-card px-cell-padding-h py-cell-padding-v font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          <div className="w-2/12">ID</div>
          <div className="w-4/12">Project</div>
          <div className="w-4/12">Synopsis</div>
          <div className="w-2/12 text-right">Key Stat</div>
        </div>
        
        {/* Rows */}
        {projects.map((project, idx) => (
          <Link 
            href={`/projects/${project.slug}`} 
            key={project.id}
            onMouseEnter={() => triggerFlash(project.id)}
            className={`flex flex-col md:flex-row md:items-center px-cell-padding-h py-6 md:py-cell-padding-v bg-surface-container-lowest group cursor-pointer hover:-translate-y-1 hover:border-forest-green hover:shadow-sm transition-all motion-reduce:transition-none motion-reduce:transform-none border border-transparent ${idx === 0 ? '' : 'mt-px'} hover:z-10 relative`}
          >
            <div className="w-full md:w-2/12 text-data-md font-data-md text-on-surface-variant mb-2 md:mb-0">
              PRJ-{String(project.id).padStart(3, "0")}
            </div>
            <div className="w-full md:w-4/12 text-headline-md font-headline-md text-primary group-hover:text-forest-green group-hover:underline transition-colors mb-2 md:mb-0 md:pr-4">
              {project.title}
            </div>
            <div className="w-full md:w-4/12 text-body-md font-body-md text-on-surface-variant mb-4 md:mb-0 md:pr-4 text-sm">
              {project.one_liner}
            </div>
            <div className={`w-full md:w-2/12 text-data-lg font-data-lg md:text-right ${statColor(project.stat_label)} ${flashedId === project.id ? 'flash-active' : ''}`}>
              {project.stat_label}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
