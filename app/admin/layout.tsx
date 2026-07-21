import Link from "next/link";
import { logoutAction } from "@/lib/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-surface-card border-b hairline-border sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-grid-margin py-cell-padding-v max-w-7xl mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tighter text-primary flex items-center gap-2">
            <Link href="/admin" className="hover:text-forest-green transition-colors">Admin Dashboard</Link>
            <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest font-normal">| <Link href="/" className="hover:underline">View Site</Link></span>
          </div>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/admin/content">Content</Link>
            <Link className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors" href="/admin/projects">Projects</Link>
            
            <form action={logoutAction}>
              <button type="submit" className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-grid-margin py-stack-gap md:py-12">
        {children}
      </main>
    </div>
  );
}
