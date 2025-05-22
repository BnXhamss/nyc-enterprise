import { Schema, model } from "mongoose";
import mongoose from "mongoose";

mongoose.set("strictPopulate", false);

const orderSchema = new Schema(
    {
    customersName: { type: String, required: true },
    customersEmail: { type: String, required: true },
    customersPhone: { type: String, required: true },
    OrderDescription: [ ]
},
 { timestamps: true }

);

export const orderModel = model("Order", orderSchema);