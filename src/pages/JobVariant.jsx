import { useParams, Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ExperienceItem from "../components/ExperienceItem";
import ProjectCard from "../components/ProjectCard";
import { jobVariants } from "../content/jobVariants";
import { experience } from "../content/experience";
import { projects } from "../content/projects";
import { education } from "../content/education";
import "./JobVariant.css";

export default function JobVariant() {
  const { variant: key } = useParams();
  const variant = jobVariants[key];

  if (!variant) {
    return <Navigate to="/jobs" replace />;
  }

  const relevantExperience = experience.filter((item) =>
    variant.experienceTags.some((tag) => item.tags.includes(tag))
  );
  const relevantProjects = projects[variant.emphasizeProjects] || [];

  return (
    <div className="tone-pro">
      <NavBar tone="pro" />

      <section className="section hero-pro">
        <div className="container">
          <Link to="/jobs" className="back-link">
            ← Other lenses
          </Link>
          <p className="eyebrow">{variant.label}</p>
          <h1 className="section-heading">{variant.headline}</h1>
          <p className="hero-pro-subhead">{variant.subhead}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Why the breadth</p>
          <p className="role-fit-statement">{variant.roleFit}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Experience</p>
          <h2 className="section-heading">Where I've done this before</h2>
          <div>
            {relevantExperience.map((item) => (
              <ExperienceItem key={item.org} item={item} />
            ))}
          </div>
        </div>
      </section>

      {relevantProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <p className="eyebrow">Proof of work</p>
            <h2 className="section-heading">Projects</h2>
            <div className="project-grid">
              {relevantProjects.map((p) => (
                <ProjectCard key={p.repo} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

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
