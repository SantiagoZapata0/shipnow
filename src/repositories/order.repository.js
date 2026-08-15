import OrderModel from "../models/order.model.js"

class OrderRepository{
    static async getAll(){
        return await OrderModel.find()
    }

    static async getById(orderId){
        return await OrderModel.findById(orderId)
    }

    static async create(data){
        return await OrderModel.create(data)
    }

    static async update(orderId, data){
        return await OrderModel.findByIdAndUpdate(orderId, data, {returnDocument: "after"})
    }

    static async delete(orderId){
        return await OrderModel.findByIdAndDelete(orderId)
    }
}

export default OrderRepository;
