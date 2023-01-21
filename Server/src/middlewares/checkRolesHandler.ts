import { Request, Response, NextFunction } from "express"

const checkRolesHandler = (arrayRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    // const { user } = req

    // const rolesByUSer = user.roles // Default: ["user"]

    // const checkValueRol = arrayRoles.some((rolSingle) => rolesByUSer.includes(rolSingle)) // True o False

    // if (!checkValueRol) {
    // error de q el usuario no tiene permisos
    // return res.status(403)
    // }

    next()
}

export {
    checkRolesHandler
} 