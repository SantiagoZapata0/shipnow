import app from "./app.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
    console.log(`Server ON. Puerto: ${env.PORT}`)
    connectDB()
    .then(() => console.log("Base de datos conectada a MongoDB Atlas."))
    .catch((err) => console.log(`Error al conectar la base de datos. Error: ${err.message}`))
})
