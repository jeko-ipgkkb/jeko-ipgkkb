import { useEffect, useState } from "react";
import { brand, navLinks } from "@/mocks/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-background-200/70 bg-background-50/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between px-5 transition-all duration-500 md:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <span
              className={`relative flex items-center justify-center transition-all duration-500 ${
                scrolled ? "h-10 w-10" : "h-12 w-12"
              }`}
            >
              <img
                src={brand.logo}
                alt="JEKO logo"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground-950">
                JEKO
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-500 sm:block">
                IPG Kota Bharu
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground-700 transition-colors hover:text-foreground-950"
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#join"
              className="hidden whitespace-nowrap rounded-md bg-primary-950 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-background-50 transition-colors hover:bg-accent-600 sm:inline-flex"
            >
              Join JEKO
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-background-300 text-foreground-950 transition-colors hover:border-primary-950 lg:hidden"
            >
              <i className={open ? "ri-close-line text-xl" : "ri-menu-4-line text-xl"} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background-50 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-background-200 py-4 font-heading text-2xl font-semibold text-foreground-950 transition-colors hover:text-accent-600"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-primary-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-background-50"
          >
            Join JEKO
          </a>
        </div>
      </div>
    </>
  );
}