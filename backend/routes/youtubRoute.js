import express from 'express';
import { downloadVideo } from '../controllers/youtubeController.js';

const router = express.Router();

router.get('/download', downloadVideo);

export default router;
