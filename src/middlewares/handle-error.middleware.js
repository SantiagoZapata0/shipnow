import CustomError from "../errors/custom-error.js";
import logger from "../config/logger.js";

export function errorHandler(err, req, res, next){
    const isCustomError = err instanceof CustomError;
    const customError = isCustomError ? err : customErrorMapper(err)

    const { statusCode, code, message } = customError;

    if(isCustomError){
        logger.warn(`Custom error: ${err.message}`)
    } else{
        logger.error(`Unexpected error: ${err.message}`)
    }

    res.status(statusCode).json({status: "Error", error: code, message: message})
}

export function notFoundHandler(req, res, next){
    next(new CustomError("NOT_FOUND", "Ruta no encontrada."));
}

const connectionMongoDbErrors = ["MongooseServerSelectionError","MongoServerSelectionError","MongoNetworkError","MongoTimeoutError"];

function customErrorMapper(err){

    if(err.name === "CastError"){
        return new CustomError("INVALID_ID");
    }
    if(err.code === 11000){
        return new CustomError("DUPLICATE_KEY");
    }
    if(err.name === "ValidationError"){
        return new CustomError("VALIDATION_ERROR");
    }

    if (connectionMongoDbErrors.includes(err.name) || err.code === "ECONNREFUSED" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT"){
        return new CustomError("DATABASE_CONNECTION_ERROR");
    }

    return new CustomError("INTERNAL_SERVER_ERROR");
}