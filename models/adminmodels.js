import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "admin",
      enum: [ "admin"],
    },
  },
  { timestamps: true }
);

adminSchema.plugin(normalize);

export const adminModel = model("Admin", adminSchema);
