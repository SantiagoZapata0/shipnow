import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";
import supertest from "supertest";
import app from "../../src/app.js";
import UserService from "../../src/services/user.service.js";
import fs from "fs";
import path from "path";

const request = supertest(app)

describe("/api/users", function(){
    before(async function(){
        this.timeout(10000)
        await connectDbSv()    
    })

    describe("GET", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const userMock = await UserMockService.generateMockUsers(1)
                const createdUser = await UserService.createOneUser(userMock[0])
                this.userTest = createdUser
            })
            
            it("Respuesta esperada en caso de encontrar todos los usuarios: [200]", async function(){
                const response = await request.get("/api/users")
                expect(response.body.payload).to.be.an("object")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada en caso de usuario encontrado por ID: [200]", async function(){
                const response = await request.get(`/api/users/${this.userTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            after(async function(){
                if(this.userTest){
                    await UserService.deleteOneUser(this.userTest._id)
                }
            })
        })

        describe("Respuestas erroneas", function(){
            
            it("Respuesta esperada en caso de ruta invalida: [404] (Aplica para todos los metodos)", async function(){
                const response = await request.get("/api/all-users")
                expect(response.status).to.equal(404)
                expect(response.body.error).to.equal("NOT_FOUND")
            })

            it("Respuesta esperada en caso de ID invalido: [400]", async function(){
                const response = await request.get("/api/users/00000000000000000000000")
                expect(response.body.error).to.equal("INVALID_ID")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada en caso de usuario no encontrado: [404]", async function(){
                const response = await request.get("/api/users/6a8a2586c5e7ba89330e5290")
                expect(response.body.error).to.equal("NOT_FOUND")
                expect(response.statusCode).to.equal(404)
                expect(response.body).to.have.property("message")
            })
        })
    })

    describe("POST", function(){
        describe("Respuestas exitosas", function(){

            before(async function(){
                const userMock = await UserMockService.generateMockUsers(1)
                this.userTest = userMock 
            })
        
            it("Respuesta esperada en caso de usuario creado: [201]", async function(){
                const response = await request.post("/api/users").send(this.userTest[0])
                this.user = response.body.payload
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(201)
            })

            after(async function(){
                if(this.user){
                    await UserService.deleteOneUser(this.user._id)
                }
            })
        })

        describe("Respuestas erroneas", function(){
            
            it("Respuesta esperada en caso de campos faltantes: [400] (Aplica para todos los metodos)", async function(){
                const response = await request.post("/api/users").send({first_name: "Santi"})
                expect(response.body.error).to.equal("BAD_REQUEST")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })
        })
    })

    describe("PUT", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockUser = await UserMockService.generateMockUsers(1)
                const createdUser = await UserService.createOneUser(mockUser[0])
                this.userTest = createdUser
                this.documentNames = []
            })

            it("Respuesta esperada en caso de actualizar un usuario: [200]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`).send({first_name: "Mauricio"})
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada al adjuntar un documento valido: [200]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`)
                .field("documentType", "id_document")
                .attach("documents", Buffer.from("documento de identidad"), {filename: "identidad.pdf", contentType: "application/pdf"})

                this.documentNames.push(response.body.payload.documents[0].generatedName)
                expect(response.body.payload.documents).to.be.an("array").and.to.have.length(1)
                expect(response.body.payload.uploadedDocumentType).to.equal("id_document")
                expect(response.statusCode).to.equal(200)
            })

            it("Respuesta esperada al adjuntar una licencia de repartidor valida: [200]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`)
                .field("role", "courier")
                .field("documentType", "courier_license")
                .attach("documents", Buffer.from("licencia de repartidor"), {filename: "licencia.pdf", contentType: "application/pdf"})

                this.documentNames.push(response.body.payload.documents[1].generatedName)
                expect(response.body.payload.documents).to.be.an("array").and.to.have.length(2)
                expect(response.body.payload.uploadedDocumentType).to.equal("courier_license")
                expect(response.statusCode).to.equal(200)
            })

            after(async function (){
                if(this.documentNames){
                    for(const documentName of this.documentNames){
                        if(!documentName) continue
                        const documentPath = path.join(process.cwd(), "src", "uploads", "documents", documentName)
                        if(fs.existsSync(documentPath)) fs.unlinkSync(documentPath)
                    }
                }

                if(this.userTest){
                    await UserService.deleteOneUser(this.userTest._id)
                }
            })
        })

        describe("Respuestas erroneas de archivos", function(){
            before(async function(){
                const mockUser = await UserMockService.generateMockUsers(1)
                this.userTest = await UserService.createOneUser(mockUser[0])
            })

            it("Respuesta esperada ante un tipo de archivo no permitido: [400]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`)
                .field("documentType", "id_document")
                .attach("documents", Buffer.from("archivo invalido"), {filename: "documento.txt", contentType: "text/plain"})

                expect(response.body.error).to.equal("INVALID_FILE_TYPE")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada ante un campo de archivo incorrecto: [400]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`)
                .field("documentType", "id_document")
                .attach("document", Buffer.from("archivo"), {filename: "identidad.pdf", contentType: "application/pdf"})

                expect(response.body.error).to.equal("BAD_REQUEST")
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property("message")
            })

            it("Respuesta esperada ante un archivo que supera el limite permitido: [413]", async function(){
                const response = await request.put(`/api/users/${this.userTest._id}`)
                .field("documentType", "id_document")
                .attach("documents", Buffer.alloc(1024 * 1024 * 5 + 1), {filename: "pesado.pdf", contentType: "application/pdf"})

                expect(response.body.error).to.equal("FILE_TOO_LARGE")
                expect(response.statusCode).to.equal(413)
                expect(response.body).to.have.property("message")
            })

            after(async function(){
                if(this.userTest){
                    await UserService.deleteOneUser(this.userTest._id)
                }
            })
        })
    })

    describe("DELETE", function(){
        describe("Respuestas exitosas", function(){
            before(async function(){
                const mockUser = await UserMockService.generateMockUsers(1)
                const createdUser = await UserService.createOneUser(mockUser[0])
                this.userTest = createdUser
            })

            it("Respuesta esperada en caso de eliminar un usuario: [200]", async function(){
                const response = await request.delete(`/api/users/${this.userTest._id}`)
                expect(response.body.payload).to.be.an("object").and.to.have.property("_id")
                expect(response.statusCode).to.equal(200)
            })
        })
    })

    after(async function(){
        await disconnectDbSv()
    })
})
