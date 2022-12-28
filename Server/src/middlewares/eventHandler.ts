
import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/loggerBD'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {

    const requestInfo = {
        headers: req.headers,
        body: req.body,
        params: req.params,
        url: req.url
    }
    console.log("🚀 ~ file: eventHandler.ts:13 ~ eventHandler ~ requestInfo", requestInfo)

    await logger.insertLoggerDB(
        req.headers.legajo as string, /// TODO: Cambiar legajo por Id Usuario
        'Evento',
        req.url,
        requestInfo,
        res.locals.result ?? ''
    )
    next()
}

export {
    eventHandler
} 
