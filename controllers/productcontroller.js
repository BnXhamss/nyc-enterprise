import { productModel } from "../models/productmodel.js";
import {
  addProductDetails,
  replaceProductDetails,
} from "../validators/productvalidator.js";

// Add new product
export const addProduct = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Log the request body
    console.log("Uploaded File:", req.file); // Debugging: Log the uploaded file

    const { error, value } = addProductDetails.validate({
      ...req.body,
      image: req.file?.path, // Use the full Cloudinary URL
    });

    if (error) {
      console.log("Validation Error:", error.details); // Log the validation error
      return res.status(422).json(error);
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = await productModel.create(value);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get product by id
export const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a product
export const replaceProduct = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Log the request body
    console.log("Uploaded File:", req.file); // Debugging: Log the uploaded file

    const { error, value } = replaceProductDetails.validate({
      ...req.body,
      image: req.file?.filename, // Use the uploaded image if provided
    });

    if (error) {
      console.log("Validation Error:", error.details); // Log the validation error
      return res.status(422).json(error);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  const deletedProduct = await productModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ message: "Product removed successfully" });
};