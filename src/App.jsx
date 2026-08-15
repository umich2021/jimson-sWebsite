import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobsHub from "./pages/JobsHub";
import JobVariant from "./pages/JobVariant";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobsHub />} />
      <Route path="/jobs/:variant" element={<JobVariant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
