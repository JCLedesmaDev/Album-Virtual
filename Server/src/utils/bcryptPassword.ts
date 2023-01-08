import bcryptJs from 'bcryptjs'

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 * @returns Retorna la contraseña encriptada
 */
const encrypt = async (passwordPlain: string): Promise<string> => (
    await bcryptJs.hash(passwordPlain, generateStringRandom(10))
)

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

const generateStringRandom = (cantLength: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < cantLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}