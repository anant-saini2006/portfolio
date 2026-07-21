interface FooterProps {
  linkedinUrl: string;
  githubUrl: string;
  email: string;
}

export function Footer({ linkedinUrl, githubUrl, email }: FooterProps) {
  return (
    <footer className="bg-surface-container border-t hairline-border w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-grid-margin py-stack-gap max-w-7xl mx-auto gap-4">
        <div className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant text-center md:text-left">
          © 2026 Anant Saini. All data processed with clinical precision.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary decoration-2 transition-all duration-300 ease-in-out font-label-sm text-label-sm uppercase tracking-wider" href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary decoration-2 transition-all duration-300 ease-in-out font-label-sm text-label-sm uppercase tracking-wider" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary decoration-2 transition-all duration-300 ease-in-out font-label-sm text-label-sm uppercase tracking-wider" href={`mailto:${email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
