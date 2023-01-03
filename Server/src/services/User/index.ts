import express from "express";
import { loginUser } from './controller'
import { validatorLogin } from './validators/auth'
import { mockHandler } from "../../middlewares/mockHandler";
import { validarJWT } from "../../middlewares/validateJWT";

const router = express.Router();

// router.use(validarJWT)
router.use(mockHandler)

/** 
 * @swagger
 * /users:
 *    post:
 *      tags: [users]  
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 */
router.post('/login', validatorLogin, loginUser)


export default router 