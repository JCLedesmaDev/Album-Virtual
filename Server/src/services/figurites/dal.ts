import collections from "../../models/index.models"
import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { ApplicationError } from "../../utils/applicationError"
import { IFigurineSchema } from "../../models/collections/Figurites"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"


const findFigurine = async (objFind: any): Promise<IFigurineSchema | null> => {
    try {
        return await collections.Figurites.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar esta Figurita', source: error })
    }
}

const createFigurine = async (payload: ICreateFigurineDto): Promise<IFigurineSchema> => {
    try {
        return await collections.Figurites.create({
            album: new Types.ObjectId(payload.idAlbum),
            image: payload.image,
            title: payload.title
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear una Figurita', source: error })
    }
}

const deleteFigurine = async (payload: IDeleteFigurineDto): Promise<any> => {
    try {
        return await collections.Figurites.deleteById(payload.id)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar esta Figurita', source: error })
    }
}

const updateFigurine = async (payload: IUpdateFigurineDto): Promise<IFigurineSchema | null> => {
    try {
        return await collections.Figurites.findByIdAndUpdate(payload.id, {
            title: payload.title,
            image: payload.image,
            album: new Types.ObjectId(payload.idAlbum)
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al actualizar esta Figurita', source: error })
    }
}

export default {
    findFigurine,
    createFigurine,
    deleteFigurine,
    updateFigurine
}