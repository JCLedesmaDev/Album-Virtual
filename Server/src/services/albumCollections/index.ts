import express from "express";
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)


router.post('/createCollection', checkRolesHandler(), validatorCreateAlbum, createAlbum)

router.get('/getAllCollection', checkRolesHandler(['User']), getListAlbumes)

router.delete('/deleteCollection/:id', checkRolesHandler(), validatorDeleteAlbum, deleteAlbum)

router.put('/updateCollection/:id', checkRolesHandler(), validatorUpdateAlbum, updateAlbum)


export default router