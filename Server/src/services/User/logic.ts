import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"
import { ILoginDto } from "./dto/frontToBack/ILogin.dto"
import bcrypt from "../../utils/bcryptPassword"
import responseMessage from "../../utils/responseMessage"
import { IUserDto } from "../../../types/IUser.dto"

const loginUser = async (payload: ILoginDto) => {
    try {
        const user = await externalDb.getUserByField('email', payload.email);

        if (user === null) {
            throw new ApplicationError('Usuario inexistente. Intentelo nuevamente');
        }

        const comparePassword = await bcrypt.compare(user.password, payload.password)

        if (!comparePassword) {
            throw new ApplicationError('Contraseña incorrecta. Intentelo nuevamente')
        }

        // const asd: IUserDto = {
        //     id: user.id,
        //     email: user.email,
        //     fullName: user.fullName,
        //     roles: user.ro
        // }

        /* 
            TODO: Agregar interface de IUser en Types
            Determinar la interface de token + usr, 
            Agregar mapper y crear token
        
        */

        // const data = {
        //     token: await tokenSign(user),
        //     user: {

        //     }
        // }

        return responseMessage.success<any>(
            'Ha iniciado sesion correctamente!', {
            token: 'a',
            user: {}
        })

    } catch (error) {
        throw new ApplicationError("Ocurrio un error al querer iniciar sesion.", error);
    }
}


export default {
    loginUser
}