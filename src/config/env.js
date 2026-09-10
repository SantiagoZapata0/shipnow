import dotenv from "dotenv";

dotenv.config();

export const env = {
    MONGO_KEY: process.env.MONGO_KEY,
    PORT: process.env.PORT ?? 3000,
    NODE_ENV: process.env.NODE_ENV ?? "development",
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_KEY_TEST: process.env.MONGO_KEY_TEST
}

if (env.NODE_ENV === "test" && !env.MONGO_KEY_TEST) {
  throw new Error("Missing required environment variable: MONGO_KEY_TEST");
}

if (env.NODE_ENV !== "test" && !env.MONGO_KEY) {
  throw new Error("Missing required environment variable: MONGO_KEY");
}

export function getDbUri(){
    return env.NODE_ENV === "test" ? process.env.MONGO_KEY_TEST : env.MONGO_KEY
}