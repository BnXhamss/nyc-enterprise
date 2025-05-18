import { Schema, Types, model } from "mongoose";
import normalize from "normalize-mongoose";

const product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Weddings',
        'birthdays'
      ],
    },
    // adminId: { type: Types.ObjectId, required: true, ref: "Admin" },
  },
  { timestamps: true }
);

product.plugin(normalize);

export const productModel = model("Product", product);