
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/Db.js'; // Importing the database connection function
import apiRouter from './routers/index.js'; // Importing the API router
import cookieParser from 'cookie-parser';
import cors from 'cors';
// Initialize dotenv
dotenv.config();

// Create an Express application
const app = express();


connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


app.use('/api', apiRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
