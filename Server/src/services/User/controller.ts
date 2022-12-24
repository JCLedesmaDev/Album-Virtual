import { NextFunction, Request, Response } from "express";
import { matchedData } from 'express-validator'
import logic from './logic'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    // TODO: Especificar el tipo de dato que es payload

    req.locals.params = req.body // Se utiliza en el eventHandler
    const payload = matchedData(req)
    const data = await logic.loginUser(payload)

    req.locals.result = data // Se utiliza en el eventHandler
    res.json(data)
    next()
}

export {
    loginUser
}