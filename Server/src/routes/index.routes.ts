import express from "express";
import UsersRoutes from '../services/users'
import AlbumesRoutes from '../services/albumes' //Nota, hace referencia al index de la carpeta "Album" donde tenemos los http definidos

const router = express.Router();

router.use('/albumes', AlbumesRoutes)
router.use('/users', UsersRoutes)


export default router;