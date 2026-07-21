export interface SkillGroup {
  category: string;
  items: string[];
}

interface SkillsProps {
  skills: SkillGroup[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="max-w-7xl mx-auto w-full mb-16 pt-8 scroll-mt-20 border-t hairline-border">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3">
            Matrix Layout
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Technical Expertise</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border hairline-border">
        {skills.map((skillGroup, index) => (
          <div key={index} className="bg-background flex flex-col h-full group hover:bg-surface-bright transition-colors">
            <div className="p-4 border-b hairline-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
              {skillGroup.category}
            </div>
            <ul className="p-4 flex flex-col gap-3 font-body-md text-sm text-primary flex-grow">
              {skillGroup.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary mt-1 text-[10px]">■</span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
