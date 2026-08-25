import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import supertest from "supertest";
import app from "../../src/app.js";

const request = supertest(app)

describe("/api/docs", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada en caso de exito: [200]", async function(){
        const response = await request.get("/api/docs")
        expect(response.status).to.equal(301)
    })

    it("Respuesta esperada en caso de ruta no encontrada: [404]", async function(){
        const response = await request.get("/api/documentation")
        expect(response.statusCode).to.equal(404)
        expect(response.body.error).to.equal("NOT_FOUND")
    })

    after(async function(){
        await disconnectDbSv()
    })
})