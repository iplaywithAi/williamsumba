import { FaArrowUpRightFromSquare, FaCode } from 'react-icons/fa6';
import { projects } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {projects.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              delay={i * 90}
              className="grid gap-4 py-7 md:grid-cols-[1fr_1.6fr_auto] md:gap-10"
            >
              <h3 className="text-xl font-bold">{p.title}</h3>

              <div>
                <p className="leading-relaxed text-mute">{p.text}</p>

                {p.points?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
                    {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>

              <div className="flex items-start gap-4 text-sm font-semibold">
                {p.demo && p.demo !== '#' && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark">
                    <FaArrowUpRightFromSquare aria-hidden className="h-3.5 w-3.5" /> Live
                  </a>
                )}
                {p.code && p.code !== '#' && (
                  <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark">
                    <FaCode aria-hidden className="h-3.5 w-3.5" /> Code
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}