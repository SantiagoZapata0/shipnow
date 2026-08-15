import logger from "../config/logger.js";
import DeliveryService from "../services/delivery.service.js";

class DeliveryController {
    static async getDeliveries(req, res, next) {
        try {
            const deliveries = await DeliveryService.getAllDeliveries();
            logger.info(`Entregas encontradas. Cantidad encontrada: ${deliveries.length}`);
            return res.status(200).json({ statusCode: 200, message: "Entregas encontradas.", payload: deliveries });
        } catch (err) {
            next(err);
        }
    }

    static async getDeliveryById(req, res, next) {
        try {
            const delivery = await DeliveryService.getDeliveryById(req.params.did);
            logger.info(`Entrega encontrada. ID: ${req.params.did}`);
            return res.status(200).json({ statusCode: 200, message: "Entrega encontrada.", payload: delivery });
        } catch (err) {
            next(err);
        }
    }

    static async createDelivery(req, res, next) {
        try {
            const delivery = await DeliveryService.createOneDelivery(req.body);
            logger.info(`Entrega creada. ID: ${delivery._id}`);
            return res.status(201).json({ statusCode: 201, message: "Entrega creada.", payload: delivery });
        } catch (err) {
            next(err);
        }
    }

    static async updateDelivery(req, res, next) {
        try {
            const delivery = await DeliveryService.updateOneDelivery(req.params.did, req.body);
            logger.info(`Entrega actualizada. ID: ${req.params.did}`);
            return res.status(200).json({ statusCode: 200, message: "Entrega actualizada.", payload: delivery });
        } catch (err) {
            next(err);
        }
    }

    static async deleteDelivery(req, res, next) {
        try {
            const delivery = await DeliveryService.deleteOneDelivery(req.params.did);
            logger.info(`Entrega eliminada. ID: ${req.params.did}`);
            return res.status(200).json({ statusCode: 200, message: "Entrega eliminada.", payload: delivery });
        } catch (err) {
            next(err);
        }
    }
}

export default DeliveryController;
