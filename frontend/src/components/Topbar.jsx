export default function Topbar() {
  return (
    <div style={{
      height: "60px",
      borderBottom: "1px solid #222",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      color: "white"
    }}>
      <input
        defaultValue="My Page"
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px"
        }}
      />

      <div>
        <button className="btn">Desktop</button>
        <button className="btn">Tablet</button>
        <button className="btn">Mobile</button>

        <button className="btn-primary">
          Publish
        </button>
      </div>
    </div>
  );
}