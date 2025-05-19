import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apartmentRoutes from './routes/apartmentRoutes';

// Load environment variables
dotenv.config();

// Initialize Express instance
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/apartments', apartmentRoutes);

// Base route
app.get('/', (_req, res) => {
  res.send('Nawy Apartments API is running');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/nawy-apartments');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

export default app;