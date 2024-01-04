// const express = require("express")
// const colors = require("colors");
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database.js";
import authroutes from "./routes/auth.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import cors from "cors"
const app = express()

// const PORT = 4000;
dotenv.config();

// coneect db
connectDB();
const PORT = process.env.PORT || 8080;

// middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));


// all the routes mount here
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/category", categoryRoutes);
app.use('/api/v1/product', ProductRoutes);

app.listen(PORT, () => {
    console.log(`Server is running for ${process.env.Mode} on port ${PORT}`.bgCyan.white)
})

// defaults constructor
app.get("/", (req, res) => {
    res.send("Welocome Ecommerce app 2023.")
})