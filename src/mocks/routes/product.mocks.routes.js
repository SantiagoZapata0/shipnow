import { Router } from "express";
import ProductMocksController from "../controllers/product.mocks.controller.js";

const router = Router();

router.get("/products", ProductMocksController.mockingProducts);
router.post("/products", ProductMocksController.generateProducts);

export default router;
