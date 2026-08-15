import "./ExperienceItem.css";

export default function ExperienceItem({ item }) {
  return (
    <div className="experience-item">
      <div className="experience-item-dates">{item.dates}</div>
      <div>
        <h3>
          {item.role} · {item.org}
        </h3>
        {item.location && <p className="experience-item-location">{item.location}</p>}
        <p>{item.summary}</p>
      </div>
    </div>
  );
}
