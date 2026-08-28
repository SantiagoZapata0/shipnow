import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { uploadDocument, uploadReceipt } from "../config/multer.js";

const router = Router();

router.get("/", ProductController.getProducts);
router.get("/available", ProductController.getAvailableProducts);
router.get("/:pid", ProductController.getProductById);

router.post("/", uploadDocument.single("thumbnails"), ProductController.createProduct);

router.put("/:pid", ProductController.updateProduct);

router.delete("/:pid", ProductController.deleteProduct);

export default router;