import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import "./Dashboard.css";

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with real API call later
    setPages([
      {
        id: "page_1",
        title: "My Portfolio",
        status: "published",
        updated: "2 days ago",
        views: 1243
      },
      {
        id: "page_2",
        title: "Startup Landing",
        status: "draft",
        updated: "1 week ago",
        views: 87
      },
      {
        id: "page_3",
        title: "Agency Website",
        status: "published",
        updated: "3 weeks ago",
        views: 3420
      }
    ]);
  }, []);

  const createNewPage = () => {
    const newId = "page_" + Date.now();
    navigate(`/editor/${newId}`);
  };

  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Pages</h1>
          <p className="subtitle">Manage all your vibe sites</p>
        </div>
        <motion.button 
          className="new-page-btn"
          onClick={createNewPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + New Page
        </motion.button>
      </div>

      <div className="pages-grid">
        {pages.map((page) => (
          <motion.div 
            key={page.id}
            className="page-card"
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
            transition={{ duration: 0.25 }}
          >
            <div className="card-preview">
              <div className="preview-overlay" />
            </div>

            <div className="card-body">
              <h3>{page.title}</h3>
              
              <div className="card-meta">
                <span className={`status-badge ${page.status}`}>
                  {page.status === "published" ? "Published" : "Draft"}
                </span>
                <span className="views">👁 {page.views}</span>
              </div>

              <p className="updated">Updated {page.updated}</p>
            </div>

            <div className="card-actions">
              <motion.button 
                className="edit-btn"
                onClick={() => openEditor(page.id)}
                whileHover={{ scale: 1.03 }}
              >
                Edit Page
              </motion.button>
              <motion.button 
                className="preview-btn"
                whileHover={{ scale: 1.03 }}
              >
                Preview
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="empty-state">
          <h2>No pages yet</h2>
          <p>Start creating your first stunning mini-site</p>
          <button onClick={createNewPage}>Create Your First Page</button>
        </div>
      )}
    </div>
  );
}