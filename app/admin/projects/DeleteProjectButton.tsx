"use client";

import { deleteProjectAction } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ id }: { id: number }) {
  return (
    <form 
      action={deleteProjectAction} 
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this project?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2" title="Delete">
        <Trash2 size={18} strokeWidth={1.5} />
      </button>
    </form>
  );
}
