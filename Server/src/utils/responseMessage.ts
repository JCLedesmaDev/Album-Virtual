
interface IResponseType<TypeData> {
    message: string;
    data?: TypeData
}
interface IResponseMethod<TypeData> extends IResponseType<TypeData> {
    typeResponse: string
}

/**
 * Funcion que crea el DTO para el front
 * @param infoResponse Objeto que contiene props: "message"; "data"; "typeResponse"
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const response = <typeData>(infoResponse: IResponseMethod<typeData>) => {
    const { data, message, typeResponse } = infoResponse
    return {
        info: {
            type: typeResponse,
            msg: message,
            ...(data && {
                data: data
            })
        },
    }
}

/**
 * Mensaje de respuesta de peticion 200.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const success = <typeData>(info: IResponseType<typeData>) => {
    const { data, message } = info
    return response<typeData>({ typeResponse: 'success', message, data })
}

/**
 * Mensaje de respuesta de peticion 400 - 500.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const error = <typeData>(info: IResponseType<typeData>) => {
    const { data, message } = info
    return response<typeData>({ typeResponse: 'error', message, data })
}

export default {
    success,
    error
}
