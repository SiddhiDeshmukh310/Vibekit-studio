export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#020617",
        padding: "20px"
      }}>
        <h2>VibeKit</h2>

        <p style={{ marginTop: "20px", opacity: 0.6 }}>Dashboard</p>
        <p style={{ opacity: 0.6 }}>Pages</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px" }}>
        {children}
      </div>
    </div>
  );
}