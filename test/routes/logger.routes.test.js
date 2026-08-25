import { expect } from "chai";
import supertest from "supertest";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import app from "../../src/app.js";

const request = supertest(app)

describe("/logger-test", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada: [200]", async function(){
        const response = await request.get("/logger-test")
        expect(response.statusCode).to.equal(200)
        expect(response.body.status).to.equal("OK")
    })

    it("Respuesta esperada en caso de ruta no encontrada: [404]", async function(){
        const response = await request.get("/api/logger-test")
        expect(response.statusCode).to.equal(404)
        expect(response.body.error).to.equal("NOT_FOUND")
    })

    after(async function(){
        await disconnectDbSv()
    })
})