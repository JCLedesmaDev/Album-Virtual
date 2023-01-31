import express from 'express'
import { authHandler } from '../../middlewares/authHandler'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from '../../middlewares/mockHandler'
import { validatorCreateFigurites } from './validators/createFigurites'

const router = express.Router()

router.use(authHandler)
router.use(mockHandler)



router.post('/createFigurites', checkRolesHandler(['User']), validatorCreateFigurites, createFigurites)

// router.get('/getAllList', checkRolesHandler(['User']), getAllList)

// router.put('/updateFigurites/:id', checkRolesHandler(), validatorUpdateAlbum, updateFigurites)

// router.delete('/deleteFigurites/:id', checkRolesHandler(), validatorDeleteAlbum, deleteFigurites)


// router.post('/buyFigurites', checkRolesHandler(['User']), validatorBuyAlbum, buyFigurites)


export default router