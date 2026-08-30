import CustomError from "../errors/custom-error.js";
import logger from "../config/logger.js";
import multer from "multer";
import fs from "fs";

export function errorHandler(err, req, res, next){
    const isCustomError = err instanceof CustomError;
    const customError = isCustomError ? err : customErrorMapper(err)

    const { statusCode, code, message } = customError;

    if(isCustomError){
        logger.warn(`Custom error: ${err.message}`)
    } else{
        logger.error(`Unexpected error: ${err.message}`)
    }

    if(req.file){
            fs.unlinkSync(req.file.path)
        }

    res.status(statusCode).json({status: "Error", error: code, message: message})
}

export function notFoundHandler(req, res, next){
    next(new CustomError("NOT_FOUND", "Ruta no encontrada."));
}

const connectionMongoDbErrors = ["MongooseServerSelectionError","MongoServerSelectionError","MongoNetworkError","MongoTimeoutError"];

function customErrorMapper(err){

    if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
            return new CustomError("FILE_TOO_LARGE", "El archivo supera el tamaño maximo permitido")
        }

        if(err.code === "LIMIT_UNEXPECTED_FILE"){
            return new CustomError("BAD_REQUEST", "El campo del archivo no coincide con lo esperado")
        }
        
        return new CustomError("BAD_REQUEST", "Error al procesar el archivo")
    }

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