import { expect } from "chai";
import { connectDbSv, disconnectDbSv } from "../../src/utils/test.utils.js";
import UserMockService from "../../src/mocks/services/user.mocks.service.js";
import UserService from "../../src/services/user.service.js";

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

        it("[getById]: Por usuario inexistente (abarca UPDATE y DELETE)", async function(){
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
            const emailAlreadyInUse = { ...this.mockUser[0], email: "Clarence69@yahoo.com"}

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
                await UserService.updateOneUser("6a67d75d209a976028df3da0", {})
                expect.fail("Se esperaba un error, pero no ocurrio")
            } catch(err){
                expect(err.code).to.equal("BAD_REQUEST")
                expect(err.statusCode).to.equal(400)
            }
        })
    })    

    after(async function(){
        await disconnectDbSv()
    })
})