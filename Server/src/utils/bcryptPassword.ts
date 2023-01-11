import 'express-async-errors' 
import bcryptJs from 'bcryptjs'
import { ApplicationError } from './applicationError';

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 * @returns Retorna la contraseña encriptada
 */
const encrypt = async (passwordPlain: string): Promise<string> => {
    try {
        const salt = await bcryptJs.genSalt(10)
        // return await bcryptJs.hash(passwordPlain, salt)
        return await bcryptJs.hash(passwordPlain, 'asdqwdas')
    } catch (error) {
        throw new ApplicationError("A", error);        
    }
}

/**
 * Compara la contrasena recibia con la que tenemos en BD
 * @param {*} passwordPlain Contrasena sin encriptar
 * @param {*} hashPasword Contrasena encriptada
 * @returns Retorna un booleano de igualdad o no.
 */
const compare = async (passwordPlain: string, hashPasword: string): Promise<boolean> => (
    await bcryptJs.compare(passwordPlain, hashPasword)
)

export default {
    encrypt, compare
}