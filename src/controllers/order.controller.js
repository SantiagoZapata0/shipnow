import OrderService from "../services/order.service.js";
import logger from "../config/logger.js";

class OrderController {
    static async getOrders(req, res, next) {
        try {
            const orders = await OrderService.getAllOrders();
            logger.info(`Órdenes encontradas. Cantidad encontrada: ${orders.length}`);
            return res.status(200).json({ statusCode: 200, message: "Órdenes encontradas.", payload: orders });
        } catch (err) {
            next(err);
        }
    }

    static async getOrderById(req, res, next) {
        try {
            const order = await OrderService.getOrderById(req.params.oid);
            logger.info(`Orden encontrada. ID: ${req.params.oid}`);
            return res.status(200).json({ statusCode: 200, message: "Orden encontrada.", payload: order });
        } catch (err) {
            next(err);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const order = await OrderService.createOneOrder(req.body);
            logger.info(`Orden creada. ID: ${order._id}`);
            return res.status(201).json({ statusCode: 201, message: "Orden creada.", payload: order });
        } catch (err) {
            next(err);
        }
    }

    static async updateOrder(req, res, next) {
        try {
            const order = await OrderService.updateOneOrder(req.params.oid, req.body);
            logger.info(`Orden actualizada. ID: ${req.params.oid}`);
            return res.status(200).json({ statusCode: 200, message: "Orden actualizada.", payload: order });
        } catch (err) {
            next(err);
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const order = await OrderService.deleteOneOrder(req.params.oid);
            logger.info(`Orden eliminada. ID: ${req.params.oid}`);
            return res.status(200).json({ statusCode: 200, message: "Orden eliminada.", payload: order });
        } catch (err) {
            next(err);
        }
    }
}

export default OrderController;
