import { Request, Response, NextFunction } from 'express'
import { ApplicationError } from '../utils/applicationError'
import responseMessage from '../utils/responseMessage'
import logger from '../helpers/loggerBD'

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {

    try {
        const requestInfo = {
            headers: req.headers,
            body: req.body,
            params: req.params,
            url: req.url
        }
        await logger.insertLoggerDB(
            req.headers.legajo as string,  // TODO: Cambiar legajo por Id Usuario
            'Error',
            req.url,
            requestInfo,
            { ...err, stack: err.stack }
        )
        return res.status(err.status ?? 200).json(
            responseMessage.error(err.message)
        )
    } catch (error) {
        console.log(error)
        return res.status(200).json(
            responseMessage.error('Error interno')
        )
    }
}

export {
    errorHandler
}