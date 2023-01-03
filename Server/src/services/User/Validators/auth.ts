import { check } from 'express-validator'
import { validateResults } from '../../../middlewares/validatorExpressHandler'
import { Request, Response, NextFunction } from "express";


const validatorRegister = [
    // check("name").exists().notEmpty().isLength({ max: 99, min: 3 }),
    // check("age").exists().notEmpty().isNumeric(),
    // check("password").exists().notEmpty().isLength({ max: 15, min: 3 }),
    // check("email").exists().notEmpty().isEmail(),
    // check("role").exists().notEmpty(),
    // check("artist").exists().notEmpty(),
    // check("artist.name").exists().notEmpty(),
    // check("artist.nickname").exists().notEmpty(),

    (req:Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]

const validatorLogin = [
    // check("email").exists().notEmpty().isEmail(),
    // check("password").exists().notEmpty().isLength({ max: 15, min: 3 }),
    (req:Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]


export {
    validatorRegister,
    validatorLogin
}