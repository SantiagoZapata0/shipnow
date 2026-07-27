import { Router } from "express";
import DeliveryMockController from "../controllers/delivery.mocks.controller.js";

const router = Router();

router.get("/deliveries", DeliveryMockController.mockingDeliveries);

router.post("/deliveries", DeliveryMockController.generateDeliveries);

export default router;