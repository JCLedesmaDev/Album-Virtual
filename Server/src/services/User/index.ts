import express from "express";
import { loginUser } from './controller'
import { validatorLogin } from './validators/auth'
import { mockHandler } from "../../middlewares/mockHandler";
import { validarJWT } from "../../middlewares/validateJWT";

const router = express.Router();

// router.use(validarJWT)
router.use(mockHandler)

// Definimos la estructura del metodo para que aparezca en el Swagger
/// La manera de definir todo esta en: https://editor.swagger.io
/** 
 * Post track
 * @openapi // @swagger
 * /users:
 *    post //Van los metodos http
 *      tags:
 *        - users  // Etiqueta de menu en el que se va agrupar el controller
 *      summary: "Listar usuario" // Nombre del metodo 
 *      description: Este endpoint es para listar los usuario totales 
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
 *      security: // determina que el controller necesita de autorizacion, el mismo de swagger.ts > securitySchemes
 *       - bearerAuth: []
 */
router.post('/login', validatorLogin, loginUser)


export default router 