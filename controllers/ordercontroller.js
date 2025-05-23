import { orderModel } from "../models/ordermodels.js";
import { createOrderValidator } from "../validators/ordervalidators.js";

export const createOrder = async (req, res, next) => {
  try {
    const { error, value } = createOrderValidator.validate(req.body);
    if (error) {
      console.log("Validation Error:", error.details); // Log the validation error
      return res.status(422).json({ message: "Validation Error", details: error.details });
    }

    const newOrder = await orderModel.create(value);
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find().populate("products.productId").populate("OrderDescription.productId");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server" });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("OrderDescription.productId"); // Correct populate path

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete order
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};