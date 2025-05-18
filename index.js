import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminroute.js';

import dotenv from "dotenv";
import productsRouter from './routes/ProductRoutes.js';
import orderRouter from './routes/orderroutes.js';
dotenv.config();

// Make database connection
await mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("Connected to Database");
}).catch((err)=>{
   console.log(err)
});

// Create an Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Use global middlewares
app.use('/admin', adminRoutes);
app.use('/products', productsRouter );

// Register order routes 
app.use("/orders", orderRouter)

// Listen for incoming request 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});