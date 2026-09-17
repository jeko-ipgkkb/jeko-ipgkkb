import { advisors } from "@/mocks/people";
import Reveal from "@/components/base/Reveal";

export default function Advisors() {
  const featured = advisors[0];
  const rest = advisors.slice(1);

  return (
    <section id="advisors" className="bg-background-100 py-20 md:py-28">
      <div className="jeko-container">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-secondary-600">FACULTY ADVISORS</p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
                THE PEOPLE BEHIND JEKO
              </h2>
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-foreground-500">
              Guidance, support and inspiration.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <article className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-background-200 bg-background-50 lg:grid-cols-12">
            <div className="group relative h-[340px] overflow-hidden lg:col-span-5 lg:h-full lg:min-h-[420px]">
              <img
                src={featured.image}
                alt={featured.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-5 top-5 rounded-full bg-accent-500 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-background-50">
                Lead Advisor
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:col-span-7 lg:p-12">
              <p className="eyebrow text-accent-700">{featured.role}</p>
              <h3 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground-950 md:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-600">
                {featured.description}
              </p>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {rest.map((advisor, index) => (
            <Reveal key={advisor.id} delay={index * 60}>
              <article className="group relative overflow-hidden rounded-lg border border-background-200 bg-background-50">
                <div className="relative h-[220px] overflow-hidden md:h-[260px]">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/10 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-300">
                      {advisor.role}
                    </p>
                    <h3 className="mt-1 font-heading text-sm font-semibold leading-snug text-background-50">
                      {advisor.name}
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}