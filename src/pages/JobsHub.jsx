import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { jobVariants } from "../content/jobVariants";
import "./JobsHub.css";

export default function JobsHub() {
  return (
    <div className="tone-pro">
      <NavBar tone="pro" />

      <section className="section">
        <div className="container">
          <p className="eyebrow">Hiring</p>
          <h1 className="section-heading">What are you looking to hire for?</h1>
          <p className="jobs-hub-lede">
            Same person, three lenses — pick whichever matches the role you're evaluating me for.
          </p>

          <div className="jobs-hub-grid">
            {Object.entries(jobVariants).map(([key, variant]) => (
              <Link key={key} to={`/jobs/${key}`} className="card jobs-hub-card">
                <h2>{variant.label}</h2>
                <p>{variant.headline}</p>
                <span className="jobs-hub-card-cta">View →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
