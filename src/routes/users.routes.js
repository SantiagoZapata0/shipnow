import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAll)

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`User ID: ${id}`)
})

router.post("/", (req, res) => {
    const { name, email } = req.body;
    res.send(`User created: ${name}, ${email}`)
})

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    res.send(`User updated: ${id}, ${name}, ${email}`)
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`User deleted: ${id}`)
})

export default router;