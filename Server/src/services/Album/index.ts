import express from "express";
import { createAlbum, getListAlbumes } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { validatorCreateAlbum } from "./validators/createAlbum";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)

/** 
 * @swagger
 * /api/album/createAlbum:
 *    post:
 *      tags: [Albumes]  
 *      summary: "Crear un nuevo Album"
 *      description: Este endpoint es para crear un Album.  
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/createAlbumData" 
 *      responses:
 *        '200':
 *          description: .
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/createAlbumSuccess"
 *        '400':
 *          description: .
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/createAlbumError"
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.post('/createAlbum', checkRolesHandler(['Admin']), validatorCreateAlbum,  createAlbum)

/** 
 * @swagger
 * /api/album/getAllList:
 *    get:
 *      tags: [Albumes]  
 *      summary: "Obtener listado de albumes"
 *      description: Este endpoint es para obtener un listado paginado de todos los albumes con sus respectivas figuritas.  
 *      parameters:
 *        - name: page
 *          in: query
 *          description: 'El numero de la pagina a traer'
 *          required: false
 *          schema:
 *            type: integer
 *            format: int64   
 *        - name: filterText
 *          in: query
 *          description: 'Texto por el cual se filtraran los albumes'
 *          required: false
 *          schema:
 *            type: string 
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