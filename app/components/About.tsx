import { GraduationCap, Award, FileBadge } from "lucide-react";

interface AboutProps {
  aboutText: string;
}

export function About({ aboutText }: AboutProps) {
  return (
    <section id="about" className="max-w-7xl mx-auto w-full mb-16 pt-8 scroll-mt-20 border-t hairline-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-3">
            Profile & Education
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">About</h2>
        </div>
        
        <div className="md:col-span-8 flex flex-col gap-6">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            {aboutText}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="surface-card p-6 border hairline-border">
              <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                <GraduationCap size={16} strokeWidth={1.5} className="text-primary" />
                Education
              </h3>
              <p className="font-body-md text-primary font-medium">B.Tech Information Technology</p>
              <p className="font-body-md text-on-surface-variant mt-1 text-sm">Hemvati Nandan Bahuguna Garhwal University, Srinagar (Garhwal), Uttarakhand</p>
              <p className="font-data-md text-data-md text-on-surface-variant mt-4 text-sm border-t hairline-border pt-3">2023–2027 (4th year)</p>
            </div>
            
            <div className="surface-card p-6 border hairline-border flex flex-col justify-between">
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                  <Award size={16} strokeWidth={1.5} className="text-primary" />
                  Achievements
                </h3>
                <ul className="list-disc list-outside ml-4 font-body-md text-primary text-sm flex flex-col gap-3">
                  <li className="pl-1">ONGC Foundation Scholar</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Wall */}
          <div className="mt-4 border hairline-border surface-card">
            <div className="border-b hairline-border px-6 py-4 flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              <FileBadge size={16} strokeWidth={1.5} className="text-primary" />
              Certifications
            </div>
            
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b hairline-border hover:bg-surface-bright transition-colors">
                <p className="font-body-md text-primary text-sm font-medium mb-1">Data Analytics Internship</p>
                <p className="font-body-md text-on-surface-variant text-sm mb-2">PrimrIQ</p>
                <div className="font-data-md text-xs text-outline">ID: PIQ/CERT/260714/DA/C991</div>
              </div>
              
              <div className="px-6 py-4 hover:bg-surface-bright transition-colors">
                <p className="font-body-md text-primary text-sm font-medium mb-1">Data Analysis: SQL, Tableau, Power BI & Excel</p>
                <p className="font-body-md text-on-surface-variant text-sm mb-2">Udemy (April 2026)</p>
                <div className="font-data-md text-xs text-outline">ID: UC-0515de3c-1f95-4c74-a287-1371cece7eba</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
