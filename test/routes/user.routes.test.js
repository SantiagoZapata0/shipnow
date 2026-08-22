import { expect } from "chai";
import supertest from "supertest";
import app from "../../src/app.js";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";

const request = supertest(app)

describe("/api/users", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Se espera una request 200 con un array de usuarios", async function(){
        const response = await request.get("/api/users")
        expect(response.body.payload).to.be.an("array")
    })

    it("Se espera una request 400 si el ID tiene formato invalido", async function(){
        const response = await request.get("/api/users/00000000000000000000000")
        expect(response.status).to.equal(400)
        expect(response.body.error).to.equal("INVALID_ID")
    })

    after(async function(){
        await disconnectDbSv()
    })
})