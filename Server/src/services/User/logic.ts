import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"
import { ILoginDto } from "./dto/frontToBack/ILogin.dto"
import bcrypt from "../../utils/bcryptPassword"
import responseMessage from "../../utils/responseMessage"
import mapper from './mapper.dto'
import { IAuthDto } from "./dto/backToFront/IAuth.dto"
import { IRegisterDto } from "./dto/frontToBack/IRegister.dto"
const loginUser = async (payload: ILoginDto) => {
    try {

        const user = await externalDb.getUserByField('email', payload.email);

        if (user === null) {
            throw new ApplicationError('Usuario inexistente. Intentelo nuevamente');
        }

        const comparePassword = await bcrypt.compare(payload.password, user.password)

        if (!comparePassword) {
            throw new ApplicationError('Contraseña incorrecta. Intentelo nuevamente')
        }

        const userMapper: IAuthDto = await mapper.singleUserAuth(user)

        return responseMessage.success<IAuthDto>({
            message: 'Ha iniciado sesion correctamente!', data: userMapper
        })

    } catch (error: any) {
        // next(error)
        throw new ApplicationError("Ocurrio un error al querer iniciar sesion.", error);
    }
}


// https://diegooo.com/errores-en-nodejs-manejo-nivel-profesional/
// https://medium.com/@aarnlpezsosa/middleware-de-manejo-de-errores-32b706dd1bc6
const registerUser = async (payload: IRegisterDto) => {
    try {
        const user = await externalDb.getUserByField('email', payload.email);

        if (user !== null) {
            throw new ApplicationError('Este email, ya ha sido utilizado. Intentelo con otro.');
        }

        const passwordHash = await bcrypt.encrypt(payload.password)

        await externalDb.createUser({
            ...payload,
            password: passwordHash
        })

        return responseMessage.success<any>({
            message: 'Se ha registrado correctamente!'
        })
    } catch (error: any) {
        return { error }
    }
}

export default {
    loginUser,
    registerUser
}

// import { Request, Response, NextFunction } from "express";
// export const asyncWrapper = (fn: any) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//     };
// }