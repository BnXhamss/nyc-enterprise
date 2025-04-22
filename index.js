import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';


// Make database connection
await mongoose.connect(process.env.MONGO_URI);


// Create an Express app
const app = express();

// Use global middlewares
app.use(express.json());


// Listen for  incoming request 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});