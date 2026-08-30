import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";
import UserService from "../../src/services/user.service.js";
import { DOCUMENT_TYPES, USER_ROLES } from "../../src/constants/constants.js";
import fs from "fs";
import path from "path";

const buildFile = (name) => {
    const filename = `test-${Date.now()}-${name}`

    return {
        originalname: name,
        filename,
        path: path.join(process.cwd(), "src", "uploads", "documents", filename),
        mimetype: "application/pdf",
        size: 1024
    }
}

const createTempFile = (file) => {
    fs.mkdirSync(path.dirname(file.path), { recursive: true })
    fs.writeFileSync(file.path, "archivo de test")
    return file
}

describe("Test unitario de User Service", function(){
    
    before(async function(){
        this.timeout(10000);
        await connectDbSv();
        this.mockUser = await UserMockService.generateMockUsers(2);
    })

    describe("Casos exitosos", function(){
        it("Se debe crear un usuario", async function(){
            const createdUser = await UserService.createOneUser(this.mockUser[0]);
            this.user = createdUser;
            expect(createdUser).to.be.an("object").and.to.have.property("_id");
        })

        it("Se debe actualizar un usuario", async function(){
            const user = await UserService.updateOneUser(this.user._id, {first_name: this.mockUser[1].first_name});
            expect(user).to.be.an("object").and.to.have.property("_id");
         })

        it("Se deben obtener todos los usuarios", async function(){
            const user = await UserService.getAll();
            expect(user).to.be.an("array");
        })

        it("Se debe obtener un usuario por ID", async function(){
            const user = await UserService.getById(this.user._id);
            expect(user).to.be.an("object").and.to.have.property("_id");
        })

        it("Se debe obtener usuarios por su rol", async function(){
            const user = await UserService.getByRole("user");
            expect(user).to.be.an("array");
        })

        it("Se debe obtener usuarios por su email", async function(){
            const user = await UserService.getByEmail(this.user.email);
            expect(user).to.be.an("object").and.to.have.property("password");
        })

        it("Se debe eliminar un usuario", async function(){
            const user = await UserService.deleteOneUser(this.user._id);
            expect(user).to.be.an("object").and.to.have.property("_id");
        })
    })

    describe("Casos de error", function(){
        before(async function(){
            const mockUser = await UserMockService.generateMockUsers(1)
            const createdUser = await UserService.createOneUser(mockUser[0])
            this.testUser = createdUser
        })

        it("[getByRole]: Por insertar un rol invalido", async function(){
            try{
                await UserService.getByRole("organizer")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("VALIDATION_ERROR")
                expect(err.statusCode).to.equal(422)
            }
        })

        it("[getByRole]: Por no insertar un rol", async function(){
            try{
                await UserService.getByRole(undefined)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[getByEmail]: Por email inexistente", async function(){
            try{
                await UserService.getByEmail("example@yahoo,net")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[getById | update | delete]: Por usuario inexistente", async function(){
            try{
                await UserService.getById("6a67d75d099a912328df3da0")
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("NOT_FOUND")
                expect(err.statusCode).to.equal(404)
            }
        })

        it("[create]: Por campos faltantes ", async function(){
            const invalidUser = {...this.mockUser[0], first_name: undefined}

            try{
                await UserService.createOneUser(invalidUser)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        });

        it("[create]: Por contraseña menor a 6 caracteres", async function(){
            const passwordShortUser = { ...this.mockUser[0], password: "123ab"}

            try{
                await UserService.createOneUser(passwordShortUser)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[create]: Por email ya registrado", async function(){
            const emailAlreadyInUse = { ...this.mockUser[0], email: this.testUser.email}

            try{
                await UserService.createOneUser(emailAlreadyInUse)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("DUPLICATE_KEY")
                expect(err.statusCode).to.equal(409)
            }
        })

        it("[update]: Por campos faltantes", async function(){
            try{
                await UserService.updateOneUser(this.testUser._id, {})
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[update document]: Por tipo de documento faltante o invalido", async function(){
            const file = createTempFile(buildFile("documento-sin-tipo.pdf"))

            try{
                await UserService.updateOneUser(this.testUser._id, {first_name: "Santiago"}, file)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("INVALID_DOCUMENT_TYPE")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[update document]: Por licencia cargada en usuario que no es repartidor", async function(){
            const file = createTempFile(buildFile("licencia-no-courier.pdf"))

            try{
                await UserService.updateOneUser(this.testUser._id, {role: USER_ROLES.USER, documentType: DOCUMENT_TYPES.COURIER_LICENSE}, file)
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("INVALID_DOCUMENT_TYPE")
                expect(err.statusCode).to.equal(400)
            }
        })

        it("[update document]: Por limite de archivos alcanzado", async function(){
            const mockUser = await UserMockService.generateMockUsers(1)
            const userWithDocuments = await UserService.createOneUser(mockUser[0])

            try{
                await UserService.updateOneUser(userWithDocuments._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, buildFile("documento-1.pdf"))
                await UserService.updateOneUser(userWithDocuments._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, buildFile("documento-2.pdf"))
                await UserService.updateOneUser(userWithDocuments._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, buildFile("documento-3.pdf"))
                await UserService.updateOneUser(userWithDocuments._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, buildFile("documento-4.pdf"))
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            } finally {
                await UserService.deleteOneUser(userWithDocuments._id)
            }
        })

        it("[update document]: Por archivo duplicado", async function(){
            const mockUser = await UserMockService.generateMockUsers(1)
            const userWithDocument = await UserService.createOneUser(mockUser[0])
            const duplicatedFile = buildFile("documento-duplicado.pdf")

            try{
                await UserService.updateOneUser(userWithDocument._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, duplicatedFile)
                await UserService.updateOneUser(userWithDocument._id, {documentType: DOCUMENT_TYPES.ID_DOCUMENT}, createTempFile({...duplicatedFile, filename: `test-${Date.now()}-duplicado.pdf`}))
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("DUPLICATE_KEY")
                expect(err.statusCode).to.equal(409)
            } finally {
                await UserService.deleteOneUser(userWithDocument._id)
            }
        })

        after(async function(){
            if(this.testUser){
                await UserService.deleteOneUser(this.testUser._id)
            }
        })
    })    

    after(async function(){
        await disconnectDbSv()
    })
})
