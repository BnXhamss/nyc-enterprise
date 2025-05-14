import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  replaceProduct,
} from "../Controllers/productController.js";
import { remoteUpload } from "../Middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../Middlewares/auth.js";

const productsRouter = Router();

productsRouter.post("/products", isAuthenticated, isAuthorized(['superadmin', 'admin']), remoteUpload.single("image"), addProduct);

productsRouter.get("/products", getAllProducts);

productsRouter.get("/products/:id", getProductById);

productsRouter.put("/products/:id", isAuthenticated, remoteUpload.single("image"), replaceProduct);

productsRouter.delete("/products/:id", isAuthenticated, deleteProduct);

export default productsRouter;