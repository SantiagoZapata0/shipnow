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

    describe("Casos exitosos", function(){
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
        })

    describe("Casos de error", function(){
        it("[getById]: Por producto no encontrado (abarca UPDATE y DELETE)", async function(){
            try{
                await ProductService.getProdById("6a67d75d099a912328df3da0")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create]: Por campos faltantes", async function(){
            const invalidProduct = {...this.mockProduct[0], title: undefined}

            try{
                await ProductService.createOneProduct(invalidProduct)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create]: Por codigo de producto duplicado", async function(){
            const codeDuplicated = {...this.mockProduct[0], code: "CAJA-003"}

            try{
                await ProductService.createOneProduct(codeDuplicated)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("DUPLICATE_KEY")
                expect(err.statusCode).to.equal(409)
            }
        })

        it("[create]: Por estado de producto invalido", async function(){
            const invalidStatus = {...this.mockProduct[0], status: "pending"}

            try{
                await ProductService.createOneProduct(invalidStatus)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create]: Por precio invalido", async function(){
            const invalidPrice = {...this.mockProduct[0], price: -1}

            try{
                await ProductService.createOneProduct(invalidPrice)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })
        
        it("[update]: Por campos faltantes", async function(){
            try{
                await ProductService.updateOneProduct("6a878f2b781d03e63ba6f366", {})
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })
    })

    after(async function(){
       await disconnectDbSv() 
    })

})