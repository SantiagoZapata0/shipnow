import ProductModel from "../../models/product.model.js";

class ProductMocksRepository {
    static async saveManyProducts(products) {
        return ProductModel.insertMany(products);
    }
}

export default ProductMocksRepository;
