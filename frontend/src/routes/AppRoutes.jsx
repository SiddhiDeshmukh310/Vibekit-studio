import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Editor from "../pages/Editor";
import ViewPage from "../pages/ViewPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/app" element={<Dashboard />} />           {/* Added this - common path */}

      {/* Editor */}
      <Route path="/editor" element={<Editor />} />
      <Route path="/editor/:id" element={<Editor />} />       {/* For future page ID */}
<Route path="/p/:slug" element={<ViewPage />} />
      {/* Published Page */}
      <Route path="/view/:id" element={<ViewPage />} />
      <Route path="/p/:slug" element={<ViewPage />} />        {/* Public published page */}
<Route path="/p/:slug" element={<ViewPage />} />
    </Routes>
  );
}