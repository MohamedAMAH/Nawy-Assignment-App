import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apartmentRoutes from './routes/apartmentRoutes';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/apartments', apartmentRoutes);

app.get('/', (_req, res) => {
  res.send('Nawy Apartments API is running');
});

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;

const connectDB = async (retryCount = 0): Promise<void> => {
  try {
    const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
    await mongoose.connect(mongoURI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => connectDB(retryCount + 1), RETRY_INTERVAL);
    } else {
      console.error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts. Exiting process.`);
      process.exit(1);
    }
  }
};

connectDB();

export default app;