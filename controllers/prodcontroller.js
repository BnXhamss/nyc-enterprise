import { productModel } from "../Models/productModel.js";
import {
  addProductDetails,
  replaceProductDetails,
} from "../Validators/productValidator.js";

// Add new product
export const addProduct = async (req, res, next) => {
  try {
    const { error, value } = addProductDetails.validate({
      ...req.body,
      image: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }
    await productModel.create(value);
    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    next(error);
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
  // Validate incoming request (excluding image)
  const { error } = replaceProductDetails.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if image was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  // Perform model replace operation
  const results = await productModel.findOneAndReplace(
    { _id: req.params.id },
    {
      ...req.body,
      image: req.file.filename,
    },
    { new: true }
  );

  // Return a response
  if (!results) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ results });
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  const deletedProduct = await productModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ message: "Product removed" });
};