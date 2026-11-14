import { FaArrowDown, FaEnvelope, FaDesktop, FaServer, FaSpider } from 'react-icons/fa6';
import { profile, socials } from '../data.js';

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

export default function Hero() {
  return (
    <section id="top" className="container-x grid items-center gap-12 py-12 sm:py-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="mb-4 text-sm font-medium text-mute">Also known as {profile.alias}</p>
        <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
         Software Engineer who turns messy web data into working products.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
          I build React and Node applications and the scrapers that feed them: collecting, cleaning and organizing data from the web.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary"><FaArrowDown aria-hidden /> View projects</a>
          <a href="#contact" className="btn btn-ghost"><FaEnvelope aria-hidden /> Contact me</a>
        </div>
        <ul className="mt-8 flex gap-3" aria-label="Social links">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                 className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition-colors hover:border-accent hover:text-accent">
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-lg bg-panel text-sm text-slate-200 shadow-sm" aria-label="Profile summary">
  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
    <span className="font-mono text-xs text-slate-400">profile.json</span>
    <span className="flex items-center gap-2 text-xs text-slate-300">
      <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
      Open to projects
    </span>
  </div>

  <ul className="divide-y divide-white/10">
    {strengths.map(([Icon, title, text]) => (
      <li key={title} className="flex items-start gap-4 px-5 py-4">
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
        <span key={key} className="block pl-4">
          <span className="text-teal-300">"{key}"</span>
          <span className="text-slate-500">: </span>
          <span className="text-slate-200">{value}</span>
          {i < details.length - 1 && <span className="text-slate-500">,</span>}
        </span>
      ))}
      <span className="text-slate-500">{'}'}</span>
    </code>
  </pre>
</div>
    </section>
  );
}
