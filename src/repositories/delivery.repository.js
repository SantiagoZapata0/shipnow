import DeliveryModel from "../models/delivery.model.js";

class DeliveryRepository {
    static async getAll(skip, limit) {
        return await DeliveryModel.find().skip(skip).limit(limit);
    }

    static async countDeliveries(){
        return await DeliveryModel.countDocuments();
    }

    static async getById(deliveryId) {
        return await DeliveryModel.findById(deliveryId);
    }

    static async create(data) {
        return await DeliveryModel.create(data);
    }

    static async update(deliveryId, data) {
        return await DeliveryModel.findByIdAndUpdate(deliveryId, data, { returnDocument: "after" });
    }

    static async delete(deliveryId) {
        return await DeliveryModel.findByIdAndDelete(deliveryId);
    }
}

export default DeliveryRepository;
