import express from "express";
import { createAlbum, getListAlbumes } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { validatorCreateAlbum } from "./validators/createAlbum";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)


router.post('/createAlbum', checkRolesHandler(['Admin']), validatorCreateAlbum,  createAlbum)

/** 
 * Obtener listado de albumes
 * @swagger
 * /api/album/getAllList:
 *    get:
 *      tags: [Albumes]  
 *      summary: "Listado"
 *      description: Este endpoint es para obtener un listado paginado de todos los albumes con sus respectivas figuritas.  
 *      parameters:
 *        - name: page
 *          in: query
 *          description: 'El numero de la pagina a traer'
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
router.get('/getAllList', checkRolesHandler(['Admin', 'User']), getListAlbumes)


export default router