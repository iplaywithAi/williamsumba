import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { projects } from '../data.js';
import Reveal from './Reveal.jsx';

const isLink = (url) => typeof url === 'string' && url.startsWith('http');

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
              className="grid gap-5 py-7 md:grid-cols-[1fr_1.6fr_11rem] md:gap-10"
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

              <div className="md:flex md:items-start">
                {isLink(p.demo) ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-full justify-center"
                    aria-label={`View project: ${p.title}`}
                  >
                    <FaArrowUpRightFromSquare aria-hidden className="h-3.5 w-3.5" /> View project
                  </a>
                ) : (
                  <span
                    className="btn w-full cursor-not-allowed justify-center border border-line bg-slate-100 text-slate-400"
                    aria-disabled="true"
                    title="Live version coming soon"
                  >
                    <FaArrowUpRightFromSquare aria-hidden className="h-3.5 w-3.5" /> View project
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}