import winston from "winston";
import { env } from "./env.js"

const customLevels = {
    levels: {
        debug: 0,
        info: 1,
        warning: 2, 
        error: 3,
        fatal: 4
    },
    colors: {
        debug: "blue",
        info: "green",
        warning: "yellow",
        error: "red",
        fatal: "red bold"
    }
}

winston.addColors(customLevels.colors);
winston.add(winston.transports.Console, customLevels.levels);

const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(winston.format.timestamp(
        winston.format.colorize({all: true}),
        winston.format.timestamp(),
        winston.format.json()
    )),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({filename: "logs/error.log", level: "error"})
    ]
})

export default logger;

// debug -> Necesidad de entender un problema. (No produccion)
// http -> Registrar una request HTTP. (No produccion)
// info -> Cosas importantes que suceden --> Nutricion para monitoreo --> Happy Path
// warning -> Error Path --> Problemas que no rompen la app pero que requieren atencion.
// error -> Errores que no conocemos. ATENCION! Bug o problema para mejorar.
// fatal -> Errores que rompen la app. ATENCION INMEDIATA! WAR ROOM
// --> REALIZAR ROLLBACK -> Volver para atras la ultima version -> Y BUG-FIX

// --- Flujo de deploy
// -> Pruebas unitarias (clase 6) (Mucha IA para generar test)
// -> Pruebas manuales (Happy path)
// Despliegue a staging (ambiente copiado de prod. Para asegurarse de que todo funcione)
// -> Despligue a produccion 
// -> Monitoreo manual (revisar logs y metricas)
// --> ROLLBACK si hay problemas