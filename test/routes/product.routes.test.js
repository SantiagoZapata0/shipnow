import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js"
import supertest from "supertest";
import app from "../../src/app.js";
import ProductMocksService from "../../src/mocks/services/product.mocks.service.js";
import ProductService from "../../src/services/product.service.js";

const request = supertest(app);

describe("/api/products", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()
    })

    describe("GET", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const mockProd = await ProductMocksService.generateMockProducts(1)
                const createdProd = await ProductService.createOneProduct(mockProd[0])
                this.testProd = createdProd
            })

            it("Respuesta esperada en caso de obtener todos los productos: [200]", async function(){
                const response = await request.get("/api/products")
                expect(response.body.payload).to.be.an("array")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada en caso de obtener un producto por su ID: [200]", async function(){
                const response = await request.get(`/api/products/${this.testProd._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada en caso de obtener los productos disponibles: [200]", async function(){
                const response = await request.get("/api/products/available")
                expect(response.body.payload).to.be.an("array")
                expect(response.statusCode).to.equal(200)
            })
            
            after(async function(){
                if(this.testProd){
                    await ProductService.deleteOneProduct(this.testProd._id)
                }
            })
        })

        describe("Respuestas erroneas", function(){
            before(async function(){
                const mockProd = await ProductMocksService.generateMockProducts(1)
                const createdProd = await ProductService.createOneProduct(mockProd[0])
                this.testProd = createdProd
            })

            it("Respuesta esperada en caso de ID invalido: [400]", async function(){
                const response = await request.get("/api/products/00000000000000000000000")
                expect(response.body.error).to.equal("INVALID_ID")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada en caso de producto no encontrado: [404]", async function(){
                const response = await request.get("/api/products/6a8a2586c5e7ba89330e5290")
                expect(response.body.error).to.equal("NOT_FOUND")
                expect(response.statusCode).to.equal(404)
                expect(response.body).to.have.property("message")
            })

            after(async function(){
                if(this.testProd){
                    await ProductService.deleteOneProduct(this.testProd._id)
                }
            })
        })
    })

    describe("POST", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockProd = await ProductMocksService.generateMockProducts(1)
                this.testProd = mockProd
            })

            it("Respuesta esperada en caso de que se cree un producto: [201]", async function(){
                const response = await request.post("/api/products").send(this.testProd[0])
                this.product = response.body.payload
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(201)
            })

            after(async function(){
                if(this.product){
                    await ProductService.deleteOneProduct(this.product._id)
                }
            })
        })
    })

    describe("PUT", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockProd = await ProductMocksService.generateMockProducts(1)
                const createdProd = await ProductService.createOneProduct(mockProd[0])
                this.testProd = createdProd
            })

            it("Respuesta esperada en caso de que se actualice un producto: [200]", async function(){
                const response = await request.put(`/api/products/${this.testProd._id}`).send({category: "Tools"})
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.testProd){
                    await ProductService.deleteOneProduct(this.testProd._id)
                }
            })
        })
    })

    describe("DELETE", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockProd = await ProductMocksService.generateMockProducts(1)
                const createdProd = await ProductService.createOneProduct(mockProd[0])
                this.testProd = createdProd
            })

            it("Respuesta esperada en caso de que se elimine un producto: [200]", async function(){
                const response = await request.delete(`/api/products/${this.testProd._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })
        })
    })

    after(async function(){
        await disconnectDbSv()
    })
})