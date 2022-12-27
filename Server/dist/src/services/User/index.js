"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = require("./Validators/auth");
const mockHandler_1 = require("../../middlewares/mockHandler");
const validateJWT_1 = require("../../middlewares/validateJWT");
const errorHandler_1 = require("../../middlewares/errorHandler");
const eventHandler_1 = require("../../middlewares/eventHandler");
const router = express_1.default.Router();
require("express-async-errors"); /// Ver si funciona igual poniendolo solo dentro del Server.ts en vez de cada router
router.use(validateJWT_1.validarJWT);
router.use(mockHandler_1.mockHandler);
router.post('/login', auth_1.validatorLogin, controller_1.loginUser);
router.use(eventHandler_1.eventHandler);
router.use(errorHandler_1.errorHandler);
exports.default = router;
//# sourceMappingURL=index.js.map