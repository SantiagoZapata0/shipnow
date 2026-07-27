import DeliveryModel from "../../models/delivery.model.js"

class DeliveryMocksRepository{
    static async saveManyDeliveries(deliveries){
        return await DeliveryModel.insertMany(deliveries)
    }
}

export default DeliveryMocksRepository;