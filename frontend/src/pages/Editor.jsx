import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import "./Editor.css";

const vibeThemes = {
  purple: { name: "Purple Dream", bg: "linear-gradient(135deg, #4f46e5, #7c3aed)", accent: "#a855f7", text: "#ffffff" },
  neon: { name: "Dark Neon", bg: "#0a0a0a", accent: "#22d3ee", text: "#ffffff" },
  pastel: { name: "Pastel Dream", bg: "linear-gradient(135deg, #f9a8d4, #c084fc)", accent: "#d946ef", text: "#1f2937" },
  luxury: { name: "Luxury Serif", bg: "linear-gradient(135deg, #4c1d95, #9f1239)", accent: "#eab308", text: "#ffffff" },
  brutal: { name: "Neo-Brutal", bg: "#111111", accent: "#ef4444", text: "#ffffff" },
  retro: { name: "Retro Pixel", bg: "#1a1a1a", accent: "#22c55e", text: "#fef08c" },
};

const initialSections = [
  { id: 1, type: "hero", title: "Hero" },
  { id: 2, type: "features", title: "Features" },
  { id: 3, type: "gallery", title: "Gallery" },
  { id: 4, type: "contact", title: "Contact" },
];

export default function Editor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentVibe, setCurrentVibe] = useState("purple");
  const [viewport, setViewport] = useState("desktop");
  const [pageTitle, setPageTitle] = useState("My Awesome Site");
  const [subtitle, setSubtitle] = useState("Built with VibeKit Studio");
  const [buttonText, setButtonText] = useState("Get Started");
  const [sections, setSections] = useState(initialSections);
  const [isSaved, setIsSaved] = useState(true);

  const theme = vibeThemes[currentVibe];

  useEffect(() => {
    if (!isSaved) {
      const timer = setTimeout(() => setIsSaved(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  const changeVibe = (key) => {
    setCurrentVibe(key);
    setIsSaved(false);
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + direction];
    newSections[index + direction] = temp;
    setSections(newSections);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    alert("✅ Changes saved!");
  };

  const publishPage = () => {
    alert("🚀 Page Published!");
  };

  const previewWidth = {
    desktop: "980px",
    tablet: "720px",
    mobile: "380px"
  };

  return (
    <div className="editor">
      {/* Left Sidebar */}
      <div className="sidebar left">
        <div className="logo">VibeKit</div>

        <div className="menu-section">
          <h4>Templates</h4>
          {["Minimal", "Portfolio", "Agency", "Landing"].map(t => (
            <div key={t} className="menu-item">{t}</div>
          ))}
        </div>

        <div className="menu-section">
          <h4>Vibes</h4>
          {Object.keys(vibeThemes).map(key => (
            <div
              key={key}
              className={`vibe-item ${currentVibe === key ? "active" : ""}`}
              onClick={() => changeVibe(key)}
            >
              <div className="color-dot" style={{ background: vibeThemes[key].accent }}></div>
              {vibeThemes[key].name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="main">
        <div className="topbar">
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => { setPageTitle(e.target.value); setIsSaved(false); }}
            className="page-title"
          />

          <div className="viewport-controls">
            {["desktop", "tablet", "mobile"].map(v => (
              <button
                key={v}
                className={viewport === v ? "active" : ""}
                onClick={() => setViewport(v)}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="topbar-actions">
            <div className={`save-indicator ${isSaved ? "saved" : ""}`}>
              {isSaved ? "✓ Saved" : "Saving..."}
            </div>
            <button className="publish-btn" onClick={publishPage}>
              Publish
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="preview-wrapper">
          <motion.div
            className="preview-frame"
            style={{ width: previewWidth[viewport] }}
          >
            <div className="preview-content" style={{ background: theme.bg, color: theme.text }}>

              {sections.map((section, index) => (
                <div key={section.id} className="section-block">
                  {section.type === "hero" && (
                    <div className="hero">
                      <h1>{pageTitle}</h1>
                      <p>{subtitle}</p>
                      <button className="hero-cta" style={{ background: theme.accent }}>
                        {buttonText}
                      </button>
                    </div>
                  )}

                  {section.type === "features" && (
                    <div className="features">
                      <h2>Powerful Features</h2>
                      <div className="features-grid">
                        {["Lightning Fast", "No-Code Editor", "Real-time Preview", "Instant Publish"].map((f, i) => (
                          <div key={i} className="feature-card">
                            <div className="feature-icon">✨</div>
                            <strong>{f}</strong>
                            <p>Professional results in minutes</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === "gallery" && (
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
                  )}

                  {section.type === "contact" && (
                    <div className="contact">
                      <h2>Get In Touch</h2>
                      <div className="contact-form">
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <textarea placeholder="Your Message" rows="4"></textarea>
                        <button style={{ background: theme.accent }}>Send Message</button>
                      </div>
                    </div>
                  )}

                  {/* Reorder Buttons */}
                  <div className="reorder-buttons">
                    {index > 0 && <button onClick={() => moveSection(index, -1)}>↑ Up</button>}
                    {index < sections.length - 1 && <button onClick={() => moveSection(index, 1)}>↓ Down</button>}
                  </div>
                </div>
              ))}

            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Inspector */}
      <div className="sidebar right">
        <h3>Inspector</h3>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => { setPageTitle(e.target.value); setIsSaved(false); }}
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => { setSubtitle(e.target.value); setIsSaved(false); }}
          />
        </div>

        <div className="form-group">
          <label>Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => { setButtonText(e.target.value); setIsSaved(false); }}
          />
        </div>

        <div className="form-group">
          <label>Vibe</label>
          <select value={currentVibe} onChange={(e) => changeVibe(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "12px" }}>
            {Object.keys(vibeThemes).map(key => (
              <option key={key} value={key}>{vibeThemes[key].name}</option>
            ))}
          </select>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}