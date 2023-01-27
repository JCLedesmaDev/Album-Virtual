import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPage } from "../../interface/IPage"
import { IAlbumCollection } from "../../models/collections/Album"
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"
import { ICreateAlbumDto } from "./dto/frontToBack/ICreateAlbum.dto."
import { IUpdateAlbumDto } from "./dto/frontToBack/IUpdateAlbum.dto"


const createAlbum = async (payload: ICreateAlbumDto): Promise<IAlbumCollection> => {
    try {
        return await collections.Albumes.create({
            collectionAlbum: new Types.ObjectId(payload.idCollection),
            image: payload.image,
            title: payload.title
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear un Album', source: error })
    }
}

const findAlbum = async (field: string, value: string): Promise<IAlbumCollection | null> => {
    try {
        return await collections.Albumes.findOne({ [field]: value })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar este Album', source: error })
    }
}

const getListAlbumes = async ({ page, filterText }: IPage): Promise<PaginateResult<IAlbumCollection>> => {
    try {
        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: 'figurites'
        }
        const query: FilterQuery<IAlbumCollection> = {
            ...(filterText !== '' && {
                title: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.Albumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

const deleteAlbum = async (payload: string): Promise<any > => {
    try {
        return await collections.Albumes.deleteById(payload)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    }
}

const updateAlbum = async (payload: IUpdateAlbumDto): Promise<IAlbumCollection | null> => {
    try {
        return await collections.Albumes.findByIdAndUpdate(payload.id, {
            title: payload.title,
            image: payload.image,
            collectionAlbum: new Types.ObjectId(payload.idCollection)
        })

    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al actualziar este album', source: error })
    }
}

export default {
    createAlbum,
    findAlbum,
    getListAlbumes,
    deleteAlbum,
    updateAlbum
}