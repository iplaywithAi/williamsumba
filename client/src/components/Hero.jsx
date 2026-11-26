import { useEffect, useState } from 'react';
import { FaArrowDown, FaEnvelope, FaDownload } from 'react-icons/fa6';
import { profile, socials } from '../data.js';

const CV_URL = '/Sumba-William-CV.pdf'; // put your CV in the /public folder with this name

const roles = ['React Developer', 'Node & Express Developer', 'Web Scraping Specialist'];

// What you can do for a client, in plain words (different from the tech lists in Skills).
const offers = ['Web apps', 'APIs & backends', 'Custom scrapers', 'Data cleaning & pipelines'];

// Cycles through a list of words; stays on the first one if the visitor prefers reduced motion.
function useRotator(list, ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), ms);
    return () => clearInterval(t);
  }, [list.length, ms]);
  return list[i];
}

const d = (ms) => ({ '--d': `${ms}ms` });

export default function Hero() {
  const role = useRotator(roles);

  return (
    <section id="top" className="relative">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative flex flex-col items-center py-14 text-center sm:py-20">
        <span className="enter badge" style={d(0)}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to projects.
        </span>

       {/* <p className="enter mt-5 text-sm font-medium text-mute" style={d(80)}>Also known as {profile.alias}</p>*/}

        <h1 className="enter mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl" style={d(140)}>
          Software engineer who turns messy web data into working products.
        </h1>

        <p className="enter mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg font-semibold" style={d(220)}>
          <span className="text-mute">I work as a</span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-fuchsia-500" />
            <span key={role} className="enter text-violet-600" style={d(0)}>{role}</span>
          </span>
        </p>

        <p className="enter mt-4 max-w-2xl text-lg leading-relaxed text-mute" style={d(280)}>
          I help businesses and individuals build useful digital products and get the data they need to run them.
          From React interfaces and Node APIs to Puppeteer scrapers that turn complicated websites into clean, usable data.
        </p>

        <ul className="enter mt-6 flex flex-wrap justify-center gap-2" aria-label="What I can build for you" style={d(340)}>
          {offers.map((o) => <li key={o} className="chip">{o}</li>)}
        </ul>

        <div className="enter mt-8 flex flex-wrap justify-center gap-3" style={d(400)}>
          <a href="#projects" className="btn btn-primary"><FaArrowDown aria-hidden /> View projects</a>
          <a href="#contact" className="btn btn-ghost"><FaEnvelope aria-hidden /> Contact me</a>
          <a href={CV_URL} download className="btn btn-ghost"><FaDownload aria-hidden /> Download CV</a>
        </div>

        <ul className="mt-8 flex justify-center gap-3" aria-label="Social links">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <li key={label} className="enter" style={d(480 + i * 70)}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                 className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md">
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}