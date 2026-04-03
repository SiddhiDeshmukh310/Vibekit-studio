import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import "./Landing.css";

export default function Landing() {
  const nav = useNavigate();

  const vibes = [
    { name: "Minimal", color: "linear-gradient(135deg, #f8fafc, #e2e8f0)" },
    { name: "Neo-Brutal", color: "linear-gradient(135deg, #ef4444, #f97316)" },
    { name: "Dark Neon", color: "linear-gradient(135deg, #0a0a0a, #22d3ee)" },
    { name: "Pastel Dream", color: "linear-gradient(135deg, #f9a8d4, #c084fc)" },
    { name: "Luxury Serif", color: "linear-gradient(135deg, #4c1d95, #9f1239)" },
    { name: "Retro Pixel", color: "linear-gradient(135deg, #eab308, #22c55e)" },
  ];

  return (
    <div className="landing">
      {/* NAV */}
      <nav className="nav">
        <div className="logo">
          <span className="logo-icon">✨</span> VibeKit Studio
        </div>
        <div className="nav-buttons">
          <motion.button className="ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Log in
          </motion.button>
          <motion.button 
            className="cta"
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px #a855f7" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => nav("/app")}
          >
            Start Creating Free
          </motion.button>
        </div>
      </nav>

      {/* HERO - Cinematic */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="hero-bg" />

        <div className="hero-content">
          <motion.div 
            className="badge"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ✨ AI-powered • Zero code • Instant vibe
          </motion.div>

          <h1>
            Turn your <span className="gradient-text">vibe</span> into<br />
            a <span className="highlight">website</span> in minutes
          </h1>

          <p className="subtitle">
            The most beautiful page builder on the internet.<br />
            Design. Preview. Publish. Done.
          </p>

          <div className="hero-buttons">
            <motion.button
              className="cta primary"
              whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/app")}
            >
              Create Your First Vibe Page
            </motion.button>

            <motion.button
              className="ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch 42s Demo →
            </motion.button>
          </div>
        </div>

        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -80, -160],
              x: [0, (i % 2 === 0 ? 40 : -40)]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: i * 0.4 
            }}
            style={{ left: `${20 + i * 12}%`, top: "60%" }}
          >
            ✨
          </motion.div>
        ))}
      </motion.section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header">
          <h2>Built for the creators who move fast</h2>
        </div>

        <div className="features-grid">
          {[
            { icon: "🌈", title: "Stunning Themes", desc: "6 premium vibes with perfect typography" },
            { icon: "⚡", title: "Live Preview", desc: "Real-time changes on all devices" },
            { icon: "🚀", title: "One-Click Publish", desc: "Instant Netlify deployment" },
            { icon: "🖱️", title: "Drag & Drop", desc: "Intuitive editor with smart sections" },
            { icon: "📱", title: "Pixel Perfect Responsive", desc: "Mobile-first by default" },
            { icon: "💾", title: "Auto Save & Sync", desc: "Changes saved instantly" },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ y: -12, scale: 1.02 }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VIBE SHOWCASE */}
      <section className="vibe-showcase">
        <div className="section-header">
          <h2>Choose Your Vibe</h2>
          <p>Instantly switch between 6 handcrafted design systems</p>
        </div>

        <div className="vibes-grid">
          {vibes.map((vibe, i) => (
            <motion.div
              key={i}
              className="vibe-card"
              whileHover={{ scale: 1.06, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div 
                className="vibe-preview"
                style={{ background: vibe.color }}
              />
              <div className="vibe-name">{vibe.name}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}