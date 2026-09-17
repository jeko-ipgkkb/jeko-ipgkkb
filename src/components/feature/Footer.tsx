import { brand, footerColumns, socials, navLinks } from "@/mocks/site";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-background-100">
      <div className="jeko-container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center">
                <img src={brand.logo} alt="JEKO logo" className="h-full w-full object-contain" />
              </span>
              <span className="font-heading text-2xl font-bold tracking-tight text-background-50">
                JEKO
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-background-300">
              {brand.fullName}
              <br />
              {brand.institution}
            </p>
            <p className="eyebrow mt-6 text-accent-400">{brand.statement}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="eyebrow text-background-400">{column.title}</h4>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background-200 transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="eyebrow text-background-400">CONNECT</h4>
            <div className="mt-5 flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group inline-flex items-center gap-3 text-sm text-background-200 transition-colors hover:text-accent-400"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-background-800 text-base transition-colors group-hover:border-accent-500 group-hover:text-accent-400">
                    <i className={social.icon} />
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background-800 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-background-400">
            © 2026 JEKO — {brand.fullName} · {brand.institution}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-background-400 transition-colors hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}