import ProductRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/constants.js";

class ProductService{
    static async getAllProducts(){
        const allProducts = await ProductRepository.findProducts({});

        return allProducts.map((prod) => ({
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            stock: prod.stock,
            category: prod.category,
            status: prod.status,
            thumbnails: prod.thumbnails
        }))
    }

    static async getAvailableProds(){

        const availableProducts = await ProductRepository.findProducts({status: PRODUCT_STATUS.AVAILABLE, stock: {$gt: 0}});

        return availableProducts.map((prod) => ({
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            stock: prod.stock,
            category: prod.category,
            status: prod.status,
            thumbnails: prod.thumbnails
        }))
    }

    static async getProdById(prodId){
        return await ProductRepository.findProductById(prodId);
    }

    static async createOneProduct({title, description, code, price, stock, category, status, thumbnails}){
        
        const existingProducts = await ProductRepository.findProducts({code})
        
        if(!title || !description || !code || !price || !category){
            const error = new Error("Todos los campos son obligatorios");
            error.status = 400;
            throw error;
        }

        if(existingProducts.length > 0){
            const error = new Error("Nombre de producto duplicado");
            error.status = 400;
            throw error;
        }

        if(price < 0){
            const error = new Error("Precio invalido");
            error.status = 400;
            throw error;
        }

        const createdProduct = await ProductRepository.createProduct({title, description, code, price, stock, category, status, thumbnails})
        
        return {
            title: createdProduct.title,
            description: createdProduct.description,
            code: createdProduct.code,
            price: createdProduct.price,
            stock: createdProduct.stock,
            category: createdProduct.category,
            status: createdProduct.status,
            thumbnails: createdProduct.thumbnails
        }
    }

    static async updateOneProduct(prodId, data){

        const updatedProduct = await ProductRepository.updateProduct(prodId, data);
        
        if(!updatedProduct){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }

        return {
            id: updatedProduct._id,
            title: updatedProduct.title,
            description: updatedProduct.description,
            code: updatedProduct.code,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            category: updatedProduct.category,
            status: updatedProduct.status,
            thumbnails: updatedProduct.thumbnails
        }
    }

    static async deleteOneProduct(prodId){

        const deletedProduct = await ProductRepository.deleteProduct(prodId);

        if(!deletedProduct){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error
        }
    }
}

export default ProductService;