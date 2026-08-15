import { profile } from "../content/profile";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href={`mailto:${profile.email}`} className="footer-email">
          {profile.email}
        </a>
        <div className="footer-links">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.links.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href={profile.links.aventos} target="_blank" rel="noreferrer">
            Aventos
          </a>
        </div>
      </div>
    </footer>
  );
}
