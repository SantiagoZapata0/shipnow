import CustomError from "../errors/custom-error.js";
import UserRepository from "../repositories/user.repository.js";
import { USER_ROLES } from "../constants/constants.js";

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

        if(role === undefined){
            throw new CustomError("BAD_REQUEST", "Debe especificar un rol para filtrar los usuarios.");
        }

        if(!Object.values(USER_ROLES).includes(role)){
            throw new CustomError("VALIDATION_ERROR", "Rol invalido.")
        }

        const usersByRole = await UserRepository.getFor({role});

        if(usersByRole.length === 0){
            throw new CustomError("NOT_FOUND", `No existen usuarios con rol: ${role.toUpperCase()}.`);
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
            throw new CustomError("NOT_FOUND", `No existe un usuario con el email: ${email}.`);
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
            throw new CustomError("NOT_FOUND", `No existe un usuario con el ID: ${id}.`);
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
            throw new CustomError("BAD_REQUEST", "Faltan campos obligatorios.");
        }

        if(password.length < 6){
            throw new CustomError("BAD_REQUEST", "La contraseña debe contener al menos 6 caracteres.");
        }

        const existingUser = await UserRepository.getByEmail(email);

        if(existingUser){
            throw new CustomError("DUPLICATE_KEY", "El email ya está en uso.");
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
            throw new CustomError("NOT_FOUND", "El usuario no existe.");
        }

        if(!data || Object.keys(data).length === 0){
            throw new CustomError("BAD_REQUEST", "Faltan campos obligatorios.");
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
            throw new CustomError("NOT_FOUND", "El usuario no existe.");
        }

        return {
            first_name: deletedUser.first_name,
            last_name: deletedUser.last_name,
            email: deletedUser.email,
            role: deletedUser.role
        }
    }
}

export default UserService;