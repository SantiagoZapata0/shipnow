import UserModel from "../models/user.model.js";

class UserRepository{

    static async getFor(filter){
        return await UserModel.find(filter)
    }

    static async getByEmail(email){
        return await UserModel.findOne({email}).select("+password")
    }

    static async getById(id){
        return await UserModel.findById(id)
    }

    static async createOne(data){
        return await UserModel.create(data);
    }

    static async updateOne(id, data){
        return await UserModel.findByIdAndUpdate(id, data, {returnDocument: "after"});
    }

    static async deleteOne(id){
        return await UserModel.findByIdAndDelete(id);
    }
}

export default UserRepository;