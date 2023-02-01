import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPage } from "../../interface/IPage"
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IDeleteAlbumDto } from "./dto/IDeleteAlbum.dto"
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"
import logic from './logic'


const createAlbum = async (req: Request, res: Response, next: NextFunction) => {

    const payload: ICreateAlbumDto = matchedData(req) as ICreateAlbumDto
    req.locals.info = payload
    const data = await logic.createAlbum(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const getListAlbumes = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IPage = {
        page: req.locals.page | 1,
        filterText: req.locals.filterText
    }
    req.locals.info = payload
    const data = await logic.getListAlbumes(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IDeleteAlbumDto = matchedData(req) as IDeleteAlbumDto

    req.locals.info = { idAlbum: payload }
    const data = await logic.deteleAlbum(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const updateAlbum = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IUpdateAlbumDto = matchedData(req) as IUpdateAlbumDto

    req.locals.info = payload
    const data: any = await logic.updateAlbum(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const buyAlbum = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IBuyAlbumDto = matchedData(req) as IBuyAlbumDto

    req.locals.info = payload
    const data: any = await logic.buyAlbum(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

export {
    createAlbum,
    getListAlbumes,
    deleteAlbum,
    updateAlbum,
    buyAlbum
}