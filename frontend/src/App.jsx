import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shortener from "./components/Shortener";
import Whiteboard from "./components/Whiteboard";
import YoutubeDownloader from "./components/YoutubeDownloader";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Shortener />} />
            <Route path="/youtube" element={<YoutubeDownloader />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
