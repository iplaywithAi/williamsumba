import { useState } from 'react';
import { FaEnvelope, FaPhone, FaLocationDot, FaPaperPlane } from 'react-icons/fa6';
import { profile, socials } from '../data.js';

const field = 'mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm placeholder:text-slate-400';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', text: 'Sending...' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed.');
      setStatus({ type: 'ok', text: 'Message sent. I will reply by email.' });
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setStatus({ type: 'error', text: `${err.message} You can also email ${profile.email}.` });
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
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Contact</h2>
          <p className="mt-3 max-w-md text-mute">Have a project, a data problem or a role to discuss? Send a message.</p>
          <ul className="mt-8 space-y-4">
            {rows.map(([Icon, label, value, href]) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent"><Icon aria-hidden /></span>
                <span>
                  <span className="block text-xs text-mute">{label}</span>
                  {href ? <a href={href} className="font-semibold hover:text-accent">{value}</a> : <span className="font-semibold">{value}</span>}
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex gap-3" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                   className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-mute transition-colors hover:border-accent hover:text-accent">
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

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
          <input className="hidden" tabIndex="-1" autoComplete="off" aria-hidden value={form.website} onChange={set('website')} />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button className="btn btn-primary disabled:opacity-60" disabled={status.type === 'loading'}>
              <FaPaperPlane aria-hidden /> Send message
            </button>
            <p role="status" className={`text-sm ${status.type === 'error' ? 'text-red-700' : status.type === 'ok' ? 'text-accent-dark' : 'text-mute'}`}>{status.text}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
