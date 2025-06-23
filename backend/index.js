import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import urlRoutes from './routes/UrlRoute.js';
import youtubeRoutes from './routes/youtubRoute.js';

// ✅ Load environment variables from .env
dotenv.config();

const app = express();
const server = createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: '*', // 🔒 Replace with frontend domain in production
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Successfully connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get('/', (req, res) => {
  res.send('🎉 Welcome to ToolNest API - Server is Live!');
});

// Routes
app.use('/shorten', urlRoutes);
app.use('/youtube', youtubeRoutes);

// WebSocket Events
io.on('connection', (socket) => {
  console.log('🟢 Whiteboard user connected:', socket.id);

  socket.on('start', (data) => socket.broadcast.emit('start', data));
  socket.on('draw', (data) => socket.broadcast.emit('draw', data));
  socket.on('stop', () => socket.broadcast.emit('stop'));
  socket.on('clear', () => socket.broadcast.emit('clear'));
  socket.on('disconnect', () => {
    console.log('🔴 Whiteboard user disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at https://toolnest-t568.onrender.com/`);
});
