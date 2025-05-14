import express from 'express';
import mongoose from 'mongoose';
import adminRouter from './routes/adminroute.js';
import dotenv from "dotenv";
dotenv.config();



// Make database connection
await mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("Connected to Database");
}).catch((err)=>{
   console.log(err)
});


// Create an Express app
const app = express();

// Use global middlewares
app.use(express.json());
app.use('/api/admin', adminRouter);

// Listen for  incoming request 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});