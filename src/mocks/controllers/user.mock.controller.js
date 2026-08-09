import UserMockService from "../services/user.mocks.service.js";
import logger from "../../config/logger.js";

class UserMockController{
    static async mockingUsers(req, res, next){
        try{
            const rawCount = req.query.count || 100;
            const count = parseInt(rawCount);
            const users = await UserMockService.generateMockUsers(count);

            logger.info(`Mocks de usuarios generados. Cantidad generada: ${count}`);
            return res.status(200).json({statusCode: 200, message: "Usuarios mock generados.", payload: users});
        } catch(err){
            next(err);
        }
    }

    static async generateUsers(req, res, next){
        try{
            const { count, saveToDatabase } = req.body;
            const countInt = parseInt(count);
            const users = await UserMockService.generateMockUsers(countInt);

            if(saveToDatabase){
                await UserMockService.saveMockUsers(users);
                logger.info(`Mocks de usuarios generados y guardados en base de datos. Cantidad generada: ${count}`);
                return res.status(201).json({statusCode: 201, message: "Usuarios generados y guardados en base de datos.", payload: users});
            }

            logger.info(`Mocks de usuarios generados. Cantidad generada: ${count}`);
            return res.status(200).json({statusCode: 200, message: "Usuarios mock generados.", payload: users});
        } catch(err){
            next(err);
        }
    }
}

export default UserMockController;