import { NextFunction, Request, Response } from 'express'
import responseMessage from '../utils/responseMessage'


const notFoundRouterHandler = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json(responseMessage.error<any>({
        message: `Ruta de servidor: ${req.baseUrl}. No encontrada`
    }))
}

export { notFoundRouterHandler }