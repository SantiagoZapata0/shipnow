import ProductService from "../services/product.service.js";

class ProductController{
    static async getProducts(req, res){
        try{
            const products = await ProductService.getAllProducts()
            return res.status(200).json({statusCode: 200, message: "Productos encontrados.", payload: products})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al encontrar productos. Error: ${err.message}`})
        } 
    }

    static async getAvailableProducts(req, res){
        try{
            const availableProducts = await ProductService.getAvailableProds();
            if(availableProducts.length === 0){
                return res.status(200).json({statusCode: 200, message: "Busqueda realizada, no se encontraron productos.", payload: availableProducts})
            }
            return res.status(200).json({statusCode: 200, message: "Productos disponibles encontrados.", payload: availableProducts})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al encontrar productos. Error: ${err.message}`})
        } 
    }

    static async getProductById(req, res){
        try{
            const productFinded = await ProductService.getProdById(req.params.pid)
            return res.status(200).json({statusCode: 200, message: `Producto con ID: ${req.params.pid} encontrado`, payload: productFinded})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al encontrar producto. Error: ${err.message}`})
        } 
    }

    static async createProduct(req, res){
        try{
            const newProduct = await ProductService.createOneProduct(req.body)
            return res.status(201).json({statusCode: 201, message: `Producto creado.`, payload: newProduct})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al crear producto. Error: ${err.message}`})
        } 
    }

    static async updateProduct(req, res){
        try{
            const updatedProduct = await ProductService.updateOneProduct(req.params.pid, req.body)
            return res.status(200).json({statusCode: 200, message: `Producto actualizado.`, payload: updatedProduct})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al actualizar producto. Error: ${err.message}`})
        } 
    }

    static async deleteProduct(req, res){
        try{
            const deletedProduct = await ProductService.deleteOneProduct(req.params.pid)
            return res.status(200).json({statusCode: 200, message: `Producto eliminado.`, payload: deletedProduct})
        } catch(err){
            return res.status(err.status || 500).json({statusCode: err.status || 500, message: `Fallo al eliminar producto. Error: ${err.message}`})
        } 
    }
}

export default ProductController;