import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js"
import OrderMockService from "../../src/mocks/services/order.mocks.service.js";
import OrderService from "../../src/services/order.service.js";
import UserService from "../../src/services/user.service.js";
import ProductService from "../../src/services/product.service.js";
import ProductMocksService from "../../src/mocks/services/product.mocks.service.js";
import { DOCUMENT_TYPES } from "../../src/constants/constants.js";

const buildFile = (name) => ({
    originalname: name,
    filename: `test-${Date.now()}-${name}`,
    mimetype: "application/pdf",
    size: 1024
})

describe("Test unitario sobre Order Service", function(){
    before(async function (){
        this.timeout(10000)
        await connectDbSv()
        this.mockOrder = await OrderMockService.generateMockOrders(2);
    })

    describe("Casos exitosos", function(){
        it("Se debe crear una orden", async function(){
            const createdOrder = await OrderService.createOneOrder(this.mockOrder[0])
            this.order = createdOrder
            expect(createdOrder).to.be.an("object").and.to.have.property("_id")
        })
        
        it("Se debe actualizar una orden", async function(){
            const order = await OrderService.updateOneOrder(this.order._id, {priority: "low"})
            expect(order).to.be.an("object").and.to.have.property("_id")
        })

        it("Se deben obtener todas las ordenes", async function(){
            const order = await OrderService.getAllOrders()
            expect(order).to.be.an("array")
        })

        it("Se debe obtener una orden por su ID", async function(){
            const order = await OrderService.getOrderById(this.order._id)
            expect(order).to.be.an("object").and.to.have.property("_id")
        })

        it("Se deben eliminar una orden", async function(){
            const order = await OrderService.deleteOneOrder(this.order._id)
            expect(order).to.be.an("object").and.to.have.property("_id")
        })
    })

    describe("Casos de error", function(){
        before(async function(){
            const mockProduct = await ProductMocksService.generateMockProducts(1)
            const createdProduct = await ProductService.createOneProduct(mockProduct[0])
            this.testProduct = createdProduct

            const mockOrder = await OrderMockService.generateMockOrders(1)
            const createdOrder = await OrderService.createOneOrder(mockOrder[0])
            this.testOrder = createdOrder
        })
        it("[getById | update | delete]: Por orden no encontrada", async function(){
            try{
                await OrderService.getOrderById("6a63d7e4209a546028fd3da5")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create]: Por usuario no indicado", async function(){
            const invalidUser = {...this.mockOrder[0], user: undefined}
            
            try{
                await OrderService.createOneOrder(invalidUser)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create]: Por usuario inexistente", async function(){
            try{
                await UserService.getById("6a600464e8abf4852ef16211")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create | update]: Por orden sin productos", async function(){
            const invalidProducts = {...this.mockOrder[0], items: []}

            try{
                await OrderService.createOneOrder(invalidProducts)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create | update]: Por estado de orden invalido", async function(){
            const invalidStatus = {...this.mockOrder[0], status: "standBy"}

            try{
                await OrderService.createOneOrder(invalidStatus)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create | update]: Por prioridad de envio invalida", async function(){
            const invalidPriority = {...this.mockOrder[0], priority: "very_high"}

            try{
                await OrderService.createOneOrder(invalidPriority)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create | update]: Por producto no indicado", async function(){
            const invalidProduct = {...this.mockOrder[0], items: [{product: undefined, quantity: 1}]}

            try{
                await OrderService.createOneOrder(invalidProduct)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create | update]: Por producto inexistente", async function(){
            try{
                await ProductService.getProdById("6a8790331c8842071d66fa54")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create | update]: Por cantidad de items invalida", async function(){
            const invalidQuantity = {...this.mockOrder[0], items: [{product: this.testProduct._id, quantity: 0}]}

            try{
                await OrderService.createOneOrder(invalidQuantity)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[update]: Por campos faltantes", async function(){
            try{
                await OrderService.updateOneOrder(this.testOrder._id, {})
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[update document]: Por limite de archivos alcanzado", async function(){
            const mockOrder = await OrderMockService.generateMockOrders(1)
            const orderWithDocuments = await OrderService.createOneOrder(mockOrder[0])

            try{
                await OrderService.updateOneOrder(orderWithDocuments._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, buildFile("comprobante-1.pdf"))
                await OrderService.updateOneOrder(orderWithDocuments._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, buildFile("comprobante-2.pdf"))
                await OrderService.updateOneOrder(orderWithDocuments._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, buildFile("comprobante-3.pdf"))
                await OrderService.updateOneOrder(orderWithDocuments._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, buildFile("comprobante-4.pdf"))
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            } finally {
                await OrderService.deleteOneOrder(orderWithDocuments._id)
            }
        })

        it("[update document]: Por archivo duplicado", async function(){
            const mockOrder = await OrderMockService.generateMockOrders(1)
            const orderWithDocument = await OrderService.createOneOrder(mockOrder[0])
            const duplicatedFile = buildFile("comprobante-duplicado.pdf")

            try{
                await OrderService.updateOneOrder(orderWithDocument._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, duplicatedFile)
                await OrderService.updateOneOrder(orderWithDocument._id, {documentType: DOCUMENT_TYPES.PAYMENT_RECEIPT}, {...duplicatedFile, filename: `test-${Date.now()}-duplicado.pdf`})
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("DUPLICATE_KEY")
                expect(err.statusCode).to.equal(409)
            } finally {
                await OrderService.deleteOneOrder(orderWithDocument._id)
            }
        })

        after(async function(){
            
            if(this.testProduct){
                await ProductService.deleteOneProduct(this.testProduct._id)
            }

            if(this.testOrder){
                await OrderService.deleteOneOrder(this.testOrder._id)
            }
        })
    })

    after(async function(){
        await disconnectDbSv()
    })
})
