import OrderMockService from "../services/order.mocks.service.js";

class OrderMockController{
    static async mockingOrders(req, res, next){
        try{
            const rawCount = req.query.count || 100;
            const count = parseInt(rawCount);
            const orders = await OrderMockService.generateMockOrders(count)

            return res.status(200).json({statusCode: 200, payload: orders})
        } catch(err){
            next(err)
        }
    }

    static async generateOrders(req, res, next){
        try{
            const { count, saveToDatabase } = req.body;
            const orders = await OrderMockService.generateMockOrders(count)

            if(saveToDatabase){
                await OrderMockService.saveMockOrders(orders);
                return res.status(201).json({statusCode: 201, message: "Ordenes creadas y guardadas en base de datos.", payload: orders})
            }

            return res.status(200).json({statusCode: 200, message: "Ordenes mock generadas.", payload: orders})
        } catch(err){
            next(err)
        }
        
    }
}

export default OrderMockController;