import DeliveryMockService from "../services/delivery.mocks.service.js"
import logger from "../../config/logger.js";

class DeliveryMockController{
    static async mockingDeliveries(req, res, next){
        try{
            const rawCount = req.query.count || 100
            const count = parseInt(rawCount)
            const deliveries = await DeliveryMockService.generateMockDeliveries(count);
            
            logger.info(`Mocks de entregas generados. Cantidad generada: ${count}`)
            return res.status(200).json({statusCode: 200, message: "Entregas mock generadas.", payload: deliveries});
        } catch(err){
            next(err)
        }
    }

    static async generateDeliveries(req, res, next){
        try{
            const { count, saveToDatabase } = req.body;
            const countInt = parseInt(count);
            const deliveries = await DeliveryMockService.generateMockDeliveries(countInt);

            if(saveToDatabase){
                await DeliveryMockService.saveMockDeliveries(deliveries);
                logger.info(`Mocks de entregas generados y guardados en base de datos. Cantidad generada: ${count}`)
                return res.status(201).json({statusCode: 201, message: "Entregas mock generadas y guardados en base de datos.", payload: deliveries});
            }

            logger.info(`Mocks de entregas generados. Cantidad generada: ${count}`)
            return res.status(200).json({statusCode: 200, message: "Entregas mock generadas.", payload: deliveries});
        } catch(err){
            next(err);
        }
    }
}

export default DeliveryMockController;