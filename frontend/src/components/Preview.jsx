export default function Preview() {
  return (
    <div style={{
      flex: 1,
      overflow: "auto",
      padding: "40px",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        width: "1000px",
        background: "white",
        borderRadius: "16px",
        overflow: "hidden"
      }}>

        {/* HERO */}
        <div style={{
          padding: "100px 20px",
          textAlign: "center",
          color: "white",
          background: "linear-gradient(135deg,#7c3aed,#06b6d4)"
        }}>
          <h1 style={{ fontSize: "56px" }}>
            Launch Your Startup
          </h1>
          <p>Build fast. Scale faster.</p>

          <button className="btn-primary">
            Get Started Free
          </button>
        </div>

        {/* FEATURES */}
        <div style={{ padding: "60px 40px" }}>
          <h2>Features</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px"
          }}>
            {["Fast","No Code","Analytics","Themes"].map(f => (
              <div className="card" key={f}>
                <h3>{f}</h3>
                <p>Powerful feature</p>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div style={{ padding: "60px 40px" }}>
          <h2>Gallery</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px"
          }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                height: "120px",
                background: "#ddd",
                borderRadius: "10px"
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}