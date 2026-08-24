import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import DeliveryService from "../../src/services/delivery.service.js";
import DeliveryMockService from "../../src/mocks/services/delivery.mocks.service.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";
import UserService from "../../src/services/user.service.js";

describe("Test unitario sobre Delivery Service", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()

        this.mockDelivery = await DeliveryMockService.generateMockDeliveries(2)
    })

    describe("Casos exitosos", function(){
        it("Se debe crear una entrega", async function(){
            const createdDelivery = await DeliveryService.createOneDelivery(this.mockDelivery[0])
            this.delivery = createdDelivery
            expect(createdDelivery).to.be.an("object").and.to.have.property("_id")
        })

        it("Se debe actualizar una entrega", async function(){
            const delivery = await DeliveryService.updateOneDelivery(this.delivery._id, {address: "62520 Eula View Suite 374"})
            expect(delivery).to.be.an("object").and.to.have.property("address")
        })

        it("Se deben obtener todas las entregas", async function(){
            const deliveries = await DeliveryService.getAllDeliveries()
            expect(deliveries).to.be.an("array").and.to.have.length.greaterThan(0)
        })

        it("Se debe obtener una entrega por ID", async function(){
            const delivery = await DeliveryService.getDeliveryById(this.delivery._id)
            expect(delivery).to.be.an("object").and.to.have.property("_id")
        })

        it("Se debe eliminar una entrega", async function(){
            const delivery = await DeliveryService.deleteOneDelivery(this.delivery._id)
            expect(delivery).to.be.an("object").and.to.have.property("_id")
        })
    })

    describe("Casos de error", function(){
        before(async function(){
           
            const mockUser = await UserMockService.generateMockUsers(1);
            const createdUser = await UserService.createOneUser({...mockUser[0], role: "user"});
            this.userTest = createdUser._id;

            const mockDelivery = await DeliveryMockService.generateMockDeliveries(1);
            const createdDelivery = await DeliveryService.createOneDelivery(mockDelivery[0]);
            this.deliveryTest = createdDelivery;
        })

        it("[getById | create | update | delete]: Por entrega no encontrada", async function(){
            try{
                await DeliveryService.getDeliveryById("6a67d8a1209a976028df3a99")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create]: Por no tener orden ni fecha estimada indicadas", async function(){
            const invalidDelivery = {...this.mockDelivery[0], order: undefined}

            try{
                await DeliveryService.createOneDelivery(invalidDelivery)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create | update]: Por usuario sin rol de repartidor", async function(){
            const invalidCourier = {...this.mockDelivery[0], courier: this.userTest._id}

            try{
                await DeliveryService.createOneDelivery(invalidCourier)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create | update]: Por estado de entrega invalido", async function(){
            const invalidStatus = {...this.mockDelivery[0], status: "finished"}

            try{
                await DeliveryService.createOneDelivery(invalidStatus)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create | update]: Por fecha estimada de entrega invalida", async function(){
            const invalidDate = {...this.mockDelivery[0], estimatedFrom: "24/05/25", estimatedTo: "24/05/25"}

            try{
                await DeliveryService.createOneDelivery(invalidDate)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[create | update]: Por fecha de finalizacion anterior a fecha de inicio", async function(){
            const invalidDate = {...this.mockDelivery[0], estimatedFrom: "2026-07-28T19:46:13.372+00:00", estimatedTo: "2026-07-27T19:46:13.372+00:00" }

            try{
                await DeliveryService.createOneDelivery(invalidDate)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[update]: Por campos faltantes", async function(){
            try{
                await DeliveryService.updateOneDelivery(this.deliveryTest._id, {})
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