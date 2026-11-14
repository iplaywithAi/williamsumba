import { skillGroups } from '../data.js';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <h2 className="text-2xl font-bold sm:text-3xl">Skills</h2>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {skillGroups.map(({ title, icon: GroupIcon, items, note }) => (
            <div key={title} className="grid gap-3 py-5 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="flex items-center gap-3 font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-accent-soft text-accent"><GroupIcon aria-hidden className="h-4 w-4" /></span>
                <span>{title}{note && <span className="block text-xs font-medium text-mute">{note}</span>}</span>
              </dt>
              <dd className="flex flex-wrap gap-2">
                {items.map(([name, Icon]) => (
                  <span key={name} className="chip"><Icon aria-hidden className="h-3.5 w-3.5 text-accent" />{name}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
