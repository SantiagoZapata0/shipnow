import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env.js";

const schemas = {
    Health: {
        type: "object",
        properties: {
            service: {
                type: "string",
                example: "ShipNow API",
            },
            environment: {
                type: "string",
                example: "development",
            }
        }
    }
}

const responses = {
    HealthResponse: {
        description: "Response for health check endpoint.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/Health"
                }
            }
        }
    }
}

const swaggerSpecs = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description: "API logistica para gestion de usuarios y pedidos."
        },
        servers: [
            {
                url: `http://localhost:${env.PORT ?? 3000}`,
                description: "Servidor de desarrollo"
            }
        ]
        },
        components: {
            schemas,
            responses,
        },
    apis: [ "./src/docs/**/*.yaml" ]
})

export default swaggerSpecs;