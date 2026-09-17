import { tickerItems } from "@/mocks/site";

export default function SportsTicker() {
  const sequence = [...tickerItems, ...tickerItems];

  return (
    <div className="jeko-ticker relative w-full overflow-hidden border-y border-background-200 bg-primary-950 py-5">
      <div className="jeko-ticker-track items-center">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center" aria-hidden={group === 1}>
            {sequence.map((item, index) => (
              <span key={`${group}-${index}`} className="flex items-center">
                <span className="eyebrow whitespace-nowrap px-6 text-background-100 md:px-10">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}