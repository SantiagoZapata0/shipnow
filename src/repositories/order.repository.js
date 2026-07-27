import OrderModel from "../models/order.model.js"

class OrderRepository{
    static async getOrders(){
        return await OrderModel.find()
    }
}

export default OrderRepository;