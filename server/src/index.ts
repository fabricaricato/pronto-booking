import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRoutes } from './routes/healthRoutes';
import { reservationRoutes } from './routes/reservationRoutes';
import { connectDb } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/health', healthRoutes);
app.use('/reservations', reservationRoutes);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
