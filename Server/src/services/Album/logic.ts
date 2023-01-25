import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import mapper from './mapper.dto'
import responseMessage from "../../utils/responseMessage"
import { IPage } from "../../interface/IPage"
import { IAlbumDto } from "./dto/frontToBack/IAlbum.dto."
import { ApplicationError } from "../../utils/applicationError"
import { paginationMapper } from "../../utils/paginationMapper"


const createAlbum = tryCatchWrapper(async (payload: IAlbumDto) => {

    const album = await externalDb.findAlbum('title', payload.title)

    if (album !== null) {
        throw new ApplicationError({ message: 'Ya existe un Album con este nombre. Intentelo con otro.' });
    }

    await externalDb.createAlbum(payload)

    return responseMessage.success<any>({
        message: 'Ha creado un Album exitosamente!'
    })
})

const getListAlbumes = tryCatchWrapper(async (payload: IPage) => {

    const listAlbumes = await externalDb.getListAlbumes(payload)

    const listAlbumesMapper = paginationMapper<any>({
        resource: listAlbumes,
        callBackMapper: mapper.multipleAlbums
    })

    return responseMessage.success<any>({
        data: listAlbumesMapper
    })
})

export default {
    createAlbum,
    getListAlbumes
}