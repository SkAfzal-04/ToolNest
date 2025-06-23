import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const downloadVideo = async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !videoURL.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const cookiesEnv = process.env.YT_COOKIES;

  if (!cookiesEnv) {
    return res.status(500).json({ error: 'Missing cookies in environment' });
  }

  try {
    // Step 1: Write cookies.txt from env
    const cookiePath = path.join(__dirname, 'cookies.txt');
    const cookiesRestored = cookiesEnv.replace(/\\n/g, '\n'); // unescape newlines

    fs.writeFileSync(cookiePath, cookiesRestored, { encoding: 'utf-8' });

    // Step 2: Set output path for video
    const filename = `video_${Date.now()}.mp4`;
    const outputPath = path.join(__dirname, 'downloads', filename);

    // Step 3: Spawn yt-dlp with cookies.txt
    const yt = spawn('yt-dlp', [
      '--cookies', cookiePath,
      '-f', 'mp4',
      '-o', outputPath,
      videoURL
    ]);

    yt.stderr.on('data', data => {
      console.error(`yt-dlp error: ${data}`);
    });

    yt.on('close', (code) => {
      // Remove cookies.txt after use
      fs.unlinkSync(cookiePath);

      if (code === 0 && fs.existsSync(outputPath)) {
        res.download(outputPath, filename, () => {
          fs.unlinkSync(outputPath); // clean up video file
        });
      } else {
        res.status(500).json({ error: 'Download failed' });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during download' });
  }
};
