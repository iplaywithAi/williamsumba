import { experience } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Experience</h2>

        <ol className="relative mt-8">
          {/* Gradient timeline line (replaces the plain border) */}
          <div aria-hidden className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-gradient-to-b from-accent via-violet-500 to-fuchsia-500 opacity-60" />

          {experience.map((e, i) => {
            const current = /present/i.test(e.period);
            return (
              <Reveal as="li" key={e.org} delay={i * 110} className="relative pb-9 pl-8 last:pb-0">
                <span
                  className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-accent to-fuchsia-500 ring-4 ring-paper"
                  aria-hidden
                />

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold">{e.role}</h3>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      current
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-line bg-white text-mute'
                    }`}
                  >
                    {e.period}
                  </span>
                </div>

                <p className="font-medium text-accent">{e.org}</p>

                {e.points?.length > 0 && (
                  <ul className="mt-2 max-w-2xl list-disc space-y-1 pl-5 text-mute marker:text-accent">
                    {e.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}