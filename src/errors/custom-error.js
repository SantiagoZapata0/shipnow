import { ERROR_CODES } from "./error-codes.js";

class CustomError extends Error{
    constructor(code, customMessage){

        const errorDefinition = ERROR_CODES[code] ?? ERROR_CODES.INTERNAL_SERVER_ERROR;
        const resolvedCode = ERROR_CODES[code] ? code : "INTERNAL_SERVER_ERROR";

        super(customMessage ?? errorDefinition.message)

        this.code = resolvedCode;
        this.statusCode = errorDefinition.statusCode;
        this.message = customMessage ?? errorDefinition.message

        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError;