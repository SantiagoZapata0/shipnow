import ProductService from "../services/product.service.js";

class ProductController{
    static async getProducts(req, res, next){
        try{
            const products = await ProductService.getAllProducts()
            return res.status(200).json({statusCode: 200, message: "Productos encontrados.", payload: products})
        } catch(err){
            next(err)
        } 
    }

    static async getAvailableProducts(req, res, next){
        try{
            const availableProducts = await ProductService.getAvailableProds();
            if(availableProducts.length === 0){
                return res.status(200).json({statusCode: 200, message: "Busqueda realizada, no se encontraron productos.", payload: availableProducts})
            }
            return res.status(200).json({statusCode: 200, message: "Productos disponibles encontrados.", payload: availableProducts})
        } catch(err){
            next(err)
        } 
    }

    static async getProductById(req, res, next){
        try{
            const productFinded = await ProductService.getProdById(req.params.pid)
            return res.status(200).json({statusCode: 200, message: `Producto con ID: ${req.params.pid} encontrado`, payload: productFinded})
        } catch(err){
            next(err)
        } 
    }

    static async createProduct(req, res, next){
        try{
            const newProduct = await ProductService.createOneProduct(req.body)
            return res.status(201).json({statusCode: 201, message: `Producto creado.`, payload: newProduct})
        } catch(err){
            next(err)
        } 
    }

    static async updateProduct(req, res, next){
        try{
            const updatedProduct = await ProductService.updateOneProduct(req.params.pid, req.body)
            return res.status(200).json({statusCode: 200, message: `Producto actualizado.`, payload: updatedProduct})
        } catch(err){
            next(err)
        } 
    }

    static async deleteProduct(req, res, next){
        try{
            const deletedProduct = await ProductService.deleteOneProduct(req.params.pid)
            return res.status(200).json({statusCode: 200, message: `Producto eliminado.`, payload: deletedProduct})
        } catch(err){
            next(err)
        } 
    }
}

export default ProductController;