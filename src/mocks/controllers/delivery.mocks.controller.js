import DeliveryMockService from "../services/delivery.mocks.service.js"

class DeliveryMockController{
    static async mockingDeliveries(req, res){
        try{
            const rawCount = req.query.count || 100
            const count = parseInt(rawCount)
            const deliveries = await DeliveryMockService.generateMockDeliveries(count);
            return res.status(200).json({statusCode: 200, message: "Entregas mock generadas.", payload: deliveries});
        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message});
        }
    }

    static async generateDeliveries(req, res){
        try{
            const { count, saveToDatabase } = req.body;
            const deliveries = await DeliveryMockService.generateMockDeliveries(count);

            if(saveToDatabase){
                await DeliveryMockService.saveMockDeliveries(deliveries);
                return res.status(201).json({statusCode: 201, message: "Entregas mock generadas y guardados en base de datos.", payload: deliveries});
            }

            return res.status(200).json({statusCode: 200, message: "Entregas mock generadas.", payload: deliveries});
        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message});
        }
    }
}

export default DeliveryMockController;