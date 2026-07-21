"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  resumeUrl?: string;
}

export function Header({ resumeUrl = "/resume.pdf" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b hairline-border sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-grid-margin py-cell-padding-v max-w-7xl mx-auto">
        <div className="text-headline-md font-headline-md font-bold tracking-tighter text-primary">
          <Link href="/">Anant Saini</Link>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/#about">About</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/#skills">Skills</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/#experience">Experience</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/#projects">Projects</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-forest-green text-surface-card px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 motion-reduce:transform-none">
            Download Résumé
          </a>
        </div>

        <button 
          className="md:hidden text-primary p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t hairline-border bg-background px-grid-margin py-4 flex flex-col gap-4">
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider" href="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider" href="/#skills" onClick={() => setIsMenuOpen(false)}>Skills</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider" href="/#experience" onClick={() => setIsMenuOpen(false)}>Experience</Link>
          <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider" href="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-forest-green text-surface-card px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider mt-2 w-full">
            Download Résumé
          </a>
        </div>
      )}
    </header>
  );
}
