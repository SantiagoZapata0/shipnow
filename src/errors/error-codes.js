export const ERROR_CODES = Object.freeze({
    USER_NOT_FOUND:{
        statusCode: 404,
        message: "User not found."
    },
    INVALID_ID:{
        statusCode: 400,
        message: "Invalid user ID."
    },
    DUPLICATE_KEY:{
        statusCode: 409,
        message: "Key already in use."
    },
    INTERNAL_SERVER_ERROR:{
        statusCode: 500,
        message: "Internal server error."
    },
    BAD_REQUEST:{
        statusCode: 400,
        message: "Bad request"
    },
    ROUTE_NOT_FOUND:{
        statusCode: 404,
        message: "Route not found."
    }
})