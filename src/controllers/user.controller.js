import UserService from "../services/user.service.js"

class UserController {
    static async getAll(req, res){
        try{
            const users = await UserService.getAll()
            return res.status(200).json({statusCode: 200, message: users})
        } catch(err){
            return res.status(500).json({statusCode: 500, message: "Internal Server Error."})
        }
    }
}

export default UserController;