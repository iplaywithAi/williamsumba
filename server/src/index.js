import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendContactEmail, verifyMailer } from './mailer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4000;
const MESSAGES_FILE = path.join(__dirname, '..', 'messages.jsonl');
const CLIENT_DIST = path.join(__dirname, '..', '..', 'client', 'dist');

const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // real client IP for rate limiting behind a proxy

// Only needed when the frontend runs on a different origin (e.g. Vite on 5173)
if (CLIENT_ORIGINS.length) {
  app.use(cors({ origin: CLIENT_ORIGINS, methods: ['GET', 'POST'] }));
}

app.use(express.json({ limit: '10kb' }));

void verifyMailer();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages. Please try again in 15 minutes.' },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return 'Enter your name (2 to 100 characters).';
  }
  if (typeof email !== 'string' || email.trim().length > 254 || !EMAIL_RE.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    return 'Your message should be 10 to 5000 characters.';
  }
  return null;
}

// ---------- API ----------

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body ?? {};

  // Honeypot: real users never fill the hidden "website" field
  if (body.website) {
    return res.json({ ok: true, message: 'Thanks, your message was sent.' });
  }

  const problem = validate(body);
  if (problem) {
    return res.status(400).json({ ok: false, error: problem });
  }

  const entry = {
    name: body.name.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
    at: new Date().toISOString(),
  };

  try {
    await fs.appendFile(MESSAGES_FILE, JSON.stringify(entry) + '\n', 'utf8');
  } catch (err) {
    console.error('Save failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'Could not save your message. Please try again or email me directly.',
    });
  }

  void sendContactEmail(entry); // runs in the background, the visitor does not wait
  res.status(201).json({ ok: true, message: 'Thanks, your message was sent.' });
});

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// ---------- Frontend ----------

app.use(express.static(CLIENT_DIST));

// SPA fallback: any non API GET returns index.html
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  res.sendFile(path.join(CLIENT_DIST, 'index.html'), (err) => err && next(err));
});

// ---------- Error handler (must be last) ----------

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, error: 'Message is too large.' });
  }
  if (err instanceof SyntaxError) {
    return res.status(400).json({ ok: false, error: 'Invalid request.' });
  }
  console.error(err);
  res.status(500).json({ ok: false, error: 'Something went wrong.' });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));