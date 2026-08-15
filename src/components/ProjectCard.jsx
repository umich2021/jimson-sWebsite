import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="project-card card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <span className="project-card-repo">{project.repo} →</span>
    </a>
  );
}
