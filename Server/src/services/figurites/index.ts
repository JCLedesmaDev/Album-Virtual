import express from 'express'
import { authHandler } from '../../middlewares/authHandler'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from '../../middlewares/mockHandler'
import { createFigurine, deleteFigurine, updateFigurine } from './controller'
import { validatorCreateFigurine } from './validators/createFigurites'
import { validatorDeleteFigurine } from './validators/deleteFigurites'
import { validatorUpdateFigurine } from './validators/updateFigurine'

const router = express.Router()

router.use(authHandler)
router.use(mockHandler)

router.post('/createFigurine', checkRolesHandler(['User']), validatorCreateFigurine, createFigurine)

// router.get('/getAllList', checkRolesHandler(['User']), getAllList)

router.put('/updateFigurites/:id', checkRolesHandler(), validatorUpdateFigurine, updateFigurine)

router.delete('/deleteFigurites/:id', checkRolesHandler(), validatorDeleteFigurine, deleteFigurine)

// router.post('/buyFigurites', checkRolesHandler(['User']), validatorBuyAlbum, buyFigurites)

export default router