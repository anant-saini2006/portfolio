"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";
import { AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-10">
      
      <div className="w-full max-w-md surface-card border hairline-border p-8 md:p-12">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3 text-center">
          Restricted Access
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary mb-8 text-center">
          Admin Login
        </h1>
        
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-body-md flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-600" />
            {state.error}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              className="bg-background border hairline-border px-4 py-3 font-body-md text-primary focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full inline-flex items-center justify-center bg-forest-green text-surface-card px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 motion-reduce:transform-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isPending ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>

    </div>
  );
}
