import { ORDER_PRIORITY, ORDER_STATUS } from "../constants/constants.js";
import CustomError from "../errors/custom-error.js";
import OrderRepository from "../repositories/order.repository.js";
import ProductRepository from "../repositories/products.repository.js";
import UserRepository from "../repositories/user.repository.js";

class OrderService {
    static async getAllOrders() {
        return await OrderRepository.getAll();
    }

    static async getOrderById(orderId) {
        const order = await OrderRepository.getById(orderId);

        if (!order) {
            throw new CustomError("NOT_FOUND", "No existe una orden con el ID indicado.");
        }

        return order;
    }

    static async createOneOrder(data = {}) {
        const { user, items, status, priority } = data;

        if (!user) {
            throw new CustomError("BAD_REQUEST", "Debe indicar el usuario que realiza la orden.");
        }

        const existingUser = await UserRepository.getById(user);

        if (!existingUser) {
            throw new CustomError("NOT_FOUND", "El usuario indicado para la orden no existe.");
        }

        if (!Array.isArray(items) || items.length === 0) {
            throw new CustomError("BAD_REQUEST", "La orden debe incluir al menos un producto.");
        }

        if (status !== undefined && !Object.values(ORDER_STATUS).includes(status)) {
            throw new CustomError("VALIDATION_ERROR", "El estado de la orden no es válido.");
        }

        if (priority !== undefined && !Object.values(ORDER_PRIORITY).includes(priority)) {
            throw new CustomError("VALIDATION_ERROR", "La prioridad de la orden no es válida.");
        }

        let total = 0;
        const orderItems = [];

        for (const item of items) {
            if (!item?.product) {
                throw new CustomError("BAD_REQUEST", "Cada ítem de la orden debe indicar un producto.");
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                throw new CustomError("VALIDATION_ERROR", "La cantidad de cada producto debe ser un número entero mayor a cero.");
            }

            const product = await ProductRepository.findProductById(item.product);

            if (!product) {
                throw new CustomError("NOT_FOUND", "Uno de los productos indicados en la orden no existe.");
            }

            total += product.price * item.quantity;
            orderItems.push({ product: item.product, quantity: item.quantity });
        }

        return await OrderRepository.create({
            user,
            items: orderItems,
            total,
            status,
            priority
        });
    }

    static async updateOneOrder(orderId, data = {}) {
        const order = await OrderRepository.getById(orderId);

        if (!order) {
            throw new CustomError("NOT_FOUND", "La orden que se desea actualizar no existe.");
        }

        if (!data || Object.keys(data).length === 0) {
            throw new CustomError("BAD_REQUEST", "Debe indicar al menos un campo para actualizar la orden.");
        }

        const updateData = { ...data };

        if (updateData.user !== undefined) {
            const existingUser = await UserRepository.getById(updateData.user);

            if (!existingUser) {
                throw new CustomError("NOT_FOUND", "El usuario indicado para la orden no existe.");
            }
        }

        if (updateData.status !== undefined && !Object.values(ORDER_STATUS).includes(updateData.status)) {
            throw new CustomError("VALIDATION_ERROR", "El estado de la orden no es válido.");
        }

        if (updateData.priority !== undefined && !Object.values(ORDER_PRIORITY).includes(updateData.priority)) {
            throw new CustomError("VALIDATION_ERROR", "La prioridad de la orden no es válida.");
        }

        if (updateData.items !== undefined) {
            if (!Array.isArray(updateData.items) || updateData.items.length === 0) {
                throw new CustomError("BAD_REQUEST", "La orden debe incluir al menos un producto.");
            }

            let total = 0;
            const orderItems = [];

            for (const item of updateData.items) {
                if (!item?.product) {
                    throw new CustomError("BAD_REQUEST", "Cada ítem de la orden debe indicar un producto.");
                }

                if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                    throw new CustomError("VALIDATION_ERROR", "La cantidad de cada producto debe ser un número entero mayor a cero.");
                }

                const product = await ProductRepository.findProductById(item.product);

                if (!product) {
                    throw new CustomError("NOT_FOUND", "Uno de los productos indicados en la orden no existe.");
                }

                total += product.price * item.quantity;
                orderItems.push({ product: item.product, quantity: item.quantity });
            }

            updateData.items = orderItems;
            updateData.total = total;
        } else {
            delete updateData.total;
        }

        return await OrderRepository.update(orderId, updateData);
    }

    static async deleteOneOrder(orderId) {
        const deletedOrder = await OrderRepository.delete(orderId);

        if (!deletedOrder) {
            throw new CustomError("NOT_FOUND", "La orden que se desea eliminar no existe.");
        }

        return deletedOrder;
    }
}

export default OrderService;
