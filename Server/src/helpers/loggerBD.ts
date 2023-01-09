import collections from "../models/index.models"
import { ApplicationError } from "../utils/applicationError";

const insertLoggerDB = async (
    usuarioId: string, tipo: string, request: any,
    response: any, fecha: Date = new Date()
) => {
    try {
        await collections.RegisterDb.create({
            type: tipo,
            date: fecha,
            request: request,
            response: response,
            user: usuarioId,
        })
    } catch (error) {
        throw new ApplicationError("Ocurrio un error al querer loggear la info.", error);
    }
}

export default {
    insertLoggerDB
}