import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";

describe("Test unitario sobre Mocks de usuarios", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Se debe generar un mock de usuario", async function(){
        const delivery = await UserMockService.generateMockUsers(1)
        expect(delivery).to.be.an("array").and.to.have.length.greaterThan(0)
    })
    
    it("[error]: Por numero de usuarios invalido", async function(){
        try{
            await UserMockService.generateMockUsers(0)
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