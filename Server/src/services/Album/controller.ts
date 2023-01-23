import { Request, Response, NextFunction } from "express"
import logic from './logic'


const getListAlbumes = async (req: Request, res: Response, next: NextFunction) => {
    req.locals.info = {}
    const data: any = await logic.getListAlbumes()
    req.locals.result = data

    if (data?.error) return next(data.error)

    req.locals.finished = true
    res.json(data)
    next()
}

export {
    getListAlbumes
}