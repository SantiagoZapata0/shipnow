import { Router } from "express";
import OrderMockController from "../controllers/order.mocks.controller.js";

const router = Router();

router.get("/orders", OrderMockController.mockingOrders);

router.post("/orders", OrderMockController.generateOrders);

export default router;