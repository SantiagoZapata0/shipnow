import { faker } from "@faker-js/faker";
import { ORDER_PRIORITY, ORDER_STATUS } from "../../constants/constants.js";
import UserRepository from "../../repositories/user.repository.js";
import ProductRepository from "../../repositories/products.repository.js"
import OrderMocksRepository from "../repositories/order.mocks.repository.js";
import CustomError from "../../errors/custom-error.js";

class OrderMockService{
    static async generateMockOrders(count){
        const users = await UserRepository.getFor({})
        const products = await ProductRepository.findProducts({});
        
        if(!Number.isInteger(count) || count > 100 || count <= 0){
            throw new CustomError("INVALID_MOCK_COUNT", "El número de ordenes a generar debe ser un número.");
        }

        if(users.length < 1 || products.length < 1){
            throw new CustomError("MOCK_DATA_NOT_FOUND", "No existen usuarios o productos en la base de datos.");
        }

        const result = Array.from({length: count}, () => {
            const randomUser = faker.helpers.arrayElement(users);
            const randomProduct = faker.helpers.arrayElements(products, {min: 1, max: 5});
            const status = Object.values(ORDER_STATUS);
            const priority = Object.values(ORDER_PRIORITY);

            const rawItems = randomProduct.map((prod) => {
                const quantity = faker.number.int({min: 1, max: 5})
                return {
                    product: prod._id,
                    quantity: quantity,
                    total: prod.price * quantity
                }
            })

            const items = rawItems.map((prod) => {
                return {
                    product: prod.product,
                    quantity: prod.quantity
                }
            })

            const total = rawItems.reduce((acc, item) => acc + item.total, 0)
            
            return {
                user: randomUser._id,
                items: items,
                total: total,
                status: faker.helpers.arrayElement(status),
                priority: faker.helpers.arrayElement(priority)
            }
        })
        return result
    }

    static async saveMockOrders(orders){
        await OrderMocksRepository.saveManyOrders(orders)
    }
}

export default OrderMockService;