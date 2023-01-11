import { Request, Response, NextFunction } from 'express'
import responseMessage from '../utils/responseMessage'
import logger from '../helpers/loggerBD'

// eslint-disable-next-line no-unused-vars
// const errorHandler = async (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("🚀 ---------------------------------------------------")
        // console.log("🚀 ~ file: errorHandler.ts:8 ~ errorHandler ~ err", err)
        // console.log("🚀 ---------------------------------------------------")
        const requestInfo = {
            headers: req.headers,
            body: req.locals.info,
            params: req.params,
            url: req.url
        }
        await logger.insertLoggerDB({
            usuarioId: req.headers.legajo as string,  // TODO: Cambiar legajo por Id Usuario
            tipo: 'Error',
            request: requestInfo,
            response: { ...err, stack: err.stack }
        })

        // res.status(err.status).json(
        res.json(
            // responseMessage.error<any>({ message: err.source.message || err.message })
            responseMessage.error<any>({ message: err.message })
        )
    } catch (error) {
        console.log("OCURRIO UN ERROR", error)
        res.status(500).json(
            responseMessage.error<any>({ message: 'Error interno', data: error })
        )
    }
}

export {
    errorHandler
}