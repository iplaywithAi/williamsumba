import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const MESSAGES = path.join(__dirname, '..', 'messages.jsonl');
const DIST = path.join(__dirname, '..', '..', 'client', 'dist');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '10kb' }));

const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false });
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

app.post('/api/contact', limiter, async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {};

  if (website) return res.json({ ok: true }); // honeypot
  if (name.trim().length < 2) return res.status(400).json({ error: 'Enter your name.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (message.trim().length < 10) return res.status(400).json({ error: 'Write a message of at least 10 characters.' });

  const entry = { name: name.trim(), email: email.trim(), message: message.trim(), at: new Date().toISOString() };

  try {
    await fs.appendFile(MESSAGES, JSON.stringify(entry) + '\n');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not save your message. Please email me directly.' });
  }

  if (mailer) {
    mailer.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: entry.email,
      subject: `Portfolio message from ${entry.name}`,
      text: entry.message,
    }).catch((err) => console.error('Email failed:', err.message));
  }

  res.json({ ok: true });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use(express.static(DIST));
app.get('*', (_req, res, next) => res.sendFile(path.join(DIST, 'index.html'), (e) => e && next()));


app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));