import ProductRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/constants.js";
import CustomError from "../errors/custom-error.js";

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
        const product = await ProductRepository.findProductById(prodId);

        if(!product){
            throw new CustomError("NOT_FOUND", "Producto no encontrado.");
        }

        return {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            category: product.category,
            status: product.status,
            thumbnails: product.thumbnails
        }
    }

    static async createOneProduct({title, description, code, price, stock, category, status, thumbnails}){
        
        const existingProducts = await ProductRepository.findProducts({code})
        
        if(!title || !description || !code || !category){
            throw new CustomError("BAD_REQUEST", "Faltan campos obligatorios.");
        }

        if(existingProducts.length > 0){
            throw new CustomError("DUPLICATE_KEY", "Codigo de producto duplicado.");
        }

        if(status && !Object.values(PRODUCT_STATUS).includes(status)){
            throw new CustomError("VALIDATION_ERROR", "Estado de producto invalido.")
        }

        if(price <= 0){
            throw new CustomError("BAD_REQUEST", "Precio invalido.");
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
            throw new CustomError("NOT_FOUND", "Producto no encontrado.");
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
            throw new CustomError("NOT_FOUND", "Producto no encontrado.");
        }

        return {
            title: deletedProduct.title,
            description: deletedProduct.description,
            code: deletedProduct.code,
            price: deletedProduct.price,
            stock: deletedProduct.stock,
            category: deletedProduct.category,
            status: deletedProduct.status,
            thumbnails: deletedProduct.thumbnails
        }
    }
}

export default ProductService;