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
const index_models_1 = __importDefault(require("../models/index.models"));
const insertLoggerDB = (usuarioId, tipo, feacture, request, response, fecha = new Date()) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_models_1.default.RegisterDb.create({
        type: tipo,
        user: usuarioId,
        feacture: feacture,
        date: fecha,
        request: request,
        response: response,
    });
});
exports.default = {
    insertLoggerDB
};
//# sourceMappingURL=loggerBD.js.map