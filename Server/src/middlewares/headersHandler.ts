import { NextFunction, Request, Response } from "express"

const headersHandler = (req: Request, res: Response, next: NextFunction) => {
    req.locals = {}
    
    const usrToken = (req.headers['authorization']) ? req.headers['authorization'].toString().toUpperCase() : ''
    req.locals.token = usrToken
        
    const mockmode = (req.headers['mockmode'] === 'true') ? 'true' : 'false'
    req.locals.mockmode = mockmode
    
    next()
}
export {
    headersHandler
} 