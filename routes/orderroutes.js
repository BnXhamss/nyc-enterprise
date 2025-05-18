import { Router } from "express";
import { createOrder, getAllOrders, getOrderById } from "../controllers/ordercontroller.js";



const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);

export default orderRouter;