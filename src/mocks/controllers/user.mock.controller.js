import { parse } from "dotenv";
import MockService from "../services/user.mock.service.js";

class MockController{
    static async mockingUsers(req, res){
        try{
            const rawCount = req.query.count || 100

            const count = parseInt(rawCount);

            const users = await MockService.generateMockUsers(count);

            return res.status(200).json({statusCode: 200, payload: users})

        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }

    static async generateUsers(req, res){
        try{
            const { count, saveToDatabase } = req.body;
            const users = await MockService.generateMockUsers(count);

            if(saveToDatabase){
                await MockService.saveMockUsers(users)
                return res.status(201).json({statusCode: 201, message: "Usuarios generados y guardados en base de datos"})
            }

            return res.status(200).json({statusCode: 200, message: "Usuarios mock generados"})
        } catch(err){
            return res.status(500).json({statusCode: 500, message: err.message})
        }
    }
}

export default MockController;