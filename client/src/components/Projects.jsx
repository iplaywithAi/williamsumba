import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { projects } from '../data.js';
import Reveal from './Reveal.jsx';

const isLink = (url) => typeof url === 'string' && url.startsWith('http');
const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>

        <div className="mt-8 space-y-6">
          {projects.map((p, i) => {
            const live = isLink(p.demo);
            return (
              <Reveal as="article" key={p.title} delay={i * 90}>
                {/* Hover effects live on this inner div so they don't clash with Reveal's transform */}
                <div className="group relative overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-violet-500 to-fuchsia-500" />

                  {/* Window bar */}
                  <div className="flex items-center justify-between gap-3 border-b border-line bg-slate-50 px-4 py-2.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span aria-hidden className="flex shrink-0 gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="truncate font-mono text-xs text-mute">~/projects/{slug(p.title)}</span>
                    </div>

                    <span
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        live
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-amber-200 bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {live ? 'Live' : 'Demo soon'}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr_11rem] md:gap-8 md:p-7">
                    <span aria-hidden className="gradient-text select-none text-5xl font-extrabold leading-none md:text-6xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-accent">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-mute">{p.text}</p>

                      {p.points?.length > 0 && (
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute marker:text-accent">
                          {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                      )}

                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                        {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      {live ? (
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

                      {isLink(p.code) && (
                        <a
                          href={p.code}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost w-full justify-center"
                          aria-label={`Source code: ${p.title}`}
                        >
                          <FaGithub aria-hidden className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}