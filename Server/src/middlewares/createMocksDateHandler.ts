import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";
import collections from "../models/index.models"
import bcrypt from '../utils/bcryptPassword'

const createMocksDateHandler = async (req: Request, res: Response, next: NextFunction) => {

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
            password: await bcrypt.encrypt('administrador'),
            roles: [roles[0]._id] // Rol: Admin
        })        
    }

    next()
}


export { createMocksDateHandler }