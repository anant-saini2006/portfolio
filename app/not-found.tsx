import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-grid-margin py-stack-gap md:py-32 flex flex-col items-center justify-center text-center relative z-10">
        
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center justify-center gap-2 mb-4">
          <AlertTriangle size={16} strokeWidth={1.5} className="text-forest-green" />
          Error 404
        </div>
        
        <h1 className="font-headline-xl text-headline-xl text-primary mb-6">
          Record Not Found
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface max-w-lg mb-8">
          The data point you're looking for doesn't exist in this dataset. It might have been dropped during cleaning.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center bg-forest-green text-surface-card px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 motion-reduce:transform-none"
        >
          Return to Dashboard
        </Link>
        
      </main>
      <Footer
        linkedinUrl="https://linkedin.com/in/anant-saini-0a6949210"
        githubUrl="https://github.com/anant-saini2006"
        email="duanantsaini2006@gmail.com"
      />
    </>
  );
}
