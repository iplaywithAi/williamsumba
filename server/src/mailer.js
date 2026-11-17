import nodemailer from 'nodemailer';

let transporter;

// Created on first use so environment variables are already loaded
function getTransporter() {
  if (!process.env.SMTP_HOST) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function verifyMailer() {
  const t = getTransporter();
  if (!t) {
    console.log('SMTP not configured, email notifications are off');
    return;
  }
  try {
    await t.verify();
    console.log('SMTP connection ready');
  } catch (err) {
    console.error('SMTP check failed:', err.message);
  }
}

export async function sendContactEmail(entry) {
  const t = getTransporter();
  if (!t || !process.env.CONTACT_TO) return false;

  try {
    await t.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: entry.email,
      subject: `Portfolio message from ${entry.name.replace(/[\r\n]+/g, ' ')}`,
      text: `From: ${entry.name} <${entry.email}>\nReceived: ${entry.at}\n\n${entry.message}`,
    });
    return true;
  } catch (err) {
    console.error('Email failed:', err.message);
    return false;
  }
}