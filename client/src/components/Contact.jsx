import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaLocationDot, FaPaperPlane } from 'react-icons/fa6';
import { profile, socials } from '../data.js';
import Reveal from './Reveal.jsx';

const field = 'mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm placeholder:text-slate-400';
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

  const rows = [
    [FaEnvelope, 'Email', profile.email, `mailto:${profile.email}`],
    [FaPhone, 'Phone', profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`],
    [FaLocationDot, 'Based in', profile.location],
  ];

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Contact</h2>
          <p className="mt-3 max-w-md text-mute">Have a project, a data problem or a role to discuss? Send a message.</p>

          <ul className="mt-8 space-y-4">
            {rows.map(([Icon, label, value, href]) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-mute">{label}</span>
                  {href
                    ? <a href={href} className="font-semibold hover:text-accent">{value}</a>
                    : <span className="font-semibold">{value}</span>}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="rounded-lg border border-line bg-white p-6" noValidate>
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
              <button className="btn btn-primary disabled:opacity-60" disabled={sending}>
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
            className={`pointer-events-auto rounded-md px-4 py-3 text-sm text-white shadow-lg ${
              toast.type === 'ok' ? 'bg-accent-dark' : 'bg-red-700'
            }`}
          >
            {toast.text}
          </div>
        )}
      </div>
    </section>
  );
}