import collections from "../models/index.models"
import { ApplicationError } from "../utils/applicationError";

interface ILogger {
    usuarioId: string;
    tipo: string;
    request: any;
    response: any;
}

const insertLoggerDB = async (infoLooger: ILogger) => {
    try {
        const { usuarioId, tipo, request,
            response } = infoLooger

        await collections.RegisterDb.create({
            type: tipo,
            date: new Date(),
            request: request,
            response: response || {},
            user: usuarioId || '',
        })
    } catch (error) {
        throw new ApplicationError("Ocurrio un error al querer loggear la info.", error);
    }
}

export default {
    insertLoggerDB
}