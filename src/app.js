//! Imports

import express from "express";
import { env } from "./config/env.js"

// ! Route imports

import UsersRoutes from "./routes/users.routes.js";
import ProductsRoutes from "./routes/products.routes.js";
import MocksRoutes from "./mocks/routes/mock.routes.js";

// ! Middlewares

const app = express();

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

app.use("/api/users", UsersRoutes);
app.use("/api/products", ProductsRoutes);

if(env.NODE_ENV !== "production"){
    app.use("/api/mocks", MocksRoutes);
}

export default app;