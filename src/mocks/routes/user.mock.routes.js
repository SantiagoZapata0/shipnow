import Router from "express";
import UserMockController from "../controllers/user.mock.controller.js";

const router = Router();

router.get("/users", UserMockController.mockingUsers);

router.post("/users", UserMockController.generateUsers);

export default router;