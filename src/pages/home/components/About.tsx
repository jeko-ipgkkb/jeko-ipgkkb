import { aboutParagraphs, glanceStats, aboutImage } from "@/mocks/site";
import Reveal from "@/components/base/Reveal";
import CountUp from "@/components/base/CountUp";

export default function About() {
  return (
    <section id="about" className="relative bg-background-100 py-20 md:py-28">
      <div className="jeko-container">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-secondary-600">ABOUT JEKO</p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
                MORE THAN
                <br />
                A CLUB.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative mt-10 h-[320px] w-full overflow-hidden rounded-lg md:h-[420px]">
                <img
                  src={aboutImage}
                  alt="JEKO members training together outdoors"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="space-y-6 border-l-2 border-accent-500 pl-6 md:pl-8">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 20)} className="text-base leading-relaxed text-foreground-600 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 rounded-lg border border-background-200 bg-background-50 p-6 md:p-8">
                <h3 className="eyebrow text-foreground-500">JEKO AT A GLANCE</h3>
                <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                  {glanceStats.map((stat) => (
                    <div key={stat.label} className="border-t border-background-200 pt-4">
                      <span className="font-heading text-4xl font-bold text-primary-950 md:text-5xl">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </span>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}