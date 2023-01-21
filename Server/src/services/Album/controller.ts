import { Request, Response, NextFunction } from "express"

const asdasd = async (req: Request, res: Response, next: NextFunction) => {
    res.send("PASO X ACA")
    next()
}

export {
    asdasd
}