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
exports.errorHandler = void 0;
const responseMessage_1 = __importDefault(require("../utils/responseMessage"));
const loggerBD_1 = __importDefault(require("../helpers/loggerBD"));
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const requestInfo = {
            headers: req.headers,
            body: req.body,
            params: req.params,
            url: req.url
        };
        yield loggerBD_1.default.insertLoggerDB(req.headers.legajo, // TODO: Cambiar legajo por Id Usuario
        'Error', req.url, requestInfo, Object.assign(Object.assign({}, err), { stack: err.stack }));
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 200).json(responseMessage_1.default.error(err.message));
    }
    catch (error) {
        console.log(error);
        return res.status(200).json(responseMessage_1.default.error('Error interno'));
    }
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map