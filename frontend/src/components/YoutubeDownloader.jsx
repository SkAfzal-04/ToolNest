import { useState } from "react";

export default function YoutubeDownloader() {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    if (!link.trim()) return;
    setStatus("Downloading...");
    const res = await fetch(
      `http://localhost:3000/youtube/download?url=${encodeURIComponent(link)}`
    );

    if (res.ok) {
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "video.mp4";
      a.click();
      setStatus("✅ Download complete");
    } else {
      setStatus("❌ Failed to download");
    }
  };

  return (
    <div className="p-6 md:p-10 w-full">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          🎥 YouTube Downloader
        </h2>

        <input
          type="text"
          placeholder="Paste YouTube video link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleDownload}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Download
        </button>

        {status && (
          <p className="mt-4 text-gray-700 font-medium">{status}</p>
        )}
      </div>
    </div>
  );
}
