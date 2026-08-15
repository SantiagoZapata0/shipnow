import { Router } from "express";
import DeliveryController from "../controllers/delivery.controller.js";

const router = Router();

router.get("/", DeliveryController.getDeliveries);
router.get("/:did", DeliveryController.getDeliveryById);

router.post("/", DeliveryController.createDelivery);

router.put("/:did", DeliveryController.updateDelivery);

router.delete("/:did", DeliveryController.deleteDelivery);

export default router;
