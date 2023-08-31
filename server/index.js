import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import authRoutes from './routes/auth.js';

// CONFIGS

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

// ROUTES

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
}).catch(error => console.error('MongoDB Connection Error:', error));