import { experience } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Experience</h2>
        <ol className="mt-8 border-l border-line">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.org} delay={i * 110} className="relative pb-9 pl-7 last:pb-0">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-bold">{e.role}</h3>
                <span className="text-sm text-mute">{e.period}</span>
              </div>
              <p className="font-medium text-accent">{e.org}</p>
              {e.points?.length > 0 && (
                <ul className="mt-2 max-w-2xl list-disc space-y-1 pl-5 text-mute">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}