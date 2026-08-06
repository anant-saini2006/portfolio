"use client";

import { useState, useRef } from "react";
import { Upload, Check, AlertCircle, Camera } from "lucide-react";

interface ProfilePhotoUploaderProps {
  currentPhotoUrl: string | null;
}

export function ProfilePhotoUploader({ currentPhotoUrl }: ProfilePhotoUploaderProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(currentPhotoUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPhotoUrl(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-6">
        {/* Photo preview */}
        <div className="relative group flex-shrink-0">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-hairline bg-surface-bright flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-headline-lg text-on-surface-variant select-none">
                AS
              </span>
            )}
          </div>
          
          {/* Hover overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            disabled={uploading}
          >
            <Camera size={24} className="text-white" />
          </button>
        </div>

        {/* Upload zone */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-forest-green bg-green-50/50"
                : "border-hairline hover:border-forest-green"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={20} className="mx-auto mb-2 text-on-surface-variant" />
            <p className="font-body-md text-sm text-on-surface-variant">
              {uploading ? "Uploading..." : "Drag & drop or click to upload"}
            </p>
            <p className="font-data-md text-xs text-outline mt-1">
              JPEG, PNG, WebP, or GIF — max 2MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Status messages */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 font-body-md text-sm">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-forest-green font-body-md text-sm">
              <Check size={14} />
              Photo updated successfully. The site has been updated.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
