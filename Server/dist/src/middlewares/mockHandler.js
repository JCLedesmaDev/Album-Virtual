"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockHandler = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/* Para utilizar este middle, debemos tener dentro del servicio, una carpeta llamada mocks y dentro un archivo con el mismo nombre
   de la ruta del controller del cual queremos mockear los datos,
    Ejem.: mocks/obtenerUsuario.json y tendremos  router.post('/obtenerUsuario', ....)
    Enviar dentro del header un 'mockmode' == true
   */
const mockHandler = (req, res, next) => {
    if (req.headers.mockmode === 'true') {
        console.log('req.originalUrl: 👉', req.originalUrl);
        const splitArr = req.originalUrl.split('/');
        console.log('Original Url Array => ', splitArr);
        const functionality = splitArr[2];
        let tool = '';
        let method;
        if (splitArr[4]) {
            tool = '/' + splitArr[3];
            method = splitArr[4];
        }
        else {
            method = splitArr[3];
        }
        console.log('tool:', tool);
        console.log('method:', method);
        const ruta = `../routes/${functionality}${tool}/mocks/${method}.json`;
        const filePath = path_1.default.join(__dirname, ruta);
        console.log('Final Path => ', filePath);
        if (!fs_1.default.existsSync(filePath))
            return next();
        const data = fs_1.default.readFileSync(filePath).toString();
        res.status(200).json(JSON.parse(data));
    }
    else {
        next();
    }
};
exports.mockHandler = mockHandler;
//# sourceMappingURL=mockHandler.js.map