import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4 shadow">
      <h1 className="text-xl font-bold">⚙️ Tools</h1>
      <div className="flex gap-4">
        <Link
          to="/"
          className={`px-3 py-1 rounded ${
            current === "/" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          🔗 Shorten URL
        </Link>
        <Link
          to="/youtube"
          className={`px-3 py-1 rounded ${
            current === "/youtube" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          🎥 YouTube Downloader
        </Link>
        <Link
          to="/whiteboard"
          className={`px-3 py-1 rounded ${
            current === "/whiteboard" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          🎨 Whiteboard
        </Link>
      </div>
    </nav>
  );
}
