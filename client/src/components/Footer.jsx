import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-mute">
      <div className="container-x flex flex-wrap justify-between gap-2">
        <span>{profile.name} ({profile.alias})</span>
        <span>Designed and built by iplaywithAI</span>
      </div>
    </footer>
  );
}
