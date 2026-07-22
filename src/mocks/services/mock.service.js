import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../../constants/constants.js";
import ProductModel from "../../models/product.model.js";
import UserModel from "../../models/user.model.js";

class MockService{
    static generateMockUsers = async (count) => {
        const roles = Object.values(USER_ROLES);

        const users = Array.from({length: count}, () => {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement(roles)
            }
        })
        return users;
    }

    static saveMockProducts = async (products) => {
        await UserModel.insertMany(products);
    }
}

export default MockService;