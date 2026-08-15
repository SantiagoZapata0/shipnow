import { DELIVERY_STATUS, USER_ROLES } from "../constants/constants.js";
import CustomError from "../errors/custom-error.js";
import DeliveryRepository from "../repositories/delivery.repository.js";
import OrderRepository from "../repositories/order.repository.js";
import UserRepository from "../repositories/user.repository.js";

class DeliveryService {
    static async getAllDeliveries() {
        return await DeliveryRepository.getAll();
    }

    static async getDeliveryById(deliveryId) {
        const delivery = await DeliveryRepository.getById(deliveryId);

        if (!delivery) {
            throw new CustomError("NOT_FOUND", "No existe una entrega con el ID indicado.");
        }

        return delivery;
    }

    static async createOneDelivery(data = {}) {
        const { order, courier, status, address, estimatedFrom, estimatedTo } = data;

        if (!order || !estimatedFrom || !estimatedTo) {
            throw new CustomError("BAD_REQUEST", "Debe indicar la orden y las fechas estimadas de la entrega.");
        }

        const existingOrder = await OrderRepository.getById(order);

        if (!existingOrder) {
            throw new CustomError("NOT_FOUND", "La orden indicada para la entrega no existe.");
        }

        if (courier) {
            const existingCourier = await UserRepository.getById(courier);

            if (!existingCourier) {
                throw new CustomError("NOT_FOUND", "El repartidor indicado para la entrega no existe.");
            }

            if (existingCourier.role !== USER_ROLES.COURIER) {
                throw new CustomError("VALIDATION_ERROR", "El usuario indicado debe tener el rol de repartidor.");
            }
        }

        if (status !== undefined && !Object.values(DELIVERY_STATUS).includes(status)) {
            throw new CustomError("VALIDATION_ERROR", "El estado de la entrega no es válido.");
        }

        const fromDate = new Date(estimatedFrom);
        const toDate = new Date(estimatedTo);

        if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
            throw new CustomError("VALIDATION_ERROR", "Las fechas estimadas de la entrega no son válidas.");
        }

        if (toDate <= fromDate) {
            throw new CustomError("VALIDATION_ERROR", "La fecha estimada de finalización debe ser posterior a la fecha de inicio.");
        }

        return await DeliveryRepository.create({
            order,
            courier,
            status,
            address,
            estimatedFrom: fromDate,
            estimatedTo: toDate
        });
    }

    static async updateOneDelivery(deliveryId, data = {}) {
        const delivery = await DeliveryRepository.getById(deliveryId);

        if (!delivery) {
            throw new CustomError("NOT_FOUND", "La entrega que se desea actualizar no existe.");
        }

        if (!data || Object.keys(data).length === 0) {
            throw new CustomError("BAD_REQUEST", "Debe indicar al menos un campo para actualizar la entrega.");
        }

        const updateData = { ...data };

        if (updateData.order !== undefined) {
            const existingOrder = await OrderRepository.getById(updateData.order);

            if (!existingOrder) {
                throw new CustomError("NOT_FOUND", "La orden indicada para la entrega no existe.");
            }
        }

        if (updateData.courier !== undefined && updateData.courier !== null) {
            const existingCourier = await UserRepository.getById(updateData.courier);

            if (!existingCourier) {
                throw new CustomError("NOT_FOUND", "El repartidor indicado para la entrega no existe.");
            }

            if (existingCourier.role !== USER_ROLES.COURIER) {
                throw new CustomError("VALIDATION_ERROR", "El usuario indicado debe tener el rol de repartidor.");
            }
        }

        if (updateData.status !== undefined && !Object.values(DELIVERY_STATUS).includes(updateData.status)) {
            throw new CustomError("VALIDATION_ERROR", "El estado de la entrega no es válido.");
        }

        if (updateData.estimatedFrom === null || updateData.estimatedTo === null) {
            throw new CustomError("VALIDATION_ERROR", "Las fechas estimadas de la entrega no son válidas.");
        }

        const fromDate = updateData.estimatedFrom !== undefined ? new Date(updateData.estimatedFrom) : delivery.estimatedFrom;
        const toDate = updateData.estimatedTo !== undefined ? new Date(updateData.estimatedTo) : delivery.estimatedTo;

        if (Number.isNaN(new Date(fromDate).getTime()) || Number.isNaN(new Date(toDate).getTime())) {
            throw new CustomError("VALIDATION_ERROR", "Las fechas estimadas de la entrega no son válidas.");
        }

        if (new Date(toDate) <= new Date(fromDate)) {
            throw new CustomError("VALIDATION_ERROR", "La fecha estimada de finalización debe ser posterior a la fecha de inicio.");
        }

        if (updateData.estimatedFrom !== undefined) {
            updateData.estimatedFrom = new Date(updateData.estimatedFrom);
        }

        if (updateData.estimatedTo !== undefined) {
            updateData.estimatedTo = new Date(updateData.estimatedTo);
        }

        return await DeliveryRepository.update(deliveryId, updateData);
    }

    static async deleteOneDelivery(deliveryId) {
        const deletedDelivery = await DeliveryRepository.delete(deliveryId);

        if (!deletedDelivery) {
            throw new CustomError("NOT_FOUND", "La entrega que se desea eliminar no existe.");
        }

        return deletedDelivery;
    }
}

export default DeliveryService;
