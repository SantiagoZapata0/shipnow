class CustomError extends Error{
    constructor(code, customMessage){
        super(customMessage)

        this.code = code;
        this.statusCode = code;
        this.message = customMessage

        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError;