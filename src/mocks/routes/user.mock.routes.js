import Router from "express";
import MockController from "../controllers/mock.controller.js";

const router = Router();

router.get("/mocking-users", MockController.mockingUsers);

router.post("/generate-users", MockController.generateUsers);

// Mocking products

// Generate data

export default router;