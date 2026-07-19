import dotenv from "dotenv";

dotenv.config();

export const env = {
    MONGO_KEY: process.env.MONGO_KEY,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}

const env_vars = Object.keys(env)

for (const env_var of env_vars) {
    if (!env[env_var]) {
        throw new Error(`Missing required environment variable: ${env_var}`);
    }
}