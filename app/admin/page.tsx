import { getAllSiteContentRows, getProjects } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Settings, LayoutGrid } from "lucide-react";

export default async function AdminDashboard() {
  const [contentRows, projects] = await Promise.all([
    getAllSiteContentRows(),
    getProjects(),
  ]);

  const lastUpdated = contentRows.reduce((latest, row) => {
    const rowDate = new Date(row.updated_at);
    return rowDate > latest ? rowDate : latest;
  }, new Date(0));

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Overview</h1>
        <p className="font-body-lg text-on-surface-variant">
          Manage your portfolio content and projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Content Card */}
        <div className="surface-card border hairline-border p-8 flex flex-col justify-between group hover:border-forest-green transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-hairline p-3">
                <Settings size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">Site Content</h2>
            </div>
            
            <div className="font-body-md text-on-surface mb-8">
              <div className="flex justify-between items-center py-2 border-b hairline-border">
                <span className="text-on-surface-variant">Fields</span>
                <span className="font-data-md font-bold">{contentRows.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b hairline-border">
                <span className="text-on-surface-variant">Last Updated</span>
                <span className="font-data-md">{lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <Link href="/admin/content" className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-forest-green hover:underline">
            Edit Content <ArrowRight size={16} />
          </Link>
        </div>

        {/* Projects Card */}
        <div className="surface-card border hairline-border p-8 flex flex-col justify-between group hover:border-forest-green transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-hairline p-3">
                <LayoutGrid size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">Projects</h2>
            </div>
            
            <div className="font-body-md text-on-surface mb-8">
              <div className="flex justify-between items-center py-2 border-b hairline-border">
                <span className="text-on-surface-variant">Total Projects</span>
                <span className="font-data-md font-bold">{projects.length}</span>
              </div>
            </div>
          </div>
          
          <Link href="/admin/projects" className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-forest-green hover:underline">
            Manage Projects <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
