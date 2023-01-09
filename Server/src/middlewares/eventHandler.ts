
import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/loggerBD'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {

    const requestInfo = {
        headers: req.headers,
        body: req.locals.info,
        params: req.params,
        url: req.url
    }

    await logger.insertLoggerDB({
        usuarioId: req.headers.legajo as string, /// TODO: Cambiar legajo por Id Usuario
        tipo:'Evento',
        request: requestInfo,
        response: req.locals.result
    })
    next()
}

export {
    eventHandler
} 
