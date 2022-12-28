// Aqui llamanos a toads las rutas que contendran loss "services"
//import 'express-async-errors' /// Ver si funciona igual poniendolo solo dentro del Server.ts en vez de cada router

import express from "express";
import UserRoutes from '../services/user'
import AlbumRoutes from '../services/album' //Nota, hace referencia al index de la carpeta "Album" donde tenemos los http definidos
const router = express.Router();



router.use('/album', AlbumRoutes)
router.use('/user', UserRoutes)


export default router;















