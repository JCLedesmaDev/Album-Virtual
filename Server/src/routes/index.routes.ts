import express from "express";
import UsersRoutes from '../services/users'
import AlbumesRoutes from '../services/albumes'
import FiguritesRoutes from '../services/figurites'
import AlbumCollectionRoutes from '../services/albumCollections'
const router = express.Router();

router.use('/albumes', AlbumesRoutes)
router.use('/users', UsersRoutes)
router.use('/figurites', FiguritesRoutes)
router.use('/albumCollections', AlbumCollectionRoutes)


export default router;