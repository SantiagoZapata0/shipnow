import ProductService from "../services/product.service.js";
import logger from "../config/logger.js";

class ProductController{
    static async getProducts(req, res, next){
        try{
            const products = await ProductService.getAllProducts();
            logger.info(`Productos encontrados. Cantidad encontrada: ${products.length}`);
            return res.status(200).json({statusCode: 200, message: "Productos encontrados.", payload: products})
        } catch(err){
            next(err)
        } 
    }

    static async getAvailableProducts(req, res, next){
        try{
            const availableProducts = await ProductService.getAvailableProds();
            if(availableProducts.length === 0){
                logger.info("Busqueda realizada, no se encontraron productos.");
                return res.status(200).json({statusCode: 200, message: "Busqueda realizada, no se encontraron productos.", payload: availableProducts})
            }

            logger.info(`Productos disponibles encontrados. Cantidad encontrada: ${availableProducts.length}`);
            return res.status(200).json({statusCode: 200, message: "Productos disponibles encontrados.", payload: availableProducts})
        } catch(err){
            next(err)
        } 
    }

    static async getProductById(req, res, next){
        try{
            const productFinded = await ProductService.getProdById(req.params.pid);
            logger.info(`Producto con ID: ${req.params.pid} encontrado`);
            return res.status(200).json({statusCode: 200, message: `Producto con ID: ${req.params.pid} encontrado`, payload: productFinded})
        } catch(err){
            next(err)
        } 
    }

    static async createProduct(req, res, next){
        try{
            const newProduct = await ProductService.createOneProduct(req.body)
            logger.info(`Producto creado. ID: ${newProduct._id}`);
            return res.status(201).json({statusCode: 201, message: `Producto creado.`, payload: newProduct})
        } catch(err){
            next(err)
        } 
    }

    static async updateProduct(req, res, next){
        try{
            const updatedProduct = await ProductService.updateOneProduct(req.params.pid, req.body);
            logger.info(`Producto actualizado. ID: ${req.params.pid}`);
            return res.status(200).json({statusCode: 200, message: `Producto actualizado.`, payload: updatedProduct})
        } catch(err){
            next(err)
        } 
    }

    static async deleteProduct(req, res, next){
        try{
            const deletedProduct = await ProductService.deleteOneProduct(req.params.pid)
            logger.info(`Producto eliminado. ID: ${req.params.pid}`);
            return res.status(200).json({statusCode: 200, message: `Producto eliminado.`, payload: deletedProduct})
        } catch(err){
            next(err)
        } 
    }
}

export default ProductController;