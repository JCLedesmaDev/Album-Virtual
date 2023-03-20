import { Request, Response, NextFunction } from "express"
import collections from "../models/index.models"
import { ApplicationError } from "../utils/applicationError";
import bcrypt from '../utils/bcryptPassword'
import config from 'config'

const createMocksDateHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await collections.Roles.find({});
        if (roles.length === 0) {
            await collections.Roles.insertMany([
                { name: "Admin" }, { name: "User" }
            ])
        }
    
        const userAdmin = await collections.Users.findOne({email: 'admin@gmail.com'})
        if (userAdmin === null) {
            await collections.Users.create({
                email: 'admin@gmail.com',
                fullName: 'Administrador',
                password: await bcrypt.encrypt(config.util.getEnv("password_admin")),
                roles: [roles[0]._id] // Rol: Admin
            })        
        }
    
        next()
    } catch (error) {
        next(new ApplicationError({message: 'Ocurrio un error al crear los datos por default', source: error}))
    }
}


export { createMocksDateHandler }