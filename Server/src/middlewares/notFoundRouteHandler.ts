import { NextFunction, Request, Response } from 'express'
import { ApplicationError } from '../utils/applicationError'
import responseMessage from '../utils/responseMessage'


const notFoundRouterHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (res.req.statusCode === null) { 
        throw new ApplicationError({message: `Ruta de servidor: ${req.baseUrl}. No encontrada`})
    }
    next()
}

export { notFoundRouterHandler }