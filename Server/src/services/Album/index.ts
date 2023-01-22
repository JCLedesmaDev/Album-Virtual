import express, { Request, Response } from "express";
import { asdasd } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";

const router = express.Router();

router.use(authHandler)
// router.use(mockHandler)

/** 
 * Obtener albumes
 * @swagger
 * /api/album/:
 *    get:
 *      tags: [album]  
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
router.get('/', checkRolesHandler(['Admin']), asdasd)
// export {...controllers }
export default router

/*
/** 
 * Obtener albumes
 * @swagger
 * /{id}:
 *    get:
 *      tags: [album]  
 *      summary: "Listar AAAAA"
 *      description: Este endpoint es para listar los usuario totales.
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of pet to return
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64    
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
 *      security:
 *       - bearerAuth: []
 */ 