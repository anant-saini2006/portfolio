export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

interface ExperienceProps {
  entries: ExperienceEntry[];
}

export function Experience({ entries }: ExperienceProps) {
  return (
    <section id="experience" className="max-w-7xl mx-auto w-full mb-16 pt-8 scroll-mt-20 border-t hairline-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3">
            Professional Timeline
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Experience</h2>
        </div>
        
        <div className="md:col-span-8 flex flex-col gap-6">
          {entries.map((entry, idx) => (
            <div key={idx} className="border hairline-border bg-white flex flex-col hover:bg-surface-bright hover:-translate-y-1 hover:border-forest-green hover:shadow-sm transition-all motion-reduce:transition-none motion-reduce:transform-none cursor-default">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b hairline-border bg-surface-card px-6 py-4">
                <div>
                  <h3 className="font-headline-md text-primary">{entry.title}</h3>
                  <p className="font-body-md text-on-surface-variant font-medium mt-1">{entry.company}</p>
                </div>
                <div className="font-data-md text-data-md text-outline mt-2 sm:mt-0 text-sm">
                  {entry.period}
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <ul className="list-disc list-inside flex flex-col gap-3 font-body-md text-on-surface leading-relaxed text-sm">
                  {entry.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
