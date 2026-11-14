import { FaArrowUpRightFromSquare, FaCode } from 'react-icons/fa6';
import { projects } from '../data.js';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <article key={p.title} className="grid gap-4 py-7 md:grid-cols-[1fr_1.6fr_auto] md:gap-10">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <div>
                <p className="leading-relaxed text-mute">{p.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>
              <div className="flex items-start gap-4 text-sm font-semibold">
                {p.demo && <a href={p.demo} className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark"><FaArrowUpRightFromSquare aria-hidden className="h-3.5 w-3.5" /> Live</a>}
                {p.code && <a href={p.code} className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark"><FaCode aria-hidden className="h-3.5 w-3.5" /> Code</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
