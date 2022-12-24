import express from "express";
const router = express.Router();
import { loginUser } from './controller'
import {validatorLogin} from './Validators/auth'

// TOOD: Aplicar middlewares de Teco.


router.post('/login', validatorLogin, loginUser)


export default router 