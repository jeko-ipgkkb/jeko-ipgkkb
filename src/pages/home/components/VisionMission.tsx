import { visionText, missionPoints } from "@/mocks/site";
import Reveal from "@/components/base/Reveal";

export default function VisionMission() {
  return (
    <section id="vision" className="relative overflow-hidden bg-background-50 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-primary-950 to-transparent" />
        <div className="absolute left-0 top-40 h-px w-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        <div className="absolute left-0 top-60 h-px w-full bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
      </div>

      <div className="jeko-container relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow text-accent-700">VISION &amp; MISSION</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
              PURPOSE IN MOTION
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal variant="left">
            <article className="flex h-full flex-col justify-between rounded-lg border border-background-200 bg-background-100 p-8 md:p-12">
              <div>
                <span className="font-heading text-7xl font-bold text-accent-500 md:text-8xl">01</span>
                <h3 className="mt-6 font-heading text-3xl font-bold tracking-tight text-foreground-950 md:text-4xl">
                  VISION
                </h3>
                <p className="mt-6 text-base leading-relaxed text-foreground-600 md:text-lg">
                  {visionText}
                </p>
              </div>
              <div className="mt-10 h-1 w-20 rounded-full bg-accent-500" />
            </article>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <article className="flex h-full flex-col justify-between rounded-lg border border-primary-900 bg-primary-950 p-8 text-background-100 md:p-12">
              <div>
                <span className="font-heading text-7xl font-bold text-secondary-400 md:text-8xl">02</span>
                <h3 className="mt-6 font-heading text-3xl font-bold tracking-tight text-background-50 md:text-4xl">
                  MISSION
                </h3>
                <ul className="mt-6 space-y-4">
                  {missionPoints.map((point, index) => (
                    <li key={point} className="flex gap-4">
                      <span className="mt-1 font-heading text-sm font-bold text-accent-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-background-200 md:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 h-1 w-20 rounded-full bg-secondary-500" />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}