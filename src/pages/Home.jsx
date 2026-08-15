import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import VideoEmbed from "../components/VideoEmbed";
import ProjectCard from "../components/ProjectCard";
import { profile } from "../content/profile";
import { aventos } from "../content/aventos";
import { projects } from "../content/projects";
import { education } from "../content/education";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <NavBar tone="fun" />

      <section className="section hero">
        <div className="container">
          <p className="eyebrow">San Francisco · Made in Silicon Valley AI Anime Studio</p>
          <h1 className="hero-title">{profile.taglineFun}</h1>
          <p className="hero-bio">{profile.bioFun}</p>
          <div className="hero-actions">
            <a className="button" href={profile.links.aventos} target="_blank" rel="noreferrer">
              Visit Aventos
            </a>
            <a className="button secondary" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Aventos</p>
          <h2 className="section-heading">An AI anime studio, built from scratch</h2>
          <p className="section-lede">{aventos.description}</p>

          <div className="video-grid">
            <VideoEmbed
              videoId={aventos.trailerVideoId}
              title="Aventos anime trailer"
              channelUrl={profile.links.youtube}
            />
            <VideoEmbed
              videoId={aventos.billSplitVideoId}
              title="How Asians pay the bill"
              channelUrl={profile.links.youtube}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h2 className="section-heading">Things I've built</h2>

          <h3 className="project-group-label">For work</h3>
          <div className="project-grid">
            {projects.work.map((p) => (
              <ProjectCard key={p.repo} project={p} />
            ))}
          </div>

          <h3 className="project-group-label">For fun</h3>
          <div className="project-grid">
            {projects.fun.map((p) => (
              <ProjectCard key={p.repo} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Education</p>
          <h2 className="section-heading">{education.school}</h2>
          <p>
            {education.degree} · {education.honors} · {education.gpa} GPA · {education.dates}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
