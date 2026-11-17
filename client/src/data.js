import { FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { FaDesktop, FaServer, FaDatabase, FaSpider, FaNetworkWired, FaCode } from 'react-icons/fa6';
import { SiReact, SiVite, SiTailwindcss, SiJavascript, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiSqlite, SiPuppeteer, SiAxios } from 'react-icons/si';
const env = import.meta.env;


export const profile = {
  name: 'Sumba William',
  alias: 'iplaywithAI',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'you@example.com',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+254 700 000 000',
  location: 'Kenya',
};

export const socials = [
  { label: 'GitHub', href: env.VITE_GITHUB_URL, icon: FaGithub },
  { label: 'LinkedIn', href: env.VITE_LINKEDIN_URL, icon: FaLinkedinIn },
  { label: 'X', href: env.VITE_X_URL, icon: FaXTwitter },
  { label: 'Instagram', href: env.VITE_INSTAGRAM_URL, icon: FaInstagram },
  { label: 'WhatsApp', href: env.VITE_WHATSAPP_URL, icon: FaWhatsapp },
].filter((s) => s.href);

export const skillGroups = [
  { title: 'Frontend', icon: FaDesktop, items: [['React', SiReact], ['Vite', SiVite], ['Tailwind CSS', SiTailwindcss], ['JavaScript', SiJavascript]] },
  { title: 'Backend', icon: FaServer, items: [['Node.js', SiNodedotjs], ['Express', SiExpress], ['REST APIs', FaCode]] },
  { title: 'Data storage', icon: FaDatabase, items: [['MongoDB', SiMongodb], ['Firebase', SiFirebase], ['SQLite', SiSqlite]] },
  { title: 'Web data extraction', icon: FaSpider, items: [['Puppeteer', SiPuppeteer], ['Cheerio', FaCode], ['Axios', SiAxios], ['Data cleaning', FaCode], ['Scheduled scraping', FaCode]] },
  { title: 'Networking', icon: FaNetworkWired, items: [['Network management', FaNetworkWired], ['Network administration', FaNetworkWired]], note: 'Currently learning' },
];


export const experience = [
  {
    org: 'Wavex Internet Service Providers',
    role: 'Technical Sales Representative',
    period: 'Present',
    points: [
      'Match customers with the right internet and network solutions.',
      'Explain technical options in plain language to home and business clients.',
      'Gather customer requirements and pass them to the technical team.',
      'Build practical knowledge of network management and administration.',
    ],
  },
  {
    org: 'Techops Hub',
    role: 'Technology team member',
    period: 'August 2023 - Present',
    points: [
      'Work in a growing technology hub on practical software and web projects.',
      'Build web applications with React, Node, Express and Firebase.',
      'Develop scrapers and data pipelines that collect, clean and organize web data.',
      'Collaborate with other developers and clients to deliver working features.',
    ],
  },
  {
    org: 'Pluscom Services, Nairobi',
    role: 'Intern',
    period: 'May 2022 - August 2022',
    points: [
      'First hands-on experience in an IT services company.',
      'Supported the team on day-to-day technical tasks.',
      'Learned how client projects are planned, delivered and supported.'
    ],
  },
];

export const projects = [
  {
    title: 'Deals and Picks',
    text: 'Price tracking across online stores. Scrapers collect listings on a schedule and store every price change so trends can be viewed over time.',
    stack: ['React', 'Express', 'SQLite', 'Puppeteer', 'Cron'],
    demo: '#',
    code: '#',
  },
  {
    title: 'Crash game prototype',
    text: 'A play-money, real-time game built to learn WebSockets and provably fair hashing. No real-money features.',
    stack: ['Node.js', 'WebSockets'],
    code: '#',
  },
];
