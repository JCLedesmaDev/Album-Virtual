import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"

const getListAlbumes = async (): Promise<any> => {
    try {
        const options = {
            page: 1,
            limit: 10,
            populate: 'figuritas'
        }
        return await collections.Albumes.paginate({}, options)
    } catch (error) {
        throw new ApplicationError({message: 'Ha ocurrido un error al obtener el listado de albumes', source: error})
    }
}

export default { getListAlbumes }