import { Schema, model } from "mongoose";
import mongoose from "mongoose";

mongoose.set("strictPopulate", false);

const orderSchema = new Schema(
    {
    customersName: { type: String, required: true },
    customersEmail: { type: String, required: true },
    customersPhone: { type: String, required: true },
    OrderDescription: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, requried: true },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    }, 
},
 { timestamps: true }

);

export const orderModel = model("Order", orderSchema);