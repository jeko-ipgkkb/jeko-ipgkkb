import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_BUCKET, isBackendConfigured, supabase } from "@/lib/supabase";

export interface Album {
  key: string;
  index: string;
  title: string;
  description: string;
  cover: string;
  count: number;
}

interface GalleryPhoto {
  path: string;
  url: string;
  createdAt: string | null;
}

const MAX_SIZE = 10 * 1024 * 1024;

function sanitizeFileName(name: string) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = (dot > 0 ? name.slice(dot + 1) : "jpg").toLowerCase();
  const safeBase =
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image";
  return `${Date.now()}-${safeBase}.${ext}`;
}

export default function AlbumViewer({
  album,
  onClose,
}: {
  album: Album;
  onClose: () => void;
}) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [lightbox, setLightbox] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async () => {
    if (!isBackendConfigured) {
      setPhotos([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: listError } = await supabase.storage
        .from(GALLERY_BUCKET)
        .list(album.key, { limit: 200, sortBy: { column: "created_at", order: "desc" } });

      if (listError) throw listError;

      const mapped: GalleryPhoto[] = (data ?? [])
        .filter((item) => item.name && !item.name.endsWith("/"))
        .map((item) => {
          const path = `${album.key}/${item.name}`;
          const { data: publicData } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
          return {
            path,
            url: publicData.publicUrl,
            createdAt: item.created_at ?? item.updated_at ?? null,
          };
        })
        .sort((a, b) => (a.createdAt && b.createdAt ? (a.createdAt < b.createdAt ? 1 : -1) : 0));

      setPhotos(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load this album right now.");
    } finally {
      setLoading(false);
    }
  }, [album.key]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, onClose]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadMessage(null);

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setUploadMessage({ type: "error", text: "Only image files are allowed." });
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadMessage({ type: "error", text: "Image is too large — maximum size is 10MB." });
      return;
    }
    if (!isBackendConfigured) {
      setUploadMessage({ type: "error", text: "Photo storage is not connected yet." });
      return;
    }

    setUploading(true);
    try {
      const path = `${album.key}/${sanitizeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(GALLERY_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      setUploadMessage({ type: "success", text: "Photo uploaded to the JEKO gallery." });
      await loadPhotos();
    } catch (err) {
      setUploadMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const active = lightbox !== null ? photos[lightbox] : null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-background-50">
      <div className="flex items-center justify-between border-b border-background-200 px-5 py-4 md:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to albums"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-background-300 text-foreground-950 transition-colors hover:border-primary-950"
          >
            <i className="ri-arrow-left-line text-lg" />
          </button>
          <div>
            <p className="eyebrow text-accent-700">{album.index}</p>
            <h3 className="font-heading text-lg font-bold text-foreground-950 md:text-2xl">
              {album.title}
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close album"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-background-300 text-foreground-950 transition-colors hover:border-primary-950"
        >
          <i className="ri-close-line text-lg" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 rounded-lg border border-dashed border-background-300 bg-background-100 p-6 text-center md:p-8">
            <p className="eyebrow text-foreground-500">ADD TO JEKO GALLERY</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
              Upload a photo to <strong className="font-semibold text-foreground-950">{album.title}</strong>.
              Images only, up to 10MB.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="jeko-alt-field"
              onChange={(event) => handleFiles(event.target.files)}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="mt-5 inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md bg-primary-950 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-background-50 transition-colors hover:bg-accent-600 disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <i className="ri-loader-4-line animate-spin" /> Uploading
                </>
              ) : (
                <>
                  <i className="ri-upload-2-line" /> Choose photo
                </>
              )}
            </button>
            {uploadMessage && (
              <p
                className={`mt-4 text-sm font-medium ${
                  uploadMessage.type === "success" ? "text-accent-700" : "text-secondary-600"
                }`}
              >
                {uploadMessage.text}
              </p>
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="aspect-square animate-pulse rounded-lg bg-background-200" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-secondary-200 bg-secondary-50 py-14 text-center">
              <p className="text-sm font-medium text-secondary-700">{error}</p>
              <button
                type="button"
                onClick={loadPhotos}
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-secondary-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-700"
              >
                <i className="ri-refresh-line" /> Retry
              </button>
            </div>
          )}

          {!loading && !error && photos.length === 0 && (
            <div className="rounded-lg border border-background-200 bg-background-50 py-20 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-xl text-accent-700">
                <i className="ri-image-add-line" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold text-foreground-950">
                This album is still empty
              </p>
              <p className="mt-2 text-sm text-foreground-500">
                {isBackendConfigured
                  ? "Be the first to add a memory to this album."
                  : "Connect photo storage to start uploading memories."}
              </p>
            </div>
          )}

          {!loading && !error && photos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, index) => (
                <button
                  key={photo.path}
                  type="button"
                  onClick={() => setLightbox(index)}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-background-200"
                  aria-label="Open photo"
                >
                  <img
                    src={photo.url}
                    alt={`${album.title} photo ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-primary-950/0 text-background-50 opacity-0 transition-all duration-300 group-hover:bg-primary-950/45 group-hover:opacity-100">
                    <i className="ri-zoom-in-line text-2xl" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <a
              href={active.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-background-50/10 text-background-50 backdrop-blur transition-colors hover:bg-background-50/20"
              aria-label="Download image"
            >
              <i className="ri-download-2-line text-lg" />
            </a>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightbox(null);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-background-50/10 text-background-50 backdrop-blur transition-colors hover:bg-background-50/20"
              aria-label="Close viewer"
            >
              <i className="ri-close-line text-xl" />
            </button>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox ?? 0) > 0 ? (lightbox ?? 0) - 1 : photos.length - 1);
            }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-md bg-background-50/10 text-background-50 backdrop-blur transition-colors hover:bg-background-50/20 md:left-6"
            aria-label="Previous photo"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>

          <img
            src={active.url}
            alt="Gallery photo"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[82vh] max-w-[90vw] rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox ?? 0) < photos.length - 1 ? (lightbox ?? 0) + 1 : 0);
            }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-md bg-background-50/10 text-background-50 backdrop-blur transition-colors hover:bg-background-50/20 md:right-6"
            aria-label="Next photo"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </div>
      )}
    </div>
  );
}