import OrderMockService from "../services/order.mocks.service.js";
import logger from "../../config/logger.js";

class OrderMockController{
    static async mockingOrders(req, res, next){
        try{
            const count = parseInt(req.query.count || 100, 10);
            const orders = await OrderMockService.generateMockOrders(count)

            logger.info(`Mocks de ordenes generados. Cantidad generada: ${count}`)
            return res.status(200).json({statusCode: 200, payload: orders})
        } catch(err){
            next(err)
        }
    }

    static async generateOrders(req, res, next){
        try{
            const { count, saveToDatabase } = req.body;
            const countInt = parseInt(count);
            const orders = await OrderMockService.generateMockOrders(countInt);

            if(saveToDatabase){
                await OrderMockService.saveMockOrders(orders);
                logger.info(`Mocks de ordenes generados y guardados en base de datos. Cantidad generada: ${count}`)
                return res.status(201).json({statusCode: 201, message: "Ordenes creadas y guardadas en base de datos.", payload: orders})
            }

            logger.info(`Mocks de ordenes generados. Cantidad generada: ${count}`)
            return res.status(200).json({statusCode: 200, message: "Ordenes mock generadas.", payload: orders})
        } catch(err){
            next(err)
        }
    }
}

export default OrderMockController;