import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  replaceProduct,
} from "../controllers/productcontroller.js";
import { remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const productsRouter = Router();

productsRouter.post("/", isAuthenticated, isAuthorized(['admin']), remoteUpload.single("image"), addProduct);

productsRouter.get("/allproducts", getAllProducts);

productsRouter.get("/:id", getProductById);

productsRouter.patch("/:id", isAuthenticated, remoteUpload.single("image"), replaceProduct);

productsRouter.delete("/:id",isAuthenticated, deleteProduct);

export default productsRouter;


