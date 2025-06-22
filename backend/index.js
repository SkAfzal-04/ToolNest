import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import urlRoutes from './routes/UrlRoute.js';
import youtubeRoutes from './routes/youtubRoute.js';

const app = express();
const server = createServer(app);

// Use your hosted frontend domain here for production (can be wildcard for now)
const io = new Server(server, {
  cors: {
    origin: '*', // 🔒 You can replace '*' with your frontend domain later
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Afzal:Afzal2004@cluster0.nfd8knt.mongodb.net/mern55?retryWrites=true&w=majority&appName=Cluster0", {
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

  socket.on('start', (data) => {
    socket.broadcast.emit('start', data);
  });

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('stop', () => {
    socket.broadcast.emit('stop');
  });

  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('🔴 Whiteboard user disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at https://toolnest-t568.onrender.com/`);
});
