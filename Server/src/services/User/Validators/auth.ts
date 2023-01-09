import { check } from 'express-validator'
import { validateResults } from '../../../middlewares/validatorExpressHandler'
import { Request, Response, NextFunction } from "express";


const validatorRegister = [
    check("fullName", "Este campo es requerido").exists().notEmpty().isLength({ max: 99, min: 3 }),
    check("email", "Este campo es requerido").exists().notEmpty().isEmail(),
    check("password", "Este campo es requerido").exists().notEmpty().isLength({ max: 15, min: 3 }),

    // TODO: Agregar comparacion de contrasñas
    // check("confirmPassword", "Este campo es requerido").exists().notEmpty().isLength({ max: 15, min: 3 }), 
    (req:Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]

const validatorLogin = [
    check("email", "Este campo es requerido").exists().notEmpty().isEmail(),
    check("password", "Este campo es requerido").exists().notEmpty().isLength({ max: 15, min: 3 }),
    (req:Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]


export {
    validatorRegister,
    validatorLogin
}