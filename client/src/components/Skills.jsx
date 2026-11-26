import { skillGroups } from '../data.js';
import Reveal from './Reveal.jsx';

// Each group gets its own colour so the section isn't one flat tone.
const tones = [
  { tile: 'from-sky-500 to-indigo-500', icon: 'text-sky-500' },
  { tile: 'from-indigo-500 to-violet-500', icon: 'text-indigo-500' },
  { tile: 'from-violet-500 to-fuchsia-500', icon: 'text-violet-500' },
  { tile: 'from-fuchsia-500 to-pink-500', icon: 'text-fuchsia-500' },
  { tile: 'from-emerald-500 to-teal-500', icon: 'text-emerald-500' },
  { tile: 'from-amber-500 to-orange-500', icon: 'text-amber-500' },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Skills, languages & technologies</h2>

        <div className="mt-8 space-y-4">
          {skillGroups.map(({ title, icon: GroupIcon, items, note }, i) => {
            const tone = tones[i % tones.length];
            return (
              <Reveal
                key={title}
                delay={i * 70}
                className="card group grid gap-4 md:grid-cols-[15rem_1fr] md:items-center md:gap-10"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tone.tile} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <GroupIcon aria-hidden className="h-4 w-4" />
                  </span>

                  <div>
                    <h3 className="font-bold leading-tight">{title}</h3>
                    <span className="text-xs font-medium text-mute">
                      {items.length} {items.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                </div>

                <div>
                  {note && (
                    <span className="badge mb-3">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                      </span>
                      {note}
                    </span>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {items.map(([name, Icon]) => (
                      <span key={name} className="chip">
                        <Icon aria-hidden className={`h-3.5 w-3.5 ${tone.icon}`} />
                        {name}
                      </span>
                    ))}
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