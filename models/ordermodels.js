import { Schema, model } from "mongoose";
import mongoose from "mongoose";

mongoose.set("strictPopulate", false);

const orderSchema = new Schema(
    {
    Name: { type: String, required: true },
    Location: { type: String, required: true },
    Phone: { type: String, required: true },
    OrderDescription: [ ]
},
 { timestamps: true }

);

export const orderModel = model("Order", orderSchema);