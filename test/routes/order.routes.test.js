import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import app from "../../src/app.js";
import OrderMockService from "../../src/mocks/services/order.mocks.service.js";
import OrderService from "../../src/services/order.service.js";
import supertest from "supertest";

const request = supertest(app)

describe("/api/orders", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    describe("GET", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const mockOrder = await OrderMockService.generateMockOrders(1)
                const createdOrder = await OrderService.createOneOrder(mockOrder[0])
                this.orderTest = createdOrder
            })

            it("Respuesta esperada en caso de obtener todas las ordenes: [200]", async function(){
                const response = await request.get("/api/orders")
                expect(response.body.payload).to.be.an("array")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada en caso de obtener una orden por su ID: [200]", async function(){
                const response = await request.get(`/api/orders/${this.orderTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.orderTest){
                    await OrderService.deleteOneOrder(this.orderTest._id)
                }
            })
        })

        describe("Respuestas erroneas", function(){

            it("Respuesta esperada en caso de ID invalido: [400]", async function(){
                const response = await request.get("/api/orders/00000000000000000000000")
                expect(response.body.error).to.equal("INVALID_ID")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada en caso de orden no encontrada: [404]", async function(){
                const response = await request.get("/api/orders/6a8a2586c5e7ba89330e5290")
                expect(response.body.error).to.equal("NOT_FOUND")
                expect(response.statusCode).to.equal(404)
                expect(response.body).to.have.property("message")
            })
        })
    })

    describe("POST", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const mockOrder = await OrderMockService.generateMockOrders(1)
                this.orderTest = mockOrder
            })

            it("Respuesta esperada en caso de orden creada: [201]", async function(){
                const response = await request.post("/api/orders").send(this.orderTest[0])
                this.order = response.body.payload
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(201)
            })

            after(async function(){
                if(this.order){
                    await OrderService.deleteOneOrder(this.order._id)
                }
            })
        })
    })

    describe("PUT", function(){
        describe("Respuestas exitosas", function(){
            
            before(async function(){
                const mockOrder = await OrderMockService.generateMockOrders(1)
                const createdOrder = await OrderService.createOneOrder(mockOrder[0])
                this.orderTest = createdOrder
            })

            it("Respuesta esperada en caso de actualizar una orden: [200]", async function(){
                const response = await request.put(`/api/orders/${this.orderTest._id}`).send({priority: "low"})
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.orderTest){
                    await OrderService.deleteOneOrder(this.orderTest._id)
                }
            })
        })
    })

    describe("DELETE", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockOrder = await OrderMockService.generateMockOrders(1)
                const createdOrder = await OrderService.createOneOrder(mockOrder[0])
                this.orderTest = createdOrder
            })

            it("Respuesta esperada en caso de eliminar una orden: [200]", async function(){
                const response = await request.delete(`/api/orders/${this.orderTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })
        })
    })

    after(async function(){
        await disconnectDbSv()
    })
})