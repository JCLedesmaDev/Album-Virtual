import { Request, Response, NextFunction } from "express"

const asdasd = async (req: Request, res: Response, next: NextFunction) => {
    res.json({asd: "PASO X ACA"})
    req.locals.finished = true
    return next()
}

export {
    asdasd
}