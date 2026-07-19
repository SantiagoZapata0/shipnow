import ProductModel from "../models/product.model.js"

class ProductRepository{
    static async findProducts(filters){
        return await ProductModel.find(filters)
    }

    static async findProductById(prodId){
        return await ProductModel.findById(prodId)
    }

    static async createProduct(data){
        return await ProductModel.create(data)
    }

    static async updateProduct(prodId, data){
        return await ProductModel.findByIdAndUpdate(prodId, data, {returnDocument: "after"});
    }

    static async deleteProduct(prodId){
        return await ProductModel.findByIdAndDelete(prodId)
    }
}

export default ProductRepository;