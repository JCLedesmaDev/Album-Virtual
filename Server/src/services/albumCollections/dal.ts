import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPagination } from "../../interface/IPagination"
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"


const createCollection = async (payload: ICreateAlbumDto): Promise<IAlbumSchema> => {
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

const findCollection = async (objFind: any): Promise<IAlbumSchema | null> => {
    try {
        return await collections.Albumes.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar este Album', source: error })
    }
}

const getListCollections = async ({ page, filterText }: IPagination): Promise<PaginateResult<IAlbumSchema>> => {
    try {
        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: 'figurites'
        }
        const query: FilterQuery<IAlbumSchema> = {
            ...(filterText !== '' && {
                title: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.Albumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

const deleteCollection = async (payload: string): Promise<any> => {
    try {
        return await collections.Albumes.deleteById(payload)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    }
}

const updateCollection = async (payload: IUpdateAlbumDto): Promise<IAlbumSchema | null> => {
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
    findCollection,
    createCollection,
    getListCollections,
    deleteCollection,
    updateCollection
}