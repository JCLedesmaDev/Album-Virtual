import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { ICreateFiguritesDto } from "./dto/ICreateFigurites.dto"
import logic from './logic'


const createFigurine = async (req: Request, res: Response, next: NextFunction) => {

    const payload: ICreateFiguritesDto = matchedData(req) as ICreateFiguritesDto
    req.locals.info = payload
    const data = await logic.createFigurine(payload)
    req.locals.result = data

    if (data?.error) return next(data.error)

    req.locals.finished = true
    res.json(data)
    next()
}



export {
    createFigurine
}