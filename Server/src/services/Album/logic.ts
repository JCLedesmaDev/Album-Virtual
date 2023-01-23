import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"
import mapper from './mapper.dto'
import responseMessage from "../../utils/responseMessage"


const getListAlbumes = tryCatchWrapper( async () => {

    const listAlbumes = await externalDb.getListAlbumes()

    const listAlbumesMapper = ''
})

export default { getListAlbumes }