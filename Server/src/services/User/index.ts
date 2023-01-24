import express from "express";
import { loginUser, registerUser } from './controller'
import { validatorLogin } from './validators/login'
import { validatorRegister } from './validators/register'
import { mockHandler } from "../../middlewares/mockHandler";

const router = express.Router();

router.use(mockHandler)

/** 
 * @swagger
 * /api/user/login:
 *    post:
 *      tags: [Usuario]  
 *      summary: "Iniciar sesion"
 *      description: Permite que el usuario inicie sesion.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/loginData"
 *      responses:
 *        '200':
 *          description: Retorna los datos del Usr con el token.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/loginSuccess"
 *        '400':
 *          description: Error de validacion.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/loginError"
*/
router.post('/login', validatorLogin, loginUser)

/** 
 * @swagger
 * /api/user/register:
 *    post:
 *      tags: [Usuario]  
 *      summary: "Registrarse"
 *      description: Permite registrar un usuario.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/registerData"
 *      responses:
 *        '200':
 *          description: Retorna un mensaje cordial
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/registerSuccess"
 *        '400':
 *          description: Error de validacion.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/registerError"
*/
router.post('/register', validatorRegister, registerUser)

export default router 