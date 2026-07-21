import { Mail, Phone, Linkedin, Github } from "lucide-react";

interface ContactProps {
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
}

export function Contact({ email, phone, linkedinUrl, githubUrl }: ContactProps) {
  return (
    <section className="max-w-7xl mx-auto w-full mb-16 pt-8 border-t hairline-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3">
            Availability
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Get in Touch</h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-lg">
            Currently open for data analyst and business analyst roles. Let&apos;s discuss how I can find your next $78.1M opportunity.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border hairline-border">
        
        <a href={`mailto:${email}`} className="bg-background p-8 flex flex-col items-center justify-center gap-4 group hover:bg-primary transition-colors cursor-pointer text-center active:scale-95 motion-reduce:transform-none">
          <Mail className="text-primary group-hover:text-surface-card transition-colors" size={32} strokeWidth={1.5} />
          <div className="font-data-md text-data-md text-primary group-hover:text-surface-card transition-colors group-hover:underline break-all">
            {email}
          </div>
        </a>

        <a href={`tel:${phone.replace(/\s/g, "")}`} className="bg-background p-8 flex flex-col items-center justify-center gap-4 group hover:bg-primary transition-colors cursor-pointer text-center active:scale-95 motion-reduce:transform-none">
          <Phone className="text-primary group-hover:text-surface-card transition-colors" size={32} strokeWidth={1.5} />
          <div className="font-data-md text-data-md text-primary group-hover:text-surface-card transition-colors group-hover:underline">
            {phone}
          </div>
        </a>

        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-background p-8 flex flex-col items-center justify-center gap-4 group hover:bg-primary transition-colors cursor-pointer text-center active:scale-95 motion-reduce:transform-none">
          <Linkedin className="text-primary group-hover:text-surface-card transition-colors" size={32} strokeWidth={1.5} />
          <div className="font-data-md text-data-md text-primary group-hover:text-surface-card transition-colors uppercase tracking-widest group-hover:underline">
            LinkedIn
          </div>
        </a>

        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-background p-8 flex flex-col items-center justify-center gap-4 group hover:bg-primary transition-colors cursor-pointer text-center active:scale-95 motion-reduce:transform-none">
          <Github className="text-primary group-hover:text-surface-card transition-colors" size={32} strokeWidth={1.5} />
          <div className="font-data-md text-data-md text-primary group-hover:text-surface-card transition-colors uppercase tracking-widest group-hover:underline">
            GitHub
          </div>
        </a>

      </div>
    </section>
  );
}
