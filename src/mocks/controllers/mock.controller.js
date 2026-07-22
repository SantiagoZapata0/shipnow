import MockService from "../services/mock.service.js";

class MockController{
    static async mockingUsers(req, res){
        try{
            const rawCount = req.query.count || 100

            const count = rawCount ? parseInt(rawCount) : 10;

            const users = await MockService.generateMockUsers(count);

            return res.status(200).json({statusCode: 200, message: users})

        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }

    static async generateProducts(req, res){
        try{
            const { count, saveToDatabase } = req.body;
            const products = await MockService.generateMockUsers(count);

            if(saveToDatabase){
                await MockService.saveMockProducts(products)
                return res.status(201).json({statusCode: 201, message: "Productos generados y guardados en base de datos"})
            }

            return res.status(200).json({statusCode: 200, message: "Productos mock generados"})
        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }
}

export default MockController;