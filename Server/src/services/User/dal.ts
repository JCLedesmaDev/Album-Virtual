import { IUserCollection } from "../../models/collections/User";
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (field: string, value: string): Promise<IUserCollection | null> => {
    try {
        return await collections.Users.findOne({ [field]: value });
    } catch (error) {
        throw new ApplicationError('Ha ocurrido un error al obtener el usuario', error);
    }
}

export default {
    getUserByField
}