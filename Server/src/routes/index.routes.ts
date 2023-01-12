import express from "express";
import UserRoutes from '../services/user'
import AlbumRoutes from '../services/album' //Nota, hace referencia al index de la carpeta "Album" donde tenemos los http definidos

const router = express.Router();

router.use('/album', AlbumRoutes)
router.use('/user', UserRoutes)


export default router;