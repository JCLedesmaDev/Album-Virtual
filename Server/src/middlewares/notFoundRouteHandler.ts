import { NextFunction, Request, Response } from 'express'
import { ApplicationError } from '../utils/applicationError'


const notFoundRouterHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.locals.finished) {
            throw new ApplicationError({ message: `Ruta de servidor: ${req.baseUrl}. No encontrada` })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export { notFoundRouterHandler }