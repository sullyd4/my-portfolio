import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ... (import all your routes)

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// --- Serve Frontend Static Files ---
app.use(express.static(path.join(__dirname, '../client/dist')));

// --- API Routes ---
// It's important that your API routes are defined *before* the catch-all route.
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/deals', authMiddleware, dealRoutes);
app.use('/api/interactions', authMiddleware, interactionRoutes);

// --- Catch-all Route to Serve Frontend ---
// This must be the last route.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));