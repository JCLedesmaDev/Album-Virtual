import { Request, Response, NextFunction } from "express"
import { ApplicationError } from "../utils/applicationError"

const checkRolesHandler = (arrayRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rolesByUSer = req.locals.usrRoles // Default: ["user"]

        const checkValueRol = arrayRoles.some((rolSingle) => {
            rolesByUSer.some(x => x.name === rolSingle)
        })

        if (!checkValueRol) {
            throw new ApplicationError({
                message: 'No tienes los permisos correspondientes para esta peticion.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export {
    checkRolesHandler
} 