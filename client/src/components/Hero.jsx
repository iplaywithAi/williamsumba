import { useEffect, useState } from 'react';
import { FaArrowDown, FaEnvelope, FaDesktop, FaServer, FaSpider } from 'react-icons/fa6';
import { profile, socials, projects, skillGroups } from '../data.js';

const strengths = [
  [FaDesktop, 'Build', 'Fast, clear React interfaces styled with Tailwind.', 'bg-sky-400/10 text-sky-300'],
  [FaServer, 'Connect', 'Node and Express APIs backed by MongoDB, Firebase, PostgreSQL or SQLite.', 'bg-violet-400/10 text-violet-300'],
  [FaSpider, 'Extract', 'Puppeteer, Cheerio and Axios scrapers that collect and clean web data.', 'bg-fuchsia-400/10 text-fuchsia-300'],
];

const details = [
  ['name', `"${profile.name}"`],
  ['alias', `"${profile.alias}"`],
  ['roles', '["Web Developer", "Data Extraction Expert"]'],
  ['stack', '["JavaScript", "React", "Node", "Express", "MongoDB", "Firebase", "PostgreSQL", "Puppeteer"]'],
  ['exploring', '["Network administration"]'],
];

const roles = ['React Developer', 'Node & Express Developer', 'Web Scraping Specialist'];

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

// Cycles through a list of words; stays on the first one if the visitor prefers reduced motion.
function useRotator(list, ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), ms);
    return () => clearInterval(t);
  }, [list.length, ms]);
  return list[i];
}

const d = (ms) => ({ '--d': `${ms}ms` });

export default function Hero() {
  const shown = useStepper(details.length);
  const role = useRotator(roles);

  return (
    <section id="top" className="relative">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative grid items-start gap-12 py-10 sm:py-14 lg:grid-cols-2">
        <div className="min-w-0">

          <p className="enter mb-4 text-sm font-medium text-mute" style={d(0)}>Also known as {profile.alias}</p>
          <h1 className="enter text-4xl font-extrabold leading-[1.1] sm:text-5xl" style={d(100)}>
            Software engineer who turns messy web data into <span className="gradient-text">working products.</span>
          </h1>

      <p className="enter mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold" style={d(180)}>
        <span className="text-mute">I work as a</span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-fuchsia-500" />
          <span key={role} className="enter text-violet-600" style={d(0)}>{role}</span>
        </span>
      </p>

          <p className="enter mt-4 max-w-xl text-lg leading-relaxed text-mute" style={d(240)}>
            I help businesses and individuals build useful digital products and get the data they need to run them.
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={d(340)}>
            <a href="#projects" className="btn btn-primary"><FaArrowDown aria-hidden /> View projects</a>
            <a href="#contact" className="btn btn-ghost"><FaEnvelope aria-hidden /> Contact me</a>
          </div>
          <ul className="mt-8 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }, i) => (
              <li key={label} className="enter" style={d(460 + i * 70)}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                   className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md">
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

        </div>

        <div className="enter relative min-w-0 lg:mt-2" style={d(300)}>
          <div aria-hidden className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500 opacity-30 blur-xl" />

          <div className="relative min-w-0 overflow-hidden rounded-lg bg-panel text-sm text-slate-200 shadow-lg" aria-label="Profile summary">
            <div aria-hidden className="h-1 bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500" />

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
              {strengths.map(([Icon, title, text, tone], i) => (
                <li key={title} className="enter flex items-start gap-4 px-5 py-4" style={d(650 + i * 150)}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${tone}`}>
                    <Icon aria-hidden />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-semibold text-white">{title}</span>
                    <span className="text-slate-400">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <pre className="max-w-full overflow-x-auto border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-xs leading-6">
              <code className="inline-block min-w-full">
                <span className="text-slate-500">{'{'}</span>
                {details.map(([key, value], i) => (
                  <span
                    key={key}
                    className="block whitespace-nowrap pl-4 transition-all duration-300 motion-reduce:transition-none"
                    style={{ opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateX(-6px)' }}
                  >
                    <span className="text-sky-300">"{key}"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-200">{value}</span>
                    {i < details.length - 1 && <span className="text-slate-500">,</span>}
                  </span>
                ))}
                <span className="text-slate-500">{'}'}</span>
                <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-fuchsia-400 motion-safe:animate-pulse" aria-hidden />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );

}