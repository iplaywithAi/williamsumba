import { FaArrowUp, FaEnvelope } from 'react-icons/fa6';
import { profile, socials } from '../data.js';

const links = [['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-white/60 text-sm text-mute">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500" />

      <div className="container-x grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <p className="gradient-text text-base font-bold">{profile.name}</p>
          <p className="mt-2 max-w-xs leading-relaxed">
            Software engineer building web products and turning messy web data into something useful.
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <p className="font-semibold text-ink">Explore</p>
          <ul className="mt-3 space-y-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-accent">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact and socials */}
        <div>
          <p className="font-semibold text-ink">Get in touch</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-flex items-center gap-2 break-all transition-colors hover:text-accent"
          >
            <FaEnvelope aria-hidden className="shrink-0" /> {profile.email}
          </a>

          <ul className="mt-4 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5">
          <span>© {year} {profile.name} ({profile.alias}). All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-4">
              <a href="#top" className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-accent">
              Back to top <FaArrowUp aria-hidden className="h-3 w-3" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}