// import 'express-async-errors' /// Ver si funciona igual poniendolo solo dentro del Server.ts en vez de cada router
import express from "express";
import { loginUser } from './controller'
import { validatorLogin } from './Validators/auth'
import { mockHandler } from "../../middlewares/mockHandler";
import { validarJWT } from "../../middlewares/validateJWT";
// import { errorHandler } from "../../middlewares/errorHandler";
import { eventHandler } from "../../middlewares/eventHandler";

const router = express.Router();

router.use(validarJWT)
router.use(mockHandler)

router.post('/login', validatorLogin, loginUser)


router.use(eventHandler)
// router.use(errorHandler)

export default router 