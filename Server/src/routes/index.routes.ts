import express from "express";
import UsersRoutes from '../services/users'
import AlbumesRoutes from '../services/albumes'
import FiguritesRoutes from '../services/figurites'
const router = express.Router();

router.use('/albumes', AlbumesRoutes)
router.use('/users', UsersRoutes)
router.use('/figurites', FiguritesRoutes)
// router.use('/albumCollections', FiguritesRoutes)


export default router;