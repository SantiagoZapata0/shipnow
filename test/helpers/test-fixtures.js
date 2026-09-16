import DeliveryModel from "../../src/models/delivery.model.js";
import OrderModel from "../../src/models/order.model.js";
import ProductModel from "../../src/models/product.model.js";
import UserModel from "../../src/models/user.model.js";
import DeliveryMockService from "../../src/mocks/services/delivery.mocks.service.js";
import OrderMockService from "../../src/mocks/services/order.mocks.service.js";
import ProductMocksService from "../../src/mocks/services/product.mocks.service.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";
import OrderService from "../../src/services/order.service.js";
import ProductService from "../../src/services/product.service.js";
import UserService from "../../src/services/user.service.js";

export async function createOrderDependencies() {
    const [userMock] = await UserMockService.generateMockUsers(1);
    const user = await UserService.createOneUser(userMock);

    const [productMock] = await ProductMocksService.generateMockProducts(1);
    const product = await ProductService.createOneProduct(productMock);

    return { user, product };
}

export async function createDeliveryDependencies() {
    const dependencies = await createOrderDependencies();
    const [orderMock] = await OrderMockService.generateMockOrders(1);
    const order = await OrderService.createOneOrder(orderMock);

    return { ...dependencies, order };
}

export async function cleanupDependencies({ order, product, user } = {}) {
    if (order?._id) {
        await DeliveryModel.deleteMany({ order: order._id });
        await OrderModel.findByIdAndDelete(order._id);
    }

    if (product?._id) {
        await ProductModel.findByIdAndDelete(product._id);
    }

    if (user?._id) {
        await UserModel.findByIdAndDelete(user._id);
    }
}
