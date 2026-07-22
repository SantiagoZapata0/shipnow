import ProductRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/constants.js";

class ProductService{
    static async getAllProducts(){
        return await ProductRepository.findProducts({});
    }
    static async getAvailableProducts(){
        return await ProductRepository.findProducts({status: PRODUCT_STATUS.AVAILABLE, stock: {$gt: 0}});
    }

    static async getProductById(prodId){
        return await ProductRepository.findProductById(prodId);
    }

    static async createOneProduct({name, description, price, status, stock}){
        
        const existingProduct = await ProductRepository.findProducts({name})
        
        if(!name || !description || !price){
            const error = new Error("Todos los campos son obligatorios");
            error.status = 400;
            throw error;
        }

        if(existingProduct.length > 0){
            const error = new Error("Nombre de producto duplicado");
            error.status = 400;
            throw error;
        }

        if(price < 0){
            const error = new Error("Precio invalido");
            error.status = 400;
            throw error;
        }

        return await ProductRepository.createProduct({name, description, price, status, stock})
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
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            status: updatedProduct.status,
            stock: updatedProduct.stock
        }
    }

    static async deleteOneProduct(prodId){

        if(!prodId){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error
        }
        
        return await ProductRepository.deleteProduct(prodId);
    }
}

export default ProductService;