// Aqui llamanos a toads las rutas que contendran loss "services"
import express from "express";
import AlbumRoutes from '../services/Album' //Nota, hace referencia al index de la carpeta "Album" donde tenemos los http definidos
const router = express.Router();



router.use('/album', AlbumRoutes)


export default router;















