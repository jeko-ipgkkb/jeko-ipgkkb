import { quote, quoteBackground } from "@/mocks/site";
import Reveal from "@/components/base/Reveal";

export default function Quote() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={quoteBackground}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/85" />
      </div>

      <div className="jeko-container relative py-24 md:py-36">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-5xl leading-none text-accent-500 md:text-6xl">“</span>
          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-background-50 md:text-6xl lg:text-7xl">
            {quote.top}
            <br />
            <span className="text-accent-400">{quote.bottom}</span>
          </h2>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-background-300">
            {quote.caption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}