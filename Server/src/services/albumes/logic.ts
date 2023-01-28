import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import mapper from './mapper.dto'
import responseMessage, { IResponse } from "../../utils/responseMessage"
import { IPage } from "../../interface/IPage"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IDeleteAlbumDto } from "./dto/IDeleteAlbum.dto"
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"
import { IAlbum } from "../../interface/IAlbum"
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"


const createAlbum = tryCatchWrapper(async (payload: ICreateAlbumDto) => {

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

    const listAlbumesMapper: IPaginationResult<IAlbum> = paginationMapper<IAlbum>({
        resource: listAlbumes,
        callBackMapper: mapper.multipleAlbums
    })

    return responseMessage.success<typeof listAlbumesMapper>({
        data: listAlbumesMapper
    })
})

const deteleAlbum = tryCatchWrapper(async (payload: IDeleteAlbumDto) => {
    const album = await externalDb.findAlbum('_id', payload.id)

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }

    await externalDb.deleteAlbum(payload.id)

    return responseMessage.success<any>({
        message: 'Ha eliminado un Album exitosamente!'
    })
})

const updateAlbum = tryCatchWrapper(async (payload: IUpdateAlbumDto) => {
    const album = await externalDb.findAlbum('_id', payload.id)

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }

    await externalDb.updateAlbum(payload)

    return responseMessage.success<any>({
        message: 'Ha actualizado un Album exitosamente!'
    })
})


const buyAlbum = tryCatchWrapper(async (payload: IBuyAlbumDto) => {
    const album = await externalDb.findAlbum('_id', payload.idAlbum)

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }
    
    const findPurchasedAlbum = await externalDb.findPurchasedAlbum(payload)
    
    if (findPurchasedAlbum !== null) {
        throw new ApplicationError({ message: 'Ya compraste este Album!.' });
    }

    await externalDb.buyAlbum(payload)

    return responseMessage.success<any>({
        message: 'Compraste este Album!!'
    })
})

export default {
    createAlbum,
    getListAlbumes,
    deteleAlbum,
    updateAlbum,
    buyAlbum
}