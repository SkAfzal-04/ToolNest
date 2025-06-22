# 🧰 ToolNest

**ToolNest** is an all-in-one productivity web application featuring:

- ✏️ A real-time **Collaborative Whiteboard**
- 🔗 A custom **URL Shortener**
- 🎥 A fast and simple **YouTube Video Downloader**

Built with modern technologies like React, Node.js, and Socket.IO, ToolNest helps users collaborate, share, and extract content easily — all from a single platform.

---

## 🌟 Features

### ✏️ Collaborative Whiteboard
- Real-time drawing with multiple users
- Support for brush, eraser, clear, and color selection
- Light/Dark theme-aware background handling
- Smooth drawing experience across tabs via WebSocket (Socket.IO)

### 🔗 URL Shortener
- Input any long URL and get a short, sharable version
- Backend stores mappings and handles redirection
- Easy-to-use frontend with instant feedback

### 🎥 YouTube Video Downloader
- Enter a YouTube video URL to download it
- Backend fetches and serves downloadable video/audio
- Simple and clean UI

---

## 🛠️ Tech Stack

| Frontend | Backend | Real-Time | Other |
|----------|---------|------------|-------|
| React    | Node.js + Express | Socket.IO | Tailwind CSS |
| Zustand (state) | MongoDB / File DB | -- | yt-dlp (YouTube download) |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js ≥ 16
- npm / yarn
- (For YT downloads) Python + `yt-dlp` installed globally

### 📦 Installation

```bash
git clone https://github.com/your-username/toolnest.git
cd toolnest
npm install

▶️ Run the App

# Run backend
cd ./backend
npm install
npm run dev

# Run frontend
cd ./frontend
npm install
npm run dev

💡 Inspiration
ToolNest was built to combine several helpful web utilities into one cohesive experience — whether you're brainstorming with others, sharing clean URLs, or saving video content.

🧑‍💻 Author
Sk Mahammad Afzal
B.Tech IT, MCKV Institute of Engineering
GitHub Profile

📃 License
This project is open-source under the MIT License.

yaml
Copy
Edit

---

Would you like me to:
- Add a basic folder structure in the README?
- Include specific commands for `yt-dlp` setup?
- Create a custom logo or favicon idea?

Let me know!

