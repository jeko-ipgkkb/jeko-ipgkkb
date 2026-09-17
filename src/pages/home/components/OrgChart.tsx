import { organizationChart } from "@/mocks/people";
import Reveal from "@/components/base/Reveal";

interface Person {
  id: string;
  name: string;
  role?: string;
  image: string;
}

function LeaderCard({ person, accent }: { person: Person; accent?: boolean }) {
  return (
    <div
      className={`flex w-full max-w-[260px] items-center gap-4 rounded-lg border p-3 ${
        accent
          ? "border-primary-900 bg-primary-950 text-background-50"
          : "border-background-200 bg-background-50"
      }`}
    >
      <span className="h-14 w-14 shrink-0 overflow-hidden rounded-md">
        <img
          src={person.image}
          alt={person.name}
          className="h-full w-full object-cover object-top"
        />
      </span>
      <span className="min-w-0">
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.14em] ${
            accent ? "text-accent-400" : "text-accent-700"
          }`}
        >
          {person.role}
        </span>
        <span
          className={`block truncate font-heading text-lg font-semibold ${
            accent ? "text-background-50" : "text-foreground-950"
          }`}
        >
          {person.name}
        </span>
      </span>
    </div>
  );
}

function CommitteeCard({
  committee,
}: {
  committee: { id: string; name: string; members: { id: string; name: string; image: string }[] };
}) {
  return (
    <div className="rounded-lg border border-background-200 bg-background-50 p-5">
      <h4 className="eyebrow text-foreground-500">{committee.name}</h4>
      <div className="mt-4 flex flex-col gap-3">
        {committee.members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-md">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover object-top"
              />
            </span>
            <span className="font-heading text-sm font-semibold text-foreground-950">
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrgChart() {
  const { chairperson, viceChairperson, administration, committees } = organizationChart;

  return (
    <section id="org" className="bg-background-50 py-20 md:py-28">
      <div className="jeko-container">
        <Reveal className="text-center">
          <p className="eyebrow text-accent-700">ORGANIZATIONAL CHART</p>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
            LEADERSHIP STRUCTURE
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-foreground-600">
            A clear chain of responsibility — from the chairperson to every committee that keeps
            JEKO moving.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center">
            <LeaderCard person={chairperson} accent />
            <div className="h-10 w-px bg-background-300" />
            <LeaderCard person={viceChairperson} />
            <div className="h-10 w-px bg-background-300" />

            <div className="hidden w-full grid-cols-4 gap-4 lg:grid">
              {administration.map((person, index) => (
                <div key={`branch-${person.id}`} className="relative h-8">
                  {index !== 0 && (
                    <span className="absolute left-[-1rem] right-1/2 top-0 h-px bg-background-300" />
                  )}
                  {index !== administration.length - 1 && (
                    <span className="absolute right-[-1rem] left-1/2 top-0 h-px bg-background-300" />
                  )}
                  <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-background-300" />
                </div>
              ))}
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {administration.map((person) => (
                <div key={person.id} className="flex justify-center">
                  <div className="w-full max-w-[260px] rounded-lg border border-background-200 bg-background-100 p-5">
                    <span className="block h-20 w-20 overflow-hidden rounded-md">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </span>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-600">
                      {person.role}
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold text-foreground-950">
                      {person.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex w-full items-center gap-4">
              <span className="h-px flex-1 bg-background-200" />
              <span className="eyebrow text-foreground-500">Committees</span>
              <span className="h-px flex-1 bg-background-200" />
            </div>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {committees.map((committee) => (
                <CommitteeCard key={committee.id} committee={committee} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}