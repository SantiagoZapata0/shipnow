import UserMockService from "../services/user.mocks.service.js";

class UserMockController{
    static async mockingUsers(req, res){
        try{
            const rawCount = req.query.count || 100
            const count = parseInt(rawCount);
            const users = await UserMockService.generateMockUsers(count);

            return res.status(200).json({statusCode: 200, message: "Usuarios mock generados.", payload: users})

        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }

    static async generateUsers(req, res){
        try{
            const { count, saveToDatabase } = req.body;
            const users = await UserMockService.generateMockUsers(count);

            if(saveToDatabase){
                await UserMockService.saveMockUsers(users)
                return res.status(201).json({statusCode: 201, message: "Usuarios generados y guardados en base de datos.", payload: users})
            }

            return res.status(200).json({statusCode: 200, message: "Usuarios mock generados.", payload: users})
        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }
}

export default UserMockController;