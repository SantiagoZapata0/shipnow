import { expect } from "chai"
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import ProductService from "../../src/services/product.service.js"
import ProductMocksService from "../../src/mocks/services/product.mocks.service.js";

describe("Test unitario sobre Product Service", function(){

    before(async function(){
        this.timeout(10000)
        await connectDbSv()

        this.mockProduct = await ProductMocksService.generateMockProducts(2);
    })

    it("Se debe crear un producto", async function(){
        const createdProduct = await ProductService.createOneProduct(this.mockProduct[0])
        this.product = createdProduct 
        expect(createdProduct).to.be.an("object").and.to.have.property("_id")
    })

    it("Se debe actualizar un producto", async function(){
        const product = await ProductService.updateOneProduct(this.product._id, {title: this.mockProduct[1].title})
        expect(product).to.be.an("object").and.to.have.property("_id")
    })

    it("Se deben obtener todos los productos de la base de datos", async function(){
        const products = await ProductService.getAllProducts();
        expect(products).to.be.an("array");
    });

    it("Se debe obtener un producto por su ID", async function(){
        const products = await ProductService.getProdById(this.product._id)
        expect(products).to.be.an("object").and.to.have.property("_id")
    })

    it("Se debe eliminar un producto", async function(){
        const product = await ProductService.deleteOneProduct(this.product._id)
        expect(product).to.be.an("object").and.to.have.property("_id")
    })

    after(async function(){
       await disconnectDbSv() 
    })

})