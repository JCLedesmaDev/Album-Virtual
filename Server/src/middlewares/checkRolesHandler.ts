import { Request, Response, NextFunction } from "express"
import { ApplicationError } from "../utils/applicationError"

const checkRolesHandler = (arrayRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rolesByUSer = req.locals.usrRoles 

        const checkValueRol = arrayRoles.some((rolSingle) => {
            return rolesByUSer.some(x => x.name.toLocaleLowerCase() === rolSingle.toLocaleLowerCase())
        })

        if (!checkValueRol) {
            throw new ApplicationError({
                message: 'No tienes los permisos correspondientes para esta peticion.'
            })
        }

        return next()
    } catch (error) {
        next(error)
    }
}

export {
    checkRolesHandler
} 