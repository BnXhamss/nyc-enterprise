import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById } from "../controllers/ordercontroller.js";



const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/allorders", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;