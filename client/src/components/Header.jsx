import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { profile } from '../data.js';

const links = [['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];

const linkClass =
  'relative hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:after:w-full';

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close the menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500" />

      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="gradient-text text-base font-bold" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-mute md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={linkClass}>{label}</a>
          ))}
        </nav>

        {/* Hamburger button (small screens only) */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-ink transition hover:border-accent hover:text-accent md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FaXmark aria-hidden /> : <FaBars aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg md:hidden"
        >
          <ul className="container-x py-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-mute transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}