"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const logic_1 = __importDefault(require("./logic"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    // TODO: Especificar el tipo de dato que es payload
    req.locals.params = req.body; // Se utiliza en el eventHandler
    const payload = (0, express_validator_1.matchedData)(req);
    const data = yield logic_1.default.loginUser(payload);
    req.locals.result = data; // Se utiliza en el eventHandler
    res.json(data);
    next();
});
exports.loginUser = loginUser;
//# sourceMappingURL=controller.js.map