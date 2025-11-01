
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import connectDb from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:5000/api/...
app.use('/api', routes);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
