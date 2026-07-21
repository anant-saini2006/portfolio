import { getSiteContent } from "@/lib/db";
import { updateSiteContentAction } from "@/lib/actions";
import { Check } from "lucide-react";

export default async function AdminContentPage(props: { searchParams: Promise<{ saved?: string }> }) {
  const searchParams = await props.searchParams;
  const content = await getSiteContent();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Edit Content</h1>
        <p className="font-body-lg text-on-surface-variant">
          Update the global text, links, and JSON data used across the portfolio.
        </p>
      </div>

      {searchParams.saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-forest-green text-sm font-body-md flex items-center gap-2">
          <Check size={16} /> Content saved successfully. The public site has been updated.
        </div>
      )}

      <form action={updateSiteContentAction} className="surface-card border hairline-border p-8 flex flex-col gap-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Text */}
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-primary border-b hairline-border pb-2">Hero & About</h2>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="tagline" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Tagline</label>
              <textarea 
                id="tagline" 
                name="tagline" 
                defaultValue={content.tagline || ""} 
                rows={3}
                className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="about_text" className="font-label-sm uppercase tracking-widest text-on-surface-variant">About Text</label>
              <textarea 
                id="about_text" 
                name="about_text" 
                defaultValue={content.about_text || ""} 
                rows={5}
                className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green"
              />
            </div>
          </div>

          {/* Links & Contact */}
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-primary border-b hairline-border pb-2">Links & Contact</h2>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="contact_email" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Email</label>
              <input type="email" id="contact_email" name="contact_email" defaultValue={content.contact_email || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact_phone" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Phone</label>
              <input type="text" id="contact_phone" name="contact_phone" defaultValue={content.contact_phone || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="linkedin_url" className="font-label-sm uppercase tracking-widest text-on-surface-variant">LinkedIn URL</label>
              <input type="url" id="linkedin_url" name="linkedin_url" defaultValue={content.linkedin_url || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="github_url" className="font-label-sm uppercase tracking-widest text-on-surface-variant">GitHub URL</label>
              <input type="url" id="github_url" name="github_url" defaultValue={content.github_url || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="resume_url" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Resume URL</label>
              <input type="text" id="resume_url" name="resume_url" defaultValue={content.resume_url || ""} className="bg-background border hairline-border p-3 font-body-md text-primary focus:outline-none focus:border-forest-green" />
            </div>
          </div>
        </div>

        {/* JSON Data */}
        <div className="flex flex-col gap-6 mt-4">
          <h2 className="font-headline-md text-primary border-b hairline-border pb-2">Structured Data (JSON)</h2>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="skills_json" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Skills Array</label>
            <textarea 
              id="skills_json" 
              name="skills_json" 
              defaultValue={content.skills_json || ""} 
              rows={12}
              className="bg-background border hairline-border p-3 font-data-md text-sm text-primary focus:outline-none focus:border-forest-green font-mono"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="experience_json" className="font-label-sm uppercase tracking-widest text-on-surface-variant">Experience Array</label>
            <textarea 
              id="experience_json" 
              name="experience_json" 
              defaultValue={content.experience_json || ""} 
              rows={12}
              className="bg-background border hairline-border p-3 font-data-md text-sm text-primary focus:outline-none focus:border-forest-green font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t hairline-border">
          <button 
            type="submit" 
            className="inline-flex items-center justify-center bg-forest-green text-surface-card px-8 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 motion-reduce:transform-none"
          >
            Save Content
          </button>
        </div>

      </form>
    </div>
  );
}
