import { useState } from "react";
import { galleryAlbums } from "@/mocks/gallery";
import { isBackendConfigured } from "@/lib/supabase";
import Reveal from "@/components/base/Reveal";
import AlbumViewer, { type Album } from "@/pages/home/components/gallery/AlbumViewer";

export default function Gallery() {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);

  return (
    <section id="gallery" className="bg-background-50 py-20 md:py-28">
      <div className="jeko-container">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-accent-700">GALLERY</p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
                JEKO IN MOTION
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-foreground-500">
              Four albums capturing class moments, sports and activities, achievements and the
              candid in-between frames.
            </p>
          </div>
        </Reveal>

        {!isBackendConfigured && (
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-accent-200 bg-accent-50 px-5 py-4">
              <span className="flex h-8 w-8 items-center justify-center text-accent-700">
                <i className="ri-database-2-line text-lg" />
              </span>
              <p className="text-sm text-accent-900">
                Photo storage is not connected yet — albums will become live once the backend is
                linked.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {galleryAlbums.map((album, index) => (
            <Reveal key={album.key} delay={(index % 2) * 80}>
              <button
                type="button"
                onClick={() => setOpenAlbum(album)}
                className="group relative block h-[300px] w-full overflow-hidden rounded-lg border border-background-200 text-left md:h-[360px]"
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/25 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
                  <span className="font-heading text-sm font-bold tracking-[0.3em] text-accent-400">
                    {album.index}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-background-50 md:text-3xl">
                    {album.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-background-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {album.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-background-50">
                    Open album
                    <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {openAlbum && <AlbumViewer album={openAlbum} onClose={() => setOpenAlbum(null)} />}
    </section>
  );
}