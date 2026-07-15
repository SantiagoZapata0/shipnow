import dotenv from "dotenv";

dotenv.config();

const required_env_vars = ["PORT", 'MONGO_KEY', 'NODE_ENV', "JWT_SECRET"]

for (const env_var of required_env_vars) {
    if (!process.env[env_var]) {
        throw new Error(`Missing required environment variable: ${env_var}`);
    }
}

export const env = {
    MONGO_KEY: process.env.MONGO_KEY,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}