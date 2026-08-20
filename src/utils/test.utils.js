import app from "../app.js"
import mongoose from "mongoose"
import { connectDB } from "../config/database.js"
import { env } from "../config/env.js"

let server;

export async function connectDbSv(){
    await connectDB();
    server = app.listen(env.PORT)
}

export async function disconnectDbSv(){
    await mongoose.disconnect();
    await new Promise((resolve) => server.close(resolve));
}