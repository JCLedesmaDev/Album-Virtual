"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headersHandler = void 0;
const headersHandler = (req, res, next) => {
    req.locals = {};
    const origen = (req.headers['ismobile'] === 'true') ? 'mobile' : 'web';
    req.locals.origen = origen;
    const legajo = (req.headers['legajo']) ? req.headers['legajo'].toString().toUpperCase() : '';
    const legajoCSG = (req.headers['legajocsg']) ? req.headers['legajocsg'].toString().toUpperCase() : '';
    const user = (legajoCSG != '') ? legajoCSG : legajo;
    req.locals.legajo = user;
    const id = (req.headers['id']) ? req.headers['id'].toString().toUpperCase() : undefined;
    req.locals.id = id;
    const mockmode = (req.headers['mockmode'] === 'true') ? 'true' : 'false';
    req.locals.mockmode = mockmode;
    const nombre = (req.headers['nombre']) ? req.headers['nombre'] : undefined;
    req.locals.nombre = nombre;
    const apellido = (req.headers['apellido']) ? req.headers['apellido'] : undefined;
    req.locals.apellido = apellido;
    console.log('Headers:' + JSON.stringify(req.locals));
    next();
};
exports.headersHandler = headersHandler;
//# sourceMappingURL=headersHandler.js.map