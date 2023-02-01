import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import mapper from './mapper'
import responseMessage, { IResponse } from "../../utils/responseMessage"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"



const createFigurine = tryCatchWrapper(async (payload: ICreateFigurineDto) => {

    const findFigurine = await externalDb.findFigurine({
        title: payload.title,
        album: payload.idAlbum
    })

    if (findFigurine !== null) {
        throw new ApplicationError({ message: 'Ya existe una Figurita con este nombre en este Album. Intentelo con otro.' });
    }

    await externalDb.createFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha creado una figurita exitosamente!'
    })
})

const deleteFigurine = tryCatchWrapper(async (payload: IDeleteFigurineDto) => {

    const album = await externalDb.findFigurine({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe esta Figurita. Intentelo con otro.' });
    }

    await externalDb.deleteFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha eliminado un Album exitosamente!'
    })
})

const updateFigurine = tryCatchWrapper(async (payload: IUpdateFigurineDto) => {

    const findFigurine = await externalDb.findFigurine({
        title: payload.title,
        album: payload.idAlbum
    })

    if (findFigurine !== null) {
        throw new ApplicationError({ message: 'No existe esta Figurita. Intentelo con otro.' });
    }

    await externalDb.updateFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha editado una figurita exitosamente!'
    })
})


export default {
    createFigurine,
    deleteFigurine,
    updateFigurine
}