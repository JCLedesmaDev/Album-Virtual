import * as dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env" });
}

import "./src/process"

import dbConnect from "./src/database/mongo";
import server from "./src/server"
import config from 'config'

if (!config.get('server.port')) {
    console.log(`Error to get ports`);
    process.exit(1);
}

const PORT: number = config.get('server.port')

dbConnect()
    .then(() => {
        server.startServer(PORT)
    })
    .catch((err: Error) => {
        console.log("No se pudo conectar a la BD", err)
    })





