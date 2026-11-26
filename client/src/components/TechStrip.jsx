import { skillGroups } from '../data.js';


const tech = [...new Map(skillGroups.flatMap((g) => g.items))];

export default function TechStrip() {
  return (
    <section
      aria-label="Technologies I work with"
      className="marquee border-t border-line bg-white/50 py-5"
    >
      {/* The list is rendered twice so the loop is seamless */}
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            aria-hidden={copy === 1}
            className={`flex shrink-0 items-center gap-3 pr-3 ${copy === 1 ? 'marquee-dup' : ''}`}
          >
            {tech.map(([name, Icon]) => (
              <li key={name} className="chip !px-3.5 !py-1.5 text-sm">
                <Icon aria-hidden className="h-4 w-4 text-accent" />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}