import collections from "../../models/index.models"
import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { ApplicationError } from "../../utils/applicationError"
import { IFigurineSchema } from "../../models/collections/Figurites"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"
import { IBuyFigurineDto } from "./dto/IBuyFigurine.dto"
import { IPurchasedAlbumSchema } from "../../models/collections/PurchasedAlbumes"
import { IPurchasedFiguresSchema } from "../../models/collections/PurchasedFigures"


const findFigurine = async (objFind: any): Promise<IFigurineSchema | null> => {
    try {
        return await collections.Figurites.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar esta Figurita', source: error })
    }
}

const createFigurine = async (payload: ICreateFigurineDto): Promise<IFigurineSchema> => {
    try {
        const newFigurine = await collections.Figurites.create({
            album: new Types.ObjectId(payload.idAlbum),
            image: payload.image,
            title: payload.title
        })

        await collections.Albumes.findByIdAndUpdate(payload.idAlbum, {
            $push: {figurites: new Types.ObjectId(newFigurine._id)}
        })

        return newFigurine
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

const findPurchasedAlbum = async (payload: IBuyFigurineDto): Promise<IPurchasedAlbumSchema | null> => {
    try {
        return await collections.PurchasedAlbumes.findOne({
            _id: payload.idPurchasedAlbum,
            user: payload.idUsuario
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al verificar la compra del Album', source: error })
    }
}

const findPurchasedFigurine = async (payload: IBuyFigurineDto): Promise<IPurchasedFiguresSchema | null> => {
    try {
        return await collections.PurchasedFigures.findOne({
            figurineRef: payload.idFigurine,
            purchasedAlbum: payload.idPurchasedAlbum,
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al verificar la compra de la figurita', source: error })
    }
}

const buyFigurine = async (payload: IBuyFigurineDto): Promise<IPurchasedFiguresSchema> => {
    try {
        return await collections.PurchasedFigures.create({
            figurineRef: new Types.ObjectId(payload.idFigurine),
            purchasedAlbum: new Types.ObjectId(payload.idPurchasedAlbum),
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al comprar esta Figurita', source: error })
    }
}

export default {
    findFigurine,
    createFigurine,
    deleteFigurine,
    updateFigurine,
    findPurchasedAlbum,
    findPurchasedFigurine,
    buyFigurine
}