import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
// import mapper from './mapper.dto'
import responseMessage from "../../utils/responseMessage"


const getListAlbumes = tryCatchWrapper(async () => {

    const listAlbumes = await externalDb.getListAlbumes()

    const listAlbumesMapper = '' // Ejecutar mapper

    return responseMessage.success<any>({
        data: listAlbumesMapper
    })
})

export default { getListAlbumes }