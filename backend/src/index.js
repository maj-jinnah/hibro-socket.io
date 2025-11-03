
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './lib/db.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:5000/api/...
app.use('/api', routes);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
