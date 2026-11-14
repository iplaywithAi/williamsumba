import { profile } from '../data.js';
import Reveal from './Reveal.jsx';

const links = [['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="text-base font-bold">{profile.name}</a>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium text-mute sm:gap-7">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={`hover:text-ink ${label === 'Experience' ? 'hidden sm:inline' : ''}`}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
