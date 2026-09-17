import { brand } from "@/mocks/site";

const heroImage =
  "https://readdy.ai/api/search-image?query=Editorial%20photograph%20of%20a%20young%20Malaysian%20university%20sports%20team%20standing%20confidently%20together%20on%20an%20outdoor%20athletics%20field%20at%20golden%20hour%2C%20navy%20and%20maroon%20jerseys%2C%20energetic%20yet%20composed%20poses%2C%20warm%20off-white%20sky%20with%20soft%20natural%20light%2C%20premium%20sports%20organization%20photography%2C%20high%20detail&width=1000&height=1300&seq=jeko-hero-main&orientation=portrait";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background-50 pt-28 md:pt-32">
      <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-accent-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary-100/50 blur-3xl" />

      <div className="jeko-container relative pb-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow jeko-rise text-accent-700" style={{ animationDelay: "80ms" }}>
              {brand.institution}
            </p>

            <h1
              className="jeko-rise mt-6 font-heading text-[13vw] font-bold leading-[0.92] tracking-tight text-foreground-950 sm:text-6xl lg:text-[5.2rem]"
              style={{ animationDelay: "160ms" }}
            >
              <span className="text-secondary-600">MOVE.</span>
              <br />
              <span className="text-secondary-600">LEAD.</span>
              <br />
              <span className="text-accent-600">INSPIRE.</span>
            </h1>

            <p
              className="jeko-rise mt-8 max-w-xl text-base leading-relaxed text-foreground-600 md:text-lg"
              style={{ animationDelay: "260ms" }}
            >
              {brand.name} brings together movement, leadership, teamwork and excellence through
              sport and physical education at {brand.institution}.
            </p>

            <div
              className="jeko-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href="#about"
                className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md bg-primary-950 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-background-50 transition-colors hover:bg-accent-600"
              >
                Explore JEKO
                <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#members"
                className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md border border-foreground-950 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground-950 transition-colors hover:bg-foreground-950 hover:text-background-50"
              >
                Our Members
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="jeko-rise relative"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative ml-auto h-[420px] w-full max-w-[440px] overflow-hidden rounded-lg sm:h-[520px] lg:h-[560px]">
                <img
                  src={heroImage}
                  alt="JEKO members training together at IPG Kampus Kota Bharu"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="eyebrow text-accent-300">{brand.statement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}