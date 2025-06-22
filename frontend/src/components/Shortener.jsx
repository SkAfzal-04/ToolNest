import { useState } from "react";

export default function Shortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!originalUrl.trim()) return;
    const res = await fetch("http://localhost:3000/shorten/short", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="p-6 md:p-10 w-full">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          🔗 URL Shortener
        </h2>

        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleShorten}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Shorten
        </button>

        {shortUrl && (
          <div className="mt-6">
            <p className="text-gray-700 font-medium">Shortened URL:</p>
            <a
              href={shortUrl}
              className="text-blue-600 underline break-all hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
