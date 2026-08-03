//! Imports

import express from "express";
import { env } from "./config/env.js"
import { errorHandler, notFoundHandler } from "./middlewares/handle-error.middleware.js";

// ! Routes

import UsersRoutes from "./routes/users.routes.js";
import ProductsRoutes from "./routes/products.routes.js";

// ! Mock routes

import UserMockRoutes from "./mocks/routes/user.mock.routes.js";
import OrderMockRoutes from "./mocks/routes/order.mocks.routes.js";
import DeliveryRoutes from "./mocks/routes/delivery.mocks.routes.js";


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
    app.use("/api/mocks", UserMockRoutes);
    app.use("/api/mocks", OrderMockRoutes);
    app.use("/api/mocks", DeliveryRoutes);
}

app.use(notFoundHandler);
app.use(errorHandler); 

export default app;