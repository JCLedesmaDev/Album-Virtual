import express from "express";
import { loginUser, registerUser } from './controller'
import { validatorLogin, validatorRegister } from './validators/auth'
import { mockHandler } from "../../middlewares/mockHandler";
import { validarJWT } from "../../middlewares/validateJWT";

const router = express.Router();

// router.use(validarJWT)
router.use(mockHandler)

/** 
 * @swagger
 * /login:
 *    post:
 *      tags: [Usuario]  
 *      summary: "Iniciar sesion"
 *      description: Permite que el usuario inicie sesion.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/userLogin"
 *      responses:
 *        '200':
 *          description: Retorna los datos del Usr con el token.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  info:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        example: success
 *                      msg:
 *                        type: string
 *                        example: Ha logueado correctamente
 *                      data:
 *                        type: object
 *                        $ref: "#/components/schemasDto/userAuth"
 *        '400':
 *          description: Error de validacion.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  info:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        example: error
 *                      msg:
 *                        type: string
 *                        example: Ha ocurrido un error
*/
router.post('/login', validatorLogin, loginUser)

/** 
 * @swagger
 * /register:
 *    post:
 *      tags: [Usuario]  
 *      summary: "Registrarse"
 *      description: Permite registrar un usuario.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/userRegister"
 *      responses:
 *        '200':
 *          description: Retorna un mensaje cordial
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  info:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        example: success
 *                      msg:
 *                        type: string
 *                        example: Se ha registrado correctamente!
 *        '400':
 *          description: Error de validacion.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  info:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        example: error
 *                      msg:
 *                        type: string
 *                        example: Ha ocurrido un error
*/
router.post('/register', validatorRegister, registerUser)

export default router 