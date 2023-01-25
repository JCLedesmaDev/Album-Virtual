import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPage } from "../../interface/IPage"
import { IAlbumCollection } from "../../models/collections/Album"
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"
import { IAlbumDto } from "./dto/frontToBack/IAlbum.dto."


const createAlbum = async (payload: IAlbumDto): Promise<IAlbumCollection> => {
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
        throw new ApplicationError({ message: 'Ha ocurrido un error al buscar un Album', source: error })
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
                title: {$regex: new RegExp(filterText), $options: 'i'},                 
            }),
        }
        return await collections.Albumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

export default {
    createAlbum,
    findAlbum,
    getListAlbumes
}