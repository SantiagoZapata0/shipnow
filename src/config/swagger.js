import swaggerJSDoc from "swagger-jsdoc";
import { USER_ROLES } from "../constants/constants.js"
import { env } from "./env.js";

const schemas = {
    HealthStatus: {
        type: "object",
        properties: {
            status: { type: "string", example: "OK" },
            payload: { type: "string", example: "Server ON." }
        }
    },
    UserStatus: {
        type: "object",
        properties: {
            id: {type: "string", example: "6a623904e8abf4852ef163a5"},
            first_name: {type: "string", example: "John"},
            last_name: {type: "string", example: "Doe"},
            email: {type: "string", example: "johndoe@hotmail.com"},
            role: {type: "string", enum: Object.values(USER_ROLES), example: "user"}
        }
    }
}

const responses = {
    HealthResponse: {
        description: "Response for health check endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/HealthStatus"
                }
            }
        }
    },
    UserResponse: {
        description: "Response method get users",
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/UserStatus"
                    }
                }
            }
        }
    }
}

const parameters = {
    
}

const swaggerSpecs = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description: "API para la gestion de usuarios y pedidos de una logistica."
        },
        servers: [
            {
                url: `http://localhost:${env.PORT ?? 3000}`,
                description: "Servidor de desarrollo"
            }
        ],
        tags: [
            {name: "Health", description: "Returns the health status of our server"},
            {name: "Users", description: "All list of users"},
        ],
        components: {
            schemas, responses, parameters
        }
    },
    apis: ["./src/docs/**/*.yaml"]
})

export default swaggerSpecs;