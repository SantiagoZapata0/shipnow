import UserModel from "../../models/user.model.js";

class UserMockRepository{
    static async saveMany(data){
        return await UserModel.insertMany(data);
    }
}

export default UserMockRepository;