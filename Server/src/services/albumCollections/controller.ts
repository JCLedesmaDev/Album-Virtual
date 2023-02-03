import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPagination } from "../../interface/IPagination"
import logic from './logic'

const createCollection = async (req: Request, res: Response, next: NextFunction) => {
}
const getAllCollection = async (req: Request, res: Response, next: NextFunction) => {
}
const deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
}
const updateCollection = async (req: Request, res: Response, next: NextFunction) => {
}

export {
    createCollection, 
    getAllCollection, 
    deleteCollection,
    updateCollection
}