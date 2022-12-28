import express from "express";
import { loginUser } from './controller'
import { validatorLogin } from './validators/auth'
import { mockHandler } from "../../middlewares/mockHandler";
import { validarJWT } from "../../middlewares/validateJWT";

const router = express.Router();

// router.use(validarJWT)
router.use(mockHandler)

router.post('/login', validatorLogin, loginUser)


export default router 