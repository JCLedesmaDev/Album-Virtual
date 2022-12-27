"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    // constructor(message: string, source: ISource = {} as ISource) {
    constructor(message, source = undefined) {
        var _a, _b;
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'Algo salio mal';
        this.status = 200;
        if (source)
            this.source = {
                message: (_a = source.message) !== null && _a !== void 0 ? _a : source,
                stack: (_b = source.stack) !== null && _b !== void 0 ? _b : 'No tiene stack porque no es un objecto error',
            };
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=applicationError.js.map