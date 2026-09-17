import { useMemo, useState } from "react";
import { members, memberCategories } from "@/mocks/people";
import Reveal from "@/components/base/Reveal";

export default function Members() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesCategory = category === "All" || member.category === category;
      const matchesQuery =
        q.length === 0 ||
        member.name.toLowerCase().includes(q) ||
        member.no.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="members" className="bg-background-100 py-20 md:py-28">
      <div className="jeko-container">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-secondary-600">JEKO MEMBERS</p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
                MEET THE TEAM
              </h2>
              <p className="mt-4 text-base font-medium text-foreground-500">
                34 people. One movement.
              </p>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-background-300 bg-background-50 px-4 py-3 md:w-72">
              <span className="flex h-5 w-5 items-center justify-center text-foreground-400">
                <i className="ri-search-line text-base" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search member"
                aria-label="Search member"
                className="w-full bg-transparent text-sm text-foreground-950 outline-none placeholder:text-foreground-400"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="no-scrollbar mt-8 flex flex-wrap gap-2">
            {memberCategories.map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? "bg-primary-950 text-background-50"
                      : "border border-background-300 bg-background-50 text-foreground-600 hover:border-foreground-400"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((member, index) => (
            <Reveal key={member.id} delay={(index % 4) * 60}>
              <article className="group relative overflow-hidden rounded-lg border border-background-200 bg-background-50">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 font-heading text-xs font-bold tracking-widest text-background-50 mix-blend-difference">
                    {member.no}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-300">
                      {member.category}
                    </p>
                    <h3 className="font-heading text-sm font-semibold text-background-50">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-lg border border-background-200 bg-background-50 py-16 text-center">
            <p className="text-sm text-foreground-500">No members found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}