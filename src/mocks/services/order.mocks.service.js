import { faker } from "@faker-js/faker";
import { ORDER_PRIORITY, ORDER_STATUS } from "../../constants/constants.js";
import UserRepository from "../../repositories/user.repository.js";
import ProductRepository from "../../repositories/products.repository.js"

class OrderMockService{
    static async generateMockOrders(count){
        const users = await UserRepository.getFor({})
        const products = await ProductRepository.findProducts({});

        const result = Array.from({length: count}, () => {
            const randomUser = faker.helpers.arrayElement(users);
            const randomProduct = faker.helpers.arrayElements(products, {min: 1, max: 5});

            const items = randomProduct.map((prod) => {
                const quantity = faker.number.int({min: 1, max: 5})
                return {
                    product: prod._id,
                    quantity: quantity,
                }
            })

            const itemTotal = randomProduct.map((prod) => {
                const quantity = faker.number.int({min: 1, max: 5})
                return {
                    total: prod.price * quantity
                }
            })
            
            return {
                user: randomUser._id,
                items: items,
                total: itemTotal.reduce((acc, item) => acc + item.total, 0),
            }
        })
    }
}

export default OrderMockService;