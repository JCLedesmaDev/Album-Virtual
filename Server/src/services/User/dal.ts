import mongoose from "mongoose";
import { IUserCollection } from "../../models/collections/User";
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError";
import { IRegisterDto } from "./dto/frontToBack/IRegister.dto";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (field: string, value: string): Promise<IUserCollection | null> => {
    try {
        return await collections.Users.findOne({ [field]: value }).populate({ path: 'roles' });
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el usuario', source: error });
    }
}

/**
 * Crear un Usuario en la coleccion
 * @param payload Datos del futuro usuario.
 */
const createUser = async (payload: IRegisterDto): Promise<void> => {
    try {
        await collections.Users.create({
            email: payload.email,
            fullName: payload.fullName,
            password: payload.password,
            roles: [new mongoose.Types.ObjectId('63c5d45afe1be5aea46fdada')] // Rol: User
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear un usuario', source: error });
    }
}

export default {
    getUserByField,
    createUser
}