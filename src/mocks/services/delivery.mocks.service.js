import { faker } from "@faker-js/faker";
import UserRepository from "../../repositories/user.repository.js"
import OrderRepository from "../../repositories/order.repository.js"
import DeliveryMocksRepository from "../repositories/delivery.mocks.repository.js";
import { USER_ROLES, DELIVERY_STATUS } from "../../constants/constants.js"
import CustomError from "../../errors/custom-error.js";

class DeliveryMockService{
    static async generateMockDeliveries(count){
        const couriers = await UserRepository.getFor({role: USER_ROLES.COURIER});
        const orders = await OrderRepository.getOrders();
        const statusAvailables = Object.values(DELIVERY_STATUS);

        if(!Number.isInteger(count) || count > 100 || count <= 0){
            throw new CustomError("INVALID_MOCK_COUNT", "El número de entregas a generar debe ser un número.");
        }

        if(couriers.length < 1 || orders.length < 1){
            throw new CustomError("MOCK_DATA_NOT_FOUND", "No existen usuarios o ordenes en la base de datos.");
        }

        if(statusAvailables.length < 1){
            throw new CustomError("MOCK_DATA_NOT_FOUND", "No existen entregas en la base de datos.");
        }

        const delivery = Array.from({length: count}, () => {
            const hasCourier = faker.datatype.boolean();
            const courier = hasCourier ? faker.helpers.arrayElement(couriers) : undefined
            const courierId = courier ? courier._id : undefined

            const order = faker.helpers.arrayElement(orders)

            const estimatedFrom = faker.date.soon({days: 2})
            const fromInMs = estimatedFrom.getTime()
            const estimatedTo = new Date(fromInMs + 24 * 60 * 60 * 1000 * 7 ) // Le sumamos una semana.

            return {
                order: order._id,
                courier: courierId,
                status: faker.helpers.arrayElement(statusAvailables),
                address: faker.location.streetAddress({useFullAddress: true}),
                estimatedFrom: estimatedFrom,
                estimatedTo: estimatedTo
            }
        })
        return delivery;
    }

    static async saveMockDeliveries(deliveries){
        await DeliveryMocksRepository.saveManyDeliveries(deliveries);
    }
}

export default DeliveryMockService;