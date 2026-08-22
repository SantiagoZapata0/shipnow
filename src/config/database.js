import mongoose from "mongoose";
import{ getDbUri } from "../config/env.js"

export async function connectDB(){
    return mongoose.connect(getDbUri())
}