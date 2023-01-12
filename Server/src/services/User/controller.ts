import { NextFunction, Request, Response } from "express";
import { matchedData } from 'express-validator'
import { ILoginDto } from "./dto/frontToBack/ILogin.dto";
import { IRegisterDto } from "./dto/frontToBack/IRegister.dto";
import logic from './logic'


const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload: ILoginDto = matchedData(req) as ILoginDto

    req.locals.info = payload // Se utiliza en el eventHandler
    const data: any = await logic.loginUser(payload)
    req.locals.result = data // Se utiliza en el eventHandler

    // SI es true, pasa directo hacia errorHandler
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload: IRegisterDto = matchedData(req) as IRegisterDto

    req.locals.info = payload // Se utiliza en el eventHandler
    const data: any = await logic.registerUser(payload)
    req.locals.result = data // Se utiliza en el eventHandler

    // SI es true, pasa directo hacia errorHandler
    if (data?.error) return next(data.error)

    res.json(data)
    next()
}

export {
    loginUser,
    registerUser
}