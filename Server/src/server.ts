import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import config from 'config'
import indexRoutes from './routes/index.routes'
import { headersHandler } from './middlewares/headersHandler';
import { errorHandler } from './middlewares/errorHandler';
import { eventHandler } from './middlewares/eventHandler';
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

function startServer(PORT: number) {

    const app: Express = express();

    app.use(logger(config.get('logger')))
    app.use(express.json()) //--> Comprende mensajes JSON
    app.use(cors({ origin: '*' }));
    // app.use(express.static("./app/storage")) //Definimos la carpeta "storage", como acceso publico para poder obtener los archivos.


    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running in ${config.util.getEnv("NODE_ENV")} at ${config.get('server.public_url')}${PORT}`);
        console.log(`⚡️[server]: Swagger Server at ${config.get('server.public_url')}${PORT}/documentation`);
    });

    app.use(headersHandler) // Definimos como manejamos todos los datos provenientes del headers

    app.use('/api', indexRoutes)
    app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

    // REspuesta del Back cuando se le pegue a una ruta no existente.
    // app.use("*", (req: Request, res: Response, next: NextFunction) => {
    //     const err = Error(`Requested path ${req.path} not found`);
    //     next(err);
    //     });

    app.use(eventHandler)
    app.use(errorHandler)

}


export default {
    startServer
}