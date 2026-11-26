import { useEffect, useState } from 'react';
import {
  FaEnvelope, FaPhone, FaLocationDot, FaPaperPlane,
  FaCircleCheck, FaTriangleExclamation,
} from 'react-icons/fa6';
import { profile, socials } from '../data.js';
import Reveal from './Reveal.jsx';

const field =
  'mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-accent';
const EMPTY = { name: '', email: '', message: '', website: '' };
const TOAST_MS = 4000;

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'ok' | 'error', text }

  // Toast disappears on its own
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed.');

      setToast({ type: 'ok', text: data.message || 'Message sent. I will reply by email.' });
      setForm(EMPTY);
    } catch (err) {
      const reason = err instanceof TypeError
        ? 'Network error. Check your connection.'
        : err.message;
      setToast({ type: 'error', text: `${reason} You can also email ${profile.email}.` });
    } finally {
      setSending(false);
    }
  }

  // Each contact row gets its own gradient tile, matching the Skills section.
  const rows = [
    [FaEnvelope, 'Email', profile.email, `mailto:${profile.email}`, 'from-sky-500 to-indigo-500'],
    [FaPhone, 'Phone', profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`, 'from-violet-500 to-fuchsia-500'],
    [FaLocationDot, 'Based in', profile.location, null, 'from-emerald-500 to-teal-500'],
  ];

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <h2 className="text-2xl font-bold sm:text-3xl">Contact</h2>

       
          <p className="mt-4 max-w-md text-mute">Have a project, a data problem or a role to discuss? Send a message.</p>

          <ul className="mt-8 space-y-3">
            {rows.map(([Icon, label, value, href, tile]) => {
              const inner = (
                <>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tile} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <Icon aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-mute">{label}</span>
                    <span className="block truncate font-semibold">{value}</span>
                  </span>
                </>
              );
              const base = 'group flex items-center gap-4 rounded-lg border border-line bg-white px-4 py-3 shadow-sm transition-all duration-300';
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className={`${base} hover:-translate-y-0.5 hover:border-accent hover:shadow-md`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={base}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <form onSubmit={submit} className="card md:p-7" noValidate>
            <h3 className="mb-1 text-lg font-bold">Send a message</h3>
            <p className="mb-5 text-sm text-mute">I read every message and reply by email.</p>

            <label className="block text-sm font-semibold">Name
              <input className={field} value={form.name} onChange={set('name')} autoComplete="name" required />
            </label>
            <label className="mt-4 block text-sm font-semibold">Email
              <input type="email" className={field} value={form.email} onChange={set('email')} autoComplete="email" required />
            </label>
            <label className="mt-4 block text-sm font-semibold">Message
              <textarea rows="5" className={field} value={form.message} onChange={set('message')} required />
            </label>

            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input className="hidden" tabIndex="-1" autoComplete="off" aria-hidden value={form.website} onChange={set('website')} />

            <div className="mt-5">
              <button className="btn btn-primary w-full justify-center disabled:opacity-60 sm:w-auto" disabled={sending}>
                <FaPaperPlane aria-hidden /> {sending ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      {/* Toast sits outside the form and the Reveal wrappers so fixed positioning works */}
      <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-sm">
        {toast && (
          <div
            className={`pointer-events-auto flex items-start gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-xl ${
              toast.type === 'ok'
                ? 'bg-gradient-to-r from-accent to-violet-600'
                : 'bg-red-700'
            }`}
          >
            {toast.type === 'ok'
              ? <FaCircleCheck aria-hidden className="mt-0.5 shrink-0" />
              : <FaTriangleExclamation aria-hidden className="mt-0.5 shrink-0" />}
            <span>{toast.text}</span>
          </div>
        )}
      </div>
    </section>
  );
}