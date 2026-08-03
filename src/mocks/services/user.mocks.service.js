import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../../constants/constants.js";
import UserMockRepository from "../repositories/user.mocks.repository.js";
import CustomError from "../../errors/custom-error.js";

class UserMockService{
    static generateMockUsers = async (count) => {
        const roles = Object.values(USER_ROLES);

        if(!Number.isInteger(count) || count < 1 || count > 100){
            throw new CustomError("INVALID_MOCK_COUNT", "El número de usuarios a generar debe ser un número.");
        }

        if(roles.length < 1){
            throw new CustomError("MOCK_DATA_NOT_FOUND", "No existen roles disponibles.");
        }

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

    static saveMockUsers = async (users) => {
        await UserMockRepository.saveMany(users)
    }
}

export default UserMockService;