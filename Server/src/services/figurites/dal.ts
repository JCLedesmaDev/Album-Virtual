import collections from "../../models/index.models"
import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { ApplicationError } from "../../utils/applicationError"
import { IFigurineSchema } from "../../models/collections/Figurites"
import { ICreateFiguritesDto } from "./dto/ICreateFigurites.dto"


const findFigurine = async (objFind: any): Promise<IFigurineSchema | null> => {
    try {
        return await collections.Figurites.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar esta Figurita', source: error })
    }
}

const createFigurine = async (payload: ICreateFiguritesDto): Promise<IFigurineSchema> => {
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

export default {
    findFigurine,
    createFigurine
}