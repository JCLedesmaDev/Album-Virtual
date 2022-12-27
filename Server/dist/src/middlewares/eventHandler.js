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
exports.eventHandler = void 0;
const loggerBD_1 = __importDefault(require("../helpers/loggerBD"));
const eventHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requestInfo = {
        headers: req.headers,
        body: req.body,
        params: req.params,
        url: req.url
    };
    yield loggerBD_1.default.insertLoggerDB(req.headers.legajo, /// TODO: Cambiar legajo por Id Usuario
    'Evento', req.url, requestInfo, (_a = res.locals.result) !== null && _a !== void 0 ? _a : '');
    next();
});
exports.eventHandler = eventHandler;
//# sourceMappingURL=eventHandler.js.map