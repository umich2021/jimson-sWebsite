import "./VideoEmbed.css";

// Renders a YouTube embed if videoId is set, otherwise a placeholder
// card so the layout is obviously "waiting on content" rather than broken.
export default function VideoEmbed({ videoId, title, channelUrl }) {
  if (!videoId) {
    return (
      <div className="video-embed video-embed-placeholder">
        <p className="video-embed-placeholder-label">{title}</p>
        <p className="video-embed-placeholder-hint">
          Video not wired up yet —{" "}
          {channelUrl ? (
            <a href={channelUrl} target="_blank" rel="noreferrer">
              watch on YouTube
            </a>
          ) : (
            "drop in a video ID"
          )}
          .
        </p>
      </div>
    );
  }

  return (
    <div className="video-embed">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
