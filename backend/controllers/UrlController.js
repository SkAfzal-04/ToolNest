import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortCode = nanoid(6);
  const newUrl = new Url({ originalUrl, shortCode });

  try {
    await newUrl.save();
    res.json({
      shortUrl: `https://toolnest-t568.onrender.com/shorten/${shortCode}` // ✅ fixed
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};

export const redirectToOriginal = async (req, res) => {
  const { code } = req.params;

  try {
    const foundUrl = await Url.findOne({ shortCode: code });
    if (foundUrl) {
      return res.redirect(foundUrl.originalUrl);
    }
    res.status(404).send('Short URL not found');
  } catch (err) {
    res.status(500).send('Server error');
  }
};
