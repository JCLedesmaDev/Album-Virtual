"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (type, message, data) => {
    const res = {
        info: Object.assign({ type: type, msg: message }, (data && {
            data: data
        })),
    };
    // if (data) res.info.data = data
    return res;
};
const warning = (message, data = undefined) => {
    return response('warning', message, data);
};
const info = (message, data = undefined) => {
    return response('info', message, data);
};
const success = (message, data = undefined) => {
    return response('success', message, data);
};
const error = (message, data = undefined) => {
    return response('error', message, data);
};
exports.default = {
    success,
    info,
    warning,
    error
};
//# sourceMappingURL=responseMessage.js.map