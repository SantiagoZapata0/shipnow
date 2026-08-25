import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import OrderMockService from "../../src/mocks/services/order.mocks.service.js";

describe("Test unitario sobre Mocks de ordenes", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Se debe generar un mock de orden", async function(){
        const delivery = await OrderMockService.generateMockOrders(1)
        expect(delivery).to.be.an("array").and.to.have.length.greaterThan(0)
    })
    
    it("[error]: Por numero de ordenes invalido", async function(){
        try{
            await OrderMockService.generateMockOrders(0)
            expect.fail("Se esperaba un error, pero no ocurrio")
        } catch(err){
            expect(err.code).to.equal("INVALID_MOCK_COUNT")
            expect(err.statusCode).to.equal(400)
        }
    })

    after(async function(){
        await disconnectDbSv()
    })
})