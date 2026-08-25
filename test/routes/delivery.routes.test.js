import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import supertest from "supertest";
import app from "../../src/app.js";
import DeliveryMockService from "../../src/mocks/services/delivery.mocks.service.js";
import DeliveryService from "../../src/services/delivery.service.js";

const request = supertest(app)

describe("/api/deliveries", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    describe("GET", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const mockDelivery = await DeliveryMockService.generateMockDeliveries(1)
                const createdDelivery = await DeliveryService.createOneDelivery(mockDelivery[0])
                this.deliveryTest = createdDelivery
            })

            it("Respuesta esperada en caso de obtener todas las entregas: [200]", async function(){
                const response = await request.get("/api/deliveries")
                expect(response.body.payload).to.be.an("array")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada en caso de obtener una entrega por su ID: [200]", async function(){
                const response = await request.get(`/api/deliveries/${this.deliveryTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.deliveryTest){
                    await DeliveryService.deleteOneDelivery(this.deliveryTest._id)
                }
            })
        })

        describe("Respuestas erroneas", function(){

            it("Respuesta esperada en caso de ID invalido: [400]", async function(){
                const response = await request.get("/api/deliveries/00000000000000000000000")
                expect(response.body.error).to.equal("INVALID_ID")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada en caso de entrega no encontrada: [404]", async function(){
                const response = await request.get("/api/deliveries/6a8a2586c5e7ba89330e5290")
                expect(response.body.error).to.equal("NOT_FOUND")
                expect(response.statusCode).to.equal(404)
                expect(response.body).to.have.property("message")
            })
        })
    })

    describe("POST", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const mockDelivery = await DeliveryMockService.generateMockDeliveries(1)
                this.deliveryTest = mockDelivery
            })

            it("Respuesta esperada en caso de entrega creada: [201]", async function(){
                const response = await request.post("/api/deliveries").send(this.deliveryTest[0])
                this.delivery = response.body.payload
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(201)
            })

            after(async function(){
                if(this.delivery){
                    await DeliveryService.deleteOneDelivery(this.delivery._id)
                }
            })
        })
    })

    describe("PUT", function(){
        describe("Respuestas exitosas", function(){
            
            before(async function(){
                const mockDelivery = await DeliveryMockService.generateMockDeliveries(1)
                const createdDelivery = await DeliveryService.createOneDelivery(mockDelivery[0])
                this.deliveryTest = createdDelivery
            })

            it("Respuesta esperada en caso de actualizar una entrega: [200]", async function(){
                const response = await request.put(`/api/deliveries/${this.deliveryTest._id}`).send({status: "delivered"})
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.deliveryTest){
                    await DeliveryService.deleteOneDelivery(this.deliveryTest._id)
                }
            })
        })
    })

    describe("DELETE", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockDelivery = await DeliveryMockService.generateMockDeliveries(1)
                const createdDelivery = await DeliveryService.createOneDelivery(mockDelivery[0])
                this.deliveryTest = createdDelivery
            })

            it("Respuesta esperada en caso de eliminar una entrega: [200]", async function(){
                const response = await request.delete(`/api/deliveries/${this.deliveryTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })
        })
    })

    after(async function(){
        await disconnectDbSv()
    })
})