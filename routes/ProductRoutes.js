import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  replaceProduct,
} from "../controllers/productcontroller.js";
import { remoteUpload } from "../middlewares/upload.js";
import {  isAuthorized } from "../middlewares/auth.js";

const productsRouter = Router();

productsRouter.post("/", isAuthorized(['admin']), remoteUpload.single("image"), addProduct);

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductById);

productsRouter.patch("/:id", remoteUpload.single("image"), replaceProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;