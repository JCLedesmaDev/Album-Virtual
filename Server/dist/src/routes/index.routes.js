"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Aqui llamanos a toads las rutas que contendran loss "services"
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../services/User"));
const Album_1 = __importDefault(require("../services/Album")); //Nota, hace referencia al index de la carpeta "Album" donde tenemos los http definidos
const router = express_1.default.Router();
router.use('/album', Album_1.default);
router.use('/auth', User_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map