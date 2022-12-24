/* Aca colocaremos las condiciones de networking , es decir, tendremos e indicaremos en que puerto 
arranca el proyecto y luego lo exportaremos al app.js*/







import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import config from 'config'
import indexRoutes from './routes/index.routes'
import swaggerUi from "swagger-ui-express";
import { headersHandler } from './middlewares/headersHandler';
// import swaggerSetup from "./docs/swagger";

function startServer(PORT: number) {

    const app: Express = express();

    app.use(logger(config.get('logger')))
    app.use(express.json()) //--> Comprende mensajes JSON
    app.use(cors({ origin: '*' }));

    app.use(headersHandler) // Definimos como manejamos todos los datos provenientes del headers

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running in ${config.util.getEnv("NODE_ENV")} at ${config.get('server.public_url')}${PORT}`);
    });

    app.use('/api', indexRoutes)
    // app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

}


export default {
    startServer
}