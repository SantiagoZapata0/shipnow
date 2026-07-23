import UserService from "../services/user.service.js"

class UserController {
    static async getUsers(req, res){
        try{
            const users = await UserService.getAll()
            return res.status(200).json({statusCode: 200, message: "Usuarios encontrados.", payload: users})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async getUserByRole(req, res){
        try{
            const { role } = req.query;
            const users = await UserService.getByRole({role});
            return res.status(200).json({statusCode: 200, message: `Usuarios encontrados con rol: ${role}.`, payload: users})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async getUserByEmail(req, res){

        //TODO: Este endpoint expone el password sin protección.
        //! Restringir con middleware de autorización (solo ADMIN) cuando se implemente JWT/auth.
        try{
            const user = await UserService.getByEmail(req.body);
            return res.status(200).json({statusCode: 200, message: "Usuario encontrado.", payload: user})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async getUserById(req, res){
        try{
            const user = await UserService.getById(req.params.uid);
            return res.status(200).json({statusCode: 200, message: "Usuario encontrado.", payload: user})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async createUser(req, res){
        try{
            const user = await UserService.createOneUser(req.body);
            return res.status(201).json({statusCode: 201, message: "Usuario creado.", payload: user})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async updateUser(req, res){
        try{
            const user = await UserService.updateOneUser(req.params.uid, req.body);
            return res.status(200).json({statusCode: 200, message: "Usuario actualizado.", payload: user})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }

    static async deleteUser(req, res){
        try{
            const user = await UserService.deleteOneUser(req.params.uid);
            return res.status(200).json({statusCode: 200, message: "Usuario eliminado.", payload: user})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: err.message})
        }
    }
}

export default UserController;