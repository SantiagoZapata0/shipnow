import OrderModel from "../../models/order.model.js";

class OrderMocksRepository{
    static async saveManyOrders(orders){
        return await OrderModel.insertMany(orders)
    }
}

export default OrderMocksRepository;