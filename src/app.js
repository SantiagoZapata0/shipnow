//! Imports

import express from "express";
import logger from "./config/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/handle-error.middleware.js";

// ! Routes

import UsersRoutes from "./routes/users.routes.js";
import ProductsRoutes from "./routes/products.routes.js";
import OrdersRoutes from "./routes/orders.routes.js";
import DeliveriesRoutes from "./routes/deliveries.routes.js";

// ! Mock routes

import UserMockRoutes from "./mocks/routes/user.mock.routes.js";
import OrderMockRoutes from "./mocks/routes/order.mocks.routes.js";
import DeliveryRoutes from "./mocks/routes/delivery.mocks.routes.js";

// ! Middlewares

const app = express();

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json());

app.use((req, res, next) => {
    const date = new Date();
    logger.http(`${date.toLocaleString("es-AR")} - ${req.method}`);
    next();
})

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "OK", payload: "Servidor activo."})
    logger.info("Servidor activo. Health check OK.")
})

app.get("/logger-test", (req, res) => {
    logger.debug("Debug log");
    logger.http("HTTP log");
    logger.info("Info log");
    logger.warn("Warning log");
    logger.error("Error log");
    logger.fatal("Fatal log");
    res.status(200).json({status: "OK", message: "Logger test completed."})
})

// ! Routes

app.use("/api/users", UsersRoutes);
app.use("/api/products", ProductsRoutes);
app.use("/api/orders", OrdersRoutes);
app.use("/api/deliveries", DeliveriesRoutes);

if(env.NODE_ENV !== "production"){
    app.use("/api/mocks", UserMockRoutes);
    app.use("/api/mocks", OrderMockRoutes);
    app.use("/api/mocks", DeliveryRoutes);
}

app.use(notFoundHandler);
app.use(errorHandler); 

export default app;
