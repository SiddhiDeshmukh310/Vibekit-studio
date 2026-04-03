export default function Inspector() {
  return (
    <div style={{
      width: "300px",
      background: "#111",
      color: "white",
      padding: "20px",
      borderLeft: "1px solid #222"
    }}>
      <h3>Inspector</h3>

      <input placeholder="Title" style={{ width:"100%", marginTop:"10px" }} />
      <input placeholder="Subtitle" style={{ width:"100%", marginTop:"10px" }} />

      <button className="btn-primary" style={{ marginTop:"20px", width:"100%" }}>
        Save
      </button>
    </div>
  );
}