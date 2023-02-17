import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPagination } from "../../interface/IPagination"
import { ICreateCollectionDto } from "./dto/ICreateCollection.dto"
import { IDeleteCollectionDto } from "./dto/IDeleteCollection.dto"
import { IUpdateCollectionDto } from "./dto/IUpdateCollection.dto"
import logic from './logic'




const createCollection = async (req: Request, res: Response, next: NextFunction) => {

    const payload: ICreateCollectionDto = matchedData(req) as ICreateCollectionDto

    req.locals.info = payload
    const data = await logic.createCollection(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const getAllCollections = async (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        page: req.params.page || 1,
        filterText: req.params.filterText
    } as IPagination

    req.locals.info = payload
    const data = await logic.getAllCollections(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const deleteCollection = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IDeleteCollectionDto = matchedData(req) as IDeleteCollectionDto

    req.locals.info = { idAlbum: payload }
    const data = await logic.deleteCollection(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const updateCollection = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IUpdateCollectionDto = matchedData(req) as IUpdateCollectionDto

    req.locals.info = payload
    const data = await logic.updateCollection(payload)
    req.locals.result = data

    req.locals.finished = true
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}



export {
    createCollection, 
    getAllCollections, 
    deleteCollection,
    updateCollection
}