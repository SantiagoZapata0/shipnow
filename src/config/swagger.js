import swaggerJSDoc from "swagger-jsdoc";
import { USER_ROLES } from "../constants/constants.js"
import { env } from "./env.js";

//* Components imports

import { GoodResponses, BadResponses } from "../docs/components/responses.js";
import { RequestBodies } from "../docs/components/requestBodies.js";
import { BadRqSchemas, GoodRqSchemas } from "../docs/components/schemas.js";
import Parameters from "../docs/components/parameters.js";

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
            {name: "Logger", description: "Endpoints for managing logger"},
            {name: "Users", description: "Endpoints for managing users"},
            {name: "Products", description: "Endpoints for managing products"},
            {name: "Orders", description: "Endpoints for managing orders"},
            {name: "Deliveries", description: "Endpoints for managing deliveries"},
            {name: "Mocks", description: "Endpoints for managing mocks"}
        ],
        components: {
            GoodRqSchemas, BadRqSchemas, GoodResponses, BadResponses, Parameters, RequestBodies
        }
    },
    apis: ["./src/docs/**/*.yaml"]
})

export default swaggerSpecs;