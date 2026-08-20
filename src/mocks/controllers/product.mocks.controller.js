import logger from "../../config/logger.js";
import ProductMocksService from "../services/product.mocks.service.js";

class ProductMocksController {
    static async mockingProducts(req, res, next) {
        try {
            const count = parseInt(req.query.count || 100, 10);
            const products = await ProductMocksService.generateMockProducts(count);

            logger.info(`Mocks de productos generados. Cantidad generada: ${count}`);
            return res.status(200).json({statusCode: 200, message: "Productos mock generados.", payload: products});
        } catch (error) {
            next(error);
        }
    }

    static async generateProducts(req, res, next) {
        try {
            const { count, saveToDatabase } = req.body ?? {};
            const countInt = parseInt(count, 10);
            const products = await ProductMocksService.generateMockProducts(countInt);

            if (saveToDatabase) {
                await ProductMocksService.saveMockProducts(products);
                logger.info(`Mocks de productos generados y guardados en base de datos. Cantidad generada: ${countInt}`);
                return res.status(201).json({statusCode: 201, message: "Productos mock generados y guardados en base de datos.", payload: products});
            }

            logger.info(`Mocks de productos generados. Cantidad generada: ${countInt}`);
            return res.status(200).json({statusCode: 200, message: "Productos mock generados.", payload: products});
        } catch (error) {
            next(error);
        }
    }
}

export default ProductMocksController;