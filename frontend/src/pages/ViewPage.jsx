import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ViewPage.css";

const vibeThemes = {
  purple: { bg: "linear-gradient(135deg, #4f46e5, #7c3aed)", accent: "#a855f7", text: "#ffffff" },
  neon: { bg: "#0a0a0a", accent: "#22d3ee", text: "#ffffff" },
  pastel: { bg: "linear-gradient(135deg, #f9a8d4, #c084fc)", accent: "#d946ef", text: "#1f2937" },
  luxury: { bg: "linear-gradient(135deg, #4c1d95, #9f1239)", accent: "#eab308", text: "#ffffff" },
  brutal: { bg: "#111111", accent: "#ef4444", text: "#ffffff" },
  retro: { bg: "#1a1a1a", accent: "#22c55e", text: "#fef08c" },
};

export default function ViewPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching published page from backend
    setTimeout(() => {
      setPage({
        title: "My Awesome Site",
        subtitle: "Built with VibeKit Studio",
        buttonText: "Get Started",
        vibe: "purple", // Change this to test different vibes
      });
      setViews(1243 + Math.floor(Math.random() * 200));
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) return <div className="loading-screen">Loading your beautiful site...</div>;
  if (!page) return <div className="not-found">This page is not published or does not exist.</div>;

  const theme = vibeThemes[page.vibe];

  return (
    <div className="published-page" style={{ background: theme.bg, color: theme.text, minHeight: "100vh" }}>
      {/* View Counter */}
      <div className="view-counter">
        👁 {views.toLocaleString()} views
      </div>

      <div className="published-content">

        {/* HERO */}
        <div className="hero">
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
          <button className="hero-cta" style={{ background: theme.accent }}>
            {page.buttonText}
          </button>
        </div>

        {/* FEATURES */}
        <div className="features">
          <h2>Powerful Features</h2>
          <div className="features-grid">
            {["Lightning Fast", "No-Code Editor", "Real-time Preview", "Instant Publish"].map((f, i) => (
              <div key={i} className="feature-card">
                <strong>{f}</strong>
                <p>Professional results in minutes</p>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {[
              "https://picsum.photos/id/1015/600/400",
              "https://picsum.photos/id/102/600/400",
              "https://picsum.photos/id/1033/600/400",
              "https://picsum.photos/id/1049/600/400",
              "https://picsum.photos/id/106/600/400",
              "https://picsum.photos/id/1074/600/400"
            ].map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img} alt={`Gallery ${i+1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="contact">
          <h2>Get In Touch</h2>
          <div className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows="4"></textarea>
            <button style={{ background: theme.accent }}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}