"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const express_1 = require("express");
// const jwt = require('jsonwebtoken')
// const decryptor = require('simple-encryptor')(Math.PI.toString())
// const config = require('config')
// const errorMsg = 'Su sesión ha expirado'
const validarJWT = (req = express_1.request, res = express_1.response, next) => {
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
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validateJWT.js.map