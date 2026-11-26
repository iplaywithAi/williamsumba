import { profile } from '../data.js';
import Reveal from './Reveal.jsx';

const links = [['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      {/* NEW: thin gradient line along the bottom edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500" />

      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-base font-bold">
          {/* NEW: small coloured mark before the name */}
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-fuchsia-500" />
          <span className="gradient-text">{profile.name}</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium text-mute sm:gap-7">
          {links.map(([label, href]) =>
            label === 'Contact' ? (
              /* NEW: Contact becomes a button so recruiters see the call to action */
              <a key={href} href={href} className="btn btn-primary !py-1.5">{label}</a>
            ) : (
              <a
                key={href}
                href={href}
                className={`relative hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${label === 'Experience' ? 'hidden sm:inline' : ''}`}
              >
                {label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}