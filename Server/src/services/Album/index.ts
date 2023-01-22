import express from "express";
import { asdasd } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)

/** 
 * Obtener albumes
 * @swagger
 * /api/album/:
 *    get:
 *      tags: [Albumes]  
 *      summary: "Listar AAAAA"
 *      description: Este endpoint es para listar los usuario totales.  
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.get('/', checkRolesHandler(['Admin', 'User']), asdasd)


export default router