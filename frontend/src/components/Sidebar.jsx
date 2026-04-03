export default function Sidebar() {
  const templates = ["Minimal","Startup","Portfolio","Agency","Restaurant"];
  const themes = ["Purple","Red","Green","Neon","Pastel","Luxury"];

  return (
    <div style={{
      width: "260px",
      background: "#111",
      color: "white",
      padding: "20px",
      borderRight: "1px solid #222"
    }}>
      <h2 style={{ color: "#a855f7" }}>VibeKit</h2>

      <h4 style={{ marginTop: "30px" }}>Templates</h4>
      {templates.map(t => (
        <div key={t} className="card">{t}</div>
      ))}

      <h4 style={{ marginTop: "30px" }}>Themes</h4>
      {themes.map(t => (
        <div key={t} className="card">{t}</div>
      ))}

      <h4 style={{ marginTop: "30px" }}>AI Tools ✨</h4>
      {["Generate Text","Generate Image","Suggest Layout","Magic Edit"].map(t => (
        <div key={t} className="card">{t}</div>
      ))}
    </div>
  );
}