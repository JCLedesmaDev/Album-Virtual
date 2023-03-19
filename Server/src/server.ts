import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import config from 'config'
import indexRoutes from './routes/index.routes'
import { headersHandler } from './middlewares/headersHandler';
import { errorHandler } from './middlewares/errorHandler';
import { eventHandler } from './middlewares/eventHandler';
import { notFoundRouterHandler } from './middlewares/notFoundRouteHandler';
import { createMocksDateHandler } from './middlewares/createMocksDateHandler';

function startServer(PORT: number) {

    const app: Express = express();

    app.use(logger(config.get('logger')))
    app.use(express.json()) //--> Comprende mensajes JSON
    app.use(cors({ origin: '*' }));

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running in ${config.util.getEnv("NODE_ENV")} at ${config.get('server.public_url')}${PORT}`);
    });

    app.use(createMocksDateHandler)
    app.use(headersHandler) // Definimos como manejamos todos los datos provenientes del headers

    app.use('/api', indexRoutes)
    app.use("*", notFoundRouterHandler);

    app.use(eventHandler)
    app.use(errorHandler)
}


export default {
    startServer
}