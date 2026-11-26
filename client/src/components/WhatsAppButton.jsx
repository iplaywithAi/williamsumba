import { FaWhatsapp } from 'react-icons/fa6';
import { profile, socials } from '../data.js';

// Uses your VITE_WHATSAPP_URL if set, otherwise builds a wa.me link from your phone number.
const fromSocials = socials.find((s) => s.label === 'WhatsApp')?.href;
const digits = profile.phone.replace(/\D/g, '');
const href =
  fromSocials ||
  `https://wa.me/${digits}?text=${encodeURIComponent('Hi Sumba, I found your portfolio and would like to talk.')}`;

export default function WhatsAppButton() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping" />
      <FaWhatsapp aria-hidden className="relative h-7 w-7" />
    </a>
  );
}