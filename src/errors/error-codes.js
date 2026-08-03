export const ERROR_CODES = Object.freeze({
    NOT_FOUND:{
        statusCode: 404,
        message: "Resource not found."
    },
    INVALID_ID:{
        statusCode: 400,
        message: "Invalid resource ID."
    },
    DUPLICATE_KEY:{
        statusCode: 409,
        message: "Key already in use."
    },
    BAD_REQUEST:{
        statusCode: 400,
        message: "Malformed request."
    },
    VALIDATION_ERROR:{
        statusCode: 400,
        message: "Data contains invalid formats or violates validations rules."
    },
    UNAUTHORIZED:{
        statusCode: 401,
        message: "Unauthorized."
    },
    FORBIDDEN:{
        statusCode: 403,
        message: "Forbidden."
    },
    CONFLICT:{
        statusCode: 409,
        message: "Conflict."
    },
    DATABASE_CONNECTION_ERROR:{
        statusCode: 503,
        message: "Database connection error."
    },
    INVALID_MOCK_COUNT:{
        statusCode: 400,
        message: "Invalid mock count."
    },
    MOCK_DATA_NOT_FOUND:{
        statusCode: 404,
        message: "Mock data not found."
    },
    INTERNAL_SERVER_ERROR:{
        statusCode: 500,
        message: "Internal server error."
    }
})