
/**
 * Funcion que crea el DTO para el front
 * @param type Tipo de respuesta
 * @param message Mensaje de respuesta
 * @param data Datos de respuesta
 * @returns Objeto response 
 */
const response = <typeData>(type: string, message: string, data?: typeData) => {
    const res = {
        info: {
            type: type,
            msg: message,
            // ...
            ...(data && {
                data: data
            })
        },
    }
    // if (data) res.info.data = data
    return res
}

/**
 * Mensaje de respuesta de peticion 200.
 * @param message Mensaje de cordialidad
 * @param data Datos de respuesta.
 * @returns Objeto generico de respuesta.
 */
const success = <typeData>(message: string, data?: typeData) => {
    return response<typeData>('success', message, data)
}

/**
 * Mensaje de respuesta de peticion 400 - 500.
 * @param message Mensaje de cordialidad
 * @param data Datos de respuesta.
 * @returns Objeto generico de respuesta.
 */
const error = <typeData>(message: string, data?: typeData) => {
    return response<typeData>('error', message, data)
}

export default {
    success,
    error
}
