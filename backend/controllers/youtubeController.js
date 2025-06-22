import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const downloadVideo = async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !videoURL.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const filename = `video_${Date.now()}.mp4`;
    const outputPath = path.join('downloads', filename);

    const yt = spawn('yt-dlp', ['-f', 'mp4', '-o', outputPath, videoURL]);

    yt.stderr.on('data', data => {
      console.error(`yt-dlp error: ${data}`);
    });

    yt.on('close', (code) => {
      if (code === 0) {
        res.download(outputPath, filename, () => {
          fs.unlinkSync(outputPath); // clean up after download
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
