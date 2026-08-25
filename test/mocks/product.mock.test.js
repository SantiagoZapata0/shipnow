import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import ProductMocksService from "../../src/mocks/services/product.mocks.service.js";

describe("Test unitario sobre Mocks de productos", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Se debe generar un mock de producto", async function(){
        const delivery = await ProductMocksService.generateMockProducts(1)
        expect(delivery).to.be.an("array").and.to.have.length.greaterThan(0)
    })
    
    it("[error]: Por numero de productos invalido", async function(){
        try{
            await ProductMocksService.generateMockProducts(0)
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