import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import __dirname from "../utils/utils.js";
import path from "node:path";
import { env } from "./env.js"

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2, 
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red bold",
        error: "red",
        warn: "yellow", 
        info: "green",
        http: "magenta",
        debug: "blue"
    }
}

winston.addColors(customLevels.colors)

const logDir = path.join(__dirname, "../../logs");

const consoleFormat = winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.timestamp({format: "YYYY-MM-DD HH-mm-ss:ms"}),
    winston.format.printf(({timestamp, level, message, stack}) => {
        return `${timestamp} [${level}]: ${stack || message}`
    })
)

const fileFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH-mm-ss:ms"}),
    winston.format.json()
)

const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({format: consoleFormat}),
        new DailyRotateFile({
            dirname: logDir,
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            format: fileFormat,
            maxFiles: "14d"
        }), 
        new winston.transports.File({filename: "logs/error.log", level: "error", format: fileFormat})
    ]
})

export default logger;