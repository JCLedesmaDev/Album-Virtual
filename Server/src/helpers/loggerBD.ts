import collections from "../models/index.models"

const insertLoggerDB = async (
    usuarioId: string,
    tipo: string,
    feacture: string,
    request: any,
    response: any,
    fecha: Date = new Date()
) => {
    await collections.RegisterDb.create({
        type: tipo,
        user: usuarioId,
        feacture: feacture,
        date: fecha,
        request: request,
        response: response,
    })
}

export default {
    insertLoggerDB
}