import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from "express";


const validateResults = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Valida los datos que se estan enviando y si no cumple con las condiciones
        // el .throw() forza que se vaya todo al catch
        validationResult(req).throw()
        next()
    } catch (error) {
        const errors = validationResult(req);
        const extractedErrors = []
        const arrErrors = errors.array({ onlyFirstError: true })
            .map(err => extractedErrors.push({ [err.param]: err.msg })
            );
        res.status(403).send({ errors: arrErrors })
    }
}

export { validateResults }