import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import supertest from "supertest";
import app from "../../src/app.js";
import DeliveryService from "../../src/services/delivery.service.js";
import OrderService from "../../src/services/order.service.js";
import UserService from "../../src/services/user.service.js";
import ProductService from "../../src/services/product.service.js";

const request = supertest(app)

describe("/api/mocks/deliveries", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada en caso de Mock generado: [200]", async function(){
        const response = await request.get("/api/mocks/deliveries?count=1")
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(200)
    })

    it("Respuesta esperada en caso de Mock generado y guardado en base de datos: [201]", async function(){
        const response = await request.post("/api/mocks/deliveries").send({count: 1, saveToDatabase: true})
        this.mockTest = response.body.payload[0]
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(201)
    })

    it("[error]: Respuesta esperada en caso de cantidad de mocks invalida", async function(){
        const response = await request.post("/api/mocks/deliveries").send({count: 0, saveToDatabase: true})
        expect(response.body.error).to.equal("INVALID_MOCK_COUNT")
        expect(response.statusCode).to.equal(400)
        expect(response.body).to.have.property("message")
    })

    after(async function(){
        if(this.mockTest){
            await DeliveryService.deleteOneDelivery(this.mockTest._id)
        }
        await disconnectDbSv()
    })
})

describe("/api/mocks/orders", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada en caso de Mock generado: [200]", async function(){
        const response = await request.get("/api/mocks/orders?count=1")
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(200)
    })

    it("Respuesta esperada en caso de Mock generado y guardado en base de datos: [201]", async function(){
        const response = await request.post("/api/mocks/orders").send({count: 1, saveToDatabase: true})
        this.mockTest = response.body.payload[0]
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(201)
    })

    it("[error]: Respuesta esperada en caso de cantidad de mocks invalida", async function(){
        const response = await request.post("/api/mocks/orders").send({count: 0, saveToDatabase: true})
        expect(response.body.error).to.equal("INVALID_MOCK_COUNT")
        expect(response.statusCode).to.equal(400)
        expect(response.body).to.have.property("message")
    })

    after(async function(){
        if(this.mockTest){
            await OrderService.deleteOneOrder(this.mockTest._id)
        }
        await disconnectDbSv()
    })
})

describe("/api/mocks/users", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada en caso de Mock generado: [200]", async function(){
        const response = await request.get("/api/mocks/users?count=1")
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(200)
    })

    it("Respuesta esperada en caso de Mock generado y guardado en base de datos: [201]", async function(){
        const response = await request.post("/api/mocks/users").send({count: 1, saveToDatabase: true})
        this.mockTest = response.body.payload[0]
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(201)
    })

    it("[error]: Respuesta esperada en caso de cantidad de mocks invalida", async function(){
        const response = await request.post("/api/mocks/users").send({count: 0, saveToDatabase: true})
        expect(response.body.error).to.equal("INVALID_MOCK_COUNT")
        expect(response.statusCode).to.equal(400)
        expect(response.body).to.have.property("message")
    })

    after(async function(){
        if(this.mockTest){
            await UserService.deleteOneUser(this.mockTest._id)
        }
        await disconnectDbSv()
    })
})

describe("/api/mocks/products", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    it("Respuesta esperada en caso de Mock generado: [200]", async function(){
        const response = await request.get("/api/mocks/products?count=1")
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(200)
    })

    it("Respuesta esperada en caso de Mock generado y guardado en base de datos: [201]", async function(){
        const response = await request.post("/api/mocks/products").send({count: 1, saveToDatabase: true})
        this.mockTest = response.body.payload[0]
        expect(response.body.payload).to.be.an("array").and.to.have.length.greaterThan(0)
        expect(response.statusCode).to.equal(201)
    })

    it("[error]: Respuesta esperada en caso de cantidad de mocks invalida", async function(){
        const response = await request.post("/api/mocks/products").send({count: 0, saveToDatabase: true})
        expect(response.body.error).to.equal("INVALID_MOCK_COUNT")
        expect(response.statusCode).to.equal(400)
        expect(response.body).to.have.property("message")
    })

    after(async function(){
        if(this.mockTest){
            await ProductService.deleteOneProduct(this.mockTest._id)
        }
        await disconnectDbSv()
    })
})