import express from 'express';
import { createShortUrl, redirectToOriginal } from '../controllers/UrlController.js';

const router = express.Router();

router.post('/short', createShortUrl);
router.get('/:code', redirectToOriginal);

export default router;
