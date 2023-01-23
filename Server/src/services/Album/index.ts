import express from "express";
import { getListAlbumes } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)

/** 
 * Obtener listado de albumes
 * @swagger
 * /api/album/getAllList/{page}:
 *    get:
 *      tags: [Albumes]  
 *      summary: "Listado"
 *      description: Este endpoint es para obtener un listado paginado de todos los albumes con sus respectivas figuritas.  
 *      parameters:
 *        - name: page
 *          in: path
 *          description: El numero de la pagina a traer
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64  
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.get('/getAllList/:page', checkRolesHandler(['Admin', 'User']), getListAlbumes)


export default router