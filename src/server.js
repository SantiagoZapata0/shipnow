import app from "./app.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";

app.listen(env.PORT, () => {
    logger.info(`Server ON. Puerto: ${env.PORT}`)
    connectDB()
    .then(() => logger.info("Base de datos conectada a MongoDB Atlas"))
    .catch((err) => logger.fatal(`Error al conectar la base de datos. Error: ${err.message}`))
})
