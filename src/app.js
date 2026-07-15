import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();

// ! Middlewares

app.use(express.json());
app.use((req, res, next) => {
    const date = new Date();
    console.log(`${date.toLocaleString("es-AR")} - ${req.method}`);
    next();
})

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "OK", payload: "Servidor activo."})
})

// ! Routes

app.use("/api/users", usersRouter);

export default app;