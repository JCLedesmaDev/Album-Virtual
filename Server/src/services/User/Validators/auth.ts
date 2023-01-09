import { check } from 'express-validator'
import { validateResults } from '../../../middlewares/validatorExpressHandler'
import { Request, Response, NextFunction } from "express";


const validatorRegister = [
    check("fullName", "Este campo es requerido")
        .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isLength({ min: 3, max: 99 })
        .withMessage('El campo debe tener entre 3 a 99 caracteres'),
    
    check("email", "Este campo es requerido")
        .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isEmail()
        .withMessage("El campo debe ser de tipo email"),

    check("password", "Este campo es requerido")
        .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isLength({ min: 3 , max: 15})
        .withMessage('El campo debe tener entre 3 a 15 caracteres'),
        
    // check("confirmPassword", "Este campo es requerido")
    //     .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
    //     .trim() // Elimina los espacios del comienzo y final del texto
    //     .isLength({ max: 15, min: 3 })
    //     .withMessage('El campo debe tener entre 3 a 15 caracteres')
    //     .custom(async (confirmPassword, { req }) => {
    //         const password = req.body.password
    //         if (password !== confirmPassword) {
    //             throw new Error('Las contraseñas ingresadas no coinciden')
    //         }
    //     }),
    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]

const validatorLogin = [
    check("email", "Este campo es requerido")
        .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isEmail()
        .withMessage("El campo debe ser de tipo email"),

    check("password", "Este campo es requerido")
        .exists({checkFalsy: true}) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isLength({ min: 3 , max: 15})
        .withMessage('El campo debe tener entre 3 a 15 caracteres'),
        
    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]


export {
    validatorRegister,
    validatorLogin
}