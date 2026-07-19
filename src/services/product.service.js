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

    static async deleteOneProduct(prodId){
        return await ProductRepository.deleteProduct(prodId);
    }

    static async updateOneProduct(prodId, data){
        return await ProductRepository.updateProduct(prodId, data);
    }
}

export default ProductService;