import { Request, Response, NextFunction } from 'express'
import { ApplicationError } from '../utils/applicationError'
import responseMessage from '../utils/responseMessage'
import logger from '../helpers/loggerBD'

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("🚀 ---------------------------------------------------")
        console.log("🚀 ~ file: errorHandler.ts:8 ~ errorHandler ~ err", err)
        console.log("🚀 ---------------------------------------------------")
        const requestInfo = {
            headers: req.headers,
            body: req.body,
            params: req.params,
            url: req.url
        }
        await logger.insertLoggerDB(
            req.headers.legajo as string,  // TODO: Cambiar legajo por Id Usuario
            'Error',
            requestInfo,
            { ...err, stack: err.stack }
        )
        res.status(err.status).json(
            responseMessage.error<any>(err.message)
        )
    } catch (error) {
        console.log("OCURRIO UN ERROR", error)
        res.status(500).json(
            responseMessage.error<any>('Error interno', error)
        )
    }
}

export {
    errorHandler
}