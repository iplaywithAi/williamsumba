import { useEffect, useState } from 'react';
import { FaArrowDown, FaEnvelope, FaDesktop, FaServer, FaSpider } from 'react-icons/fa6';
import { profile, socials } from '../data.js';
import Reveal from './Reveal.jsx';

const strengths = [
  [FaDesktop, 'Build', 'Fast, clear React interfaces styled with Tailwind.'],
  [FaServer, 'Connect', 'Node and Express APIs backed by MongoDB, Firebase or SQLite.'],
  [FaSpider, 'Extract', 'Puppeteer, Cheerio and Axios scrapers that collect and clean web data.'],
];

const details = [
  ['name', `"${profile.name}"`],
  ['alias', `"${profile.alias}"`],
  ['roles', '["Web Developer", "Data Extraction"]'],
  ['stack', '["React", "Node", "Express", "Puppeteer"]'],
  ['learning', '"Network administration"'],
];

// Reveals items one at a time; shows everything at once if the visitor prefers reduced motion.
function useStepper(total, start = 1100, step = 260) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(total); return; }
    let i = 0;
    let t;
    const tick = () => { i += 1; setN(i); if (i < total) t = setTimeout(tick, step); };
    t = setTimeout(tick, start);
    return () => clearTimeout(t);
  }, [total, start, step]);
  return n;
}


const d = (ms) => ({ '--d': `${ms}ms` });

export default function Hero() {
  const shown = useStepper(details.length);

  return (
    <section id="top" className="container-x grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="enter mb-4 text-sm font-medium text-mute" style={d(0)}>Also known as {profile.alias}</p>
        <h1 className="enter text-4xl font-extrabold leading-[1.1] sm:text-5xl" style={d(100)}>
          Web developer who turns messy web data into working products.
        </h1>
        <p className="enter mt-5 max-w-xl text-lg leading-relaxed text-mute" style={d(220)}>
          I build React and Node applications and the scrapers that feed them: collecting, cleaning and organizing data from the web.
        </p>
        <div className="enter mt-8 flex flex-wrap gap-3" style={d(340)}>
          <a href="#projects" className="btn btn-primary"><FaArrowDown aria-hidden /> View projects</a>
          <a href="#contact" className="btn btn-ghost"><FaEnvelope aria-hidden /> Contact me</a>
        </div>
        <ul className="mt-8 flex gap-3" aria-label="Social links">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <li key={label} className="enter" style={d(460 + i * 70)}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                 className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="enter overflow-hidden rounded-lg bg-panel text-sm text-slate-200 shadow-sm" style={d(300)} aria-label="Profile summary">

        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-mono text-xs text-slate-400">profile.json</span>
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to projects
          </span>
        </div>

        <ul className="divide-y divide-white/10">
          {strengths.map(([Icon, title, text], i) => (
            <li key={title} className="enter flex items-start gap-4 px-5 py-4" style={d(650 + i * 150)}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-teal-300">
                <Icon aria-hidden />
              </span>
              <span>
                <span className="block font-semibold text-white">{title}</span>
                <span className="text-slate-400">{text}</span>
              </span>
            </li>
          ))}
        </ul>

        <pre className="overflow-x-auto border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-xs leading-6">
          <code>
            <span className="text-slate-500">{'{'}</span>
            {details.map(([key, value], i) => (
              <span
                key={key}
                className="block pl-4 transition-all duration-300 motion-reduce:transition-none"

                style={{ opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateX(-6px)' }}
              >
                <span className="text-teal-300">"{key}"</span>
                <span className="text-slate-500">: </span>
                <span className="text-slate-200">{value}</span>
                {i < details.length - 1 && <span className="text-slate-500">,</span>}
              </span>
            ))}
            <span className="text-slate-500">{'}'}</span>
            <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-teal-300 motion-safe:animate-pulse" aria-hidden />
          </code>
        </pre>
      </div>
    </section>
  );
}