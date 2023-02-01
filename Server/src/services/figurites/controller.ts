import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IBuyFigurineDto } from "./dto/IBuyFigurine.dto"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"
import logic from './logic'


const createFigurine = async (req: Request, res: Response, next: NextFunction) => {

    const payload: ICreateFigurineDto = matchedData(req) as ICreateFigurineDto
    req.locals.info = payload
    const data = await logic.createFigurine(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)
    
    res.json(data)
    next()
}

const deleteFigurine = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IDeleteFigurineDto = matchedData(req) as IDeleteFigurineDto
    req.locals.info = payload
    const data = await logic.deleteFigurine(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)
    
    // req.locals.finished = true
    res.json(data)
    next()
}

const updateFigurine = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IUpdateFigurineDto = matchedData(req) as IUpdateFigurineDto
    req.locals.info = payload
    const data = await logic.updateFigurine(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)
    
    // req.locals.finished = true
    res.json(data)
    next()
}

const buyFigurine = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IBuyFigurineDto = matchedData(req) as IBuyFigurineDto
    req.locals.info = payload
    const data = await logic.buyFigurine(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)
    
    // req.locals.finished = true
    res.json(data)
    next()
}



export {
    createFigurine,
    deleteFigurine,
    updateFigurine,
    buyFigurine
}