import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import mapper from './mapper'
import responseMessage, { IResponse } from "../../utils/responseMessage"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateFiguritesDto } from "./dto/ICreateFigurites.dto"



const createFigurine = tryCatchWrapper(async (payload: ICreateFiguritesDto) => {

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


export default {
    createFigurine
}