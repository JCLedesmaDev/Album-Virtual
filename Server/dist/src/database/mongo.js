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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DB_URI = process.env.DB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
(0, mongoose_1.set)('strictQuery', false);
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, mongoose_1.connect)(DB_URI, options, ({ err, res }) => {
        if (!err) {
            console.log("CONEXION CORRECTA");
        }
        else {
            console.log("ERROR DE CONEXION", err);
        }
    });
});
exports.default = dbConnect;
//# sourceMappingURL=mongo.js.map