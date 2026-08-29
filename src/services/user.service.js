import CustomError from "../errors/custom-error.js";
import UserRepository from "../repositories/user.repository.js";
import fs from "fs"
import { USER_ROLES } from "../constants/constants.js";
import { DOCUMENT_TYPES } from "../constants/constants.js";

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

    static async getByRole(role){

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

    static async getByEmail(email){

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
            _id: userById._id,
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
            _id: userCreated._id,
            first_name: userCreated.first_name,
            last_name: userCreated.last_name,
            email: userCreated.email,
            role: userCreated.role
        };
    }

    static async updateOneUser(id, data, files){

        const existingUser = await UserRepository.getById(id)

        const effectiveRole = data.role !== undefined ? data.role : existingUser.role;

        if(!existingUser){
            throw new CustomError("NOT_FOUND", "El usuario no existe.");
        }

        if(!data || Object.keys(data).length === 0){
            throw new CustomError("BAD_REQUEST", "Faltan campos obligatorios.");
        }

        if(files){
             if(effectiveRole === USER_ROLES.COURIER && !files){
                throw new CustomError("BAD_REQUEST", "Para ser repartidor necesitas agregar una licencia")
            }

            if(files && (!data.documentType || !Object.values(DOCUMENT_TYPES).includes(data.documentType))){
                fs.unlinkSync(files.path)
                throw new CustomError("INVALID_DOCUMENT_TYPE", "Debe insertar un tipo de documento valido")
            }

            if(files && effectiveRole !== USER_ROLES.COURIER && data.documentType === DOCUMENT_TYPES.COURIER_LICENSE){
                fs.unlinkSync(files.path)
                throw new CustomError("INVALID_DOCUMENT_TYPE", "Las licencias son solo para repartidores")
            }

            if(existingUser.documents.length === 3){
                throw new CustomError("BAD_REQUEST", "Limite de archivos alcanzado")
            }

            const existingDocuments = existingUser.documents.some((doc) => doc.originalName === files.originalname);
            if(existingDocuments){
                fs.unlinkSync(files.path)
                throw new CustomError("DUPLICATE_KEY", "Archivo ya existente")
            }

            existingUser.documents.push({
                originalName: files.originalname,
                generatedName: files.filename,
                path: `src/uploads/documents/${files.filename}`,
                type: files.mimetype,
                size: files.size,
                documentType: data.documentType,
                uploadedAt: new Date()
            })
            
            await existingUser.save()

                return {
                    _id: existingUser._id,
                    first_name: existingUser.first_name,
                    last_name: existingUser.last_name,
                    email: existingUser.email,
                    role: existingUser.role,
                    documents: existingUser.documents
                }
            }

            Object.assign(existingUser, data);
            await existingUser.save()

            return {
                _id: existingUser._id,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                email: existingUser.email,
                role: existingUser.role,
                documents: existingUser.documents
            }
        }   

    static async deleteOneUser(id){
        const deletedUser = await UserRepository.deleteOne(id)

        if(!deletedUser){
            throw new CustomError("NOT_FOUND", "El usuario no existe.");
        }

        return {
            _id: deletedUser._id,
            first_name: deletedUser.first_name,
            last_name: deletedUser.last_name,
            email: deletedUser.email,
            role: deletedUser.role
        }
    }
}

export default UserService;