import express from "express";
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { createCollection, deleteCollection, getAllCollection, updateCollection } from "./controller";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)


router.post('/createCollection', checkRolesHandler(), validatorCreateAlbum, createCollection)

router.get('/getAllCollection', checkRolesHandler(['User']), getAllCollection)

router.delete('/deleteCollection/:id', checkRolesHandler(), validatorDeleteAlbum, deleteCollection)

router.put('/updateCollection/:id', checkRolesHandler(), validatorUpdateAlbum, updateCollection)


export default router