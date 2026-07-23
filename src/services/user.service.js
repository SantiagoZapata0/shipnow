import UserRepository from "../repositories/user.repository.js";

class UserService{
    static async getAll(){
        const users = await UserRepository.getFor({});
        return users.map((users) => ({
            id: users._id,
            first_name: users.first_name,
            last_name: users.last_name,
            email: users.email,
            role: users.role
        }))
    }

    static async getByRole({role}){

        const usersByRole = await UserRepository.getFor({role});

        if(usersByRole.length === 0){
            const error = new Error(`No existen usuarios con rol: ${role}`);
            error.status = 404;
            throw error;
        }

        return usersByRole.map((user) => ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }));
    }

    static async getByEmail({email}){

        const userByEmail = await UserRepository.getByEmail(email)

        if(!userByEmail){
            const error = new Error("Usuario no encontrado.");
            error.status = 404;
            throw error;
        }

        return {
            first_name: userByEmail.first_name,
            last_name: userByEmail.last_name,
            email: userByEmail.email,
            password: userByEmail.password,
            role: userByEmail.role
        };
    }

    static async getById(id){
        const userById = await UserRepository.getById(id)

        if(!userById){
            const error = new Error("Usuario no encontrado.");
            error.status = 404;
            throw error;
        }
        
        return {
            first_name: userById.first_name,
            last_name: userById.last_name,
            email: userById.email,
            role: userById.role
        }
    }

    static async createOneUser({first_name, last_name, email, password, role}){
        
        if(!first_name || !last_name || !email || !password){
            const error = new Error("Todos los campos son obligatorios.");
            error.status = 400;
            throw error
        }

        if(password.length < 6){
            const error = new Error("La contraseña debe contener al menos 6 caracteres.");
            error.status = 400;
            throw error;
        }

        const existingUser = await UserRepository.getByEmail(email);

        if(existingUser){
            const error = new Error("El usuario ya existe.");
            error.status = 409;
            throw error;
        }

        const userCreated = await UserRepository.createOne({first_name, last_name, email, password, role})

        return {
            first_name: userCreated.first_name,
            last_name: userCreated.last_name,
            email: userCreated.email,
            role: userCreated.role
        };
    }

    static async updateOneUser(id, data){

        const existingUser = await UserRepository.getById(id)

        if(!existingUser){
            const error = new Error("El usuario no existe.");
            error.status = 404;
            throw error
        }

        if(data == null){
            const error = new Error("Introducir el contenido que desee actualizar.");
            error.status = 404;
            throw error
        }

        const updatedUser = await UserRepository.updateOne(id, data)

        return {
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            role: updatedUser.role
        }
    }

    static async deleteOneUser(id){
        const deletedUser = await UserRepository.deleteOne(id)

        if(!deletedUser){
            const error = new Error("El usuario no existe.")
            error.status = 404;
            throw error;
        }
    }
}

export default UserService;