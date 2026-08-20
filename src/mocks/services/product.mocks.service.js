import { faker } from "@faker-js/faker";
import { PRODUCT_STATUS } from "../../constants/constants.js";
import mongoose, { mongo } from "mongoose";
import CustomError from "../../errors/custom-error.js";
import ProductMocksRepository from "../repositories/product.mocks.repository.js";

class ProductMocksService {
    static async generateMockProducts(count) {
        if (!Number.isInteger(count) || count < 1 || count > 100) {
            throw new CustomError(
                "INVALID_MOCK_COUNT",
                "El número de productos a generar debe ser un número entre 1 y 100."
            );
        }

        const statuses = Object.values(PRODUCT_STATUS);

        const products = Array.from({ length: count }, (_, index) => ({
            _id,
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: `PROD-0${Math.random(25)}`,
            price: faker.number.float({ min: 100, max: 100000, fractionDigits: 2 }),
            stock: faker.number.int({ min: 0, max: 500 }),
            category: faker.commerce.department(),
            status: faker.helpers.arrayElement(statuses),
            thumbnails: [faker.internet.url()]
        }));

        return products;
    }

    static async saveMockProducts(products) {
        if (!Array.isArray(products) || products.length === 0) {
            throw new CustomError("MOCK_DATA_NOT_FOUND", "No hay productos mock para guardar.");
        }

        return ProductMocksRepository.saveManyProducts(products);
    }
}

export default ProductMocksService;
