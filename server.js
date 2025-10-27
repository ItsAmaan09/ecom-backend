import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/restaurants', restaurantRoutes);

app.use('/api/menus', menuRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
});

app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));