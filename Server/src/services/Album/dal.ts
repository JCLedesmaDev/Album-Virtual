import { Types } from "mongoose"
import { IPage } from "../../interface/IPage"
import { IAlbumCollection } from "../../models/collections/Album"
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"
import { IAlbumDto } from "./dto/frontToBack/IAlbum.dto."


const createAlbum = async (payload: IAlbumDto) => {
    try {
        return await collections.Albumes.create({
            collection: new Types.ObjectId(payload.idCollection),
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

const getListAlbumes = async ({ page }: IPage): Promise<any> => {
    try {
        const options = {
            page,
            limit: 10,
            populate: 'figurites'
        }
        return await collections.Albumes.paginate({}, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

export default {
    createAlbum,
    findAlbum,
    getListAlbumes
}