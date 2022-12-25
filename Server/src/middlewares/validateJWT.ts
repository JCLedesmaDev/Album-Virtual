import { request, response, Request, Response, NextFunction } from 'express'
// const jwt = require('jsonwebtoken')
// const decryptor = require('simple-encryptor')(Math.PI.toString())
// const config = require('config')
// const errorMsg = 'Su sesión ha expirado'

const validarJWT = (req: Request = request, res: Response = response, next: NextFunction) => {

    // const token = req.header('authorization')

    // try {

    //     if (!token) {
    //         console.log('No se envio el token')
    //         return res.status(401).json({
    //             info: {
    //                 msg: errorMsg,
    //                 type: 'error'
    //             }
    //         })
    //     }

    //     const tokenData = jwt.verify(token, decryptor.decrypt(config.toolboxSecretToken))

    //     if (tokenData.usuario != req.locals.legajo) {

    //         console.log('Token no corresponde al usuario')
    //         return res.status(401).json({
    //             info: {
    //                 msg: errorMsg,
    //                 type: 'error'
    //             }
    //         })
    //     }

    //     next();

    // } catch (error) {
    //     console.log('Error al validar el token', error)
    //     res.status(401).json({
    //         info: {
    //             msg: errorMsg,
    //             type: 'error'
    //         }
    //     })

    // }

}


export {
    validarJWT
}