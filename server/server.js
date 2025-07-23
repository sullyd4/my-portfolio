import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import dealRoutes from './routes/deals.js';
import interactionRoutes from './routes/interactions.js';
import inquiryRoutes from './routes/inquiry.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/inquiry', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/deals', authMiddleware, dealRoutes);
app.use('/api/interactions', authMiddleware, interactionRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));