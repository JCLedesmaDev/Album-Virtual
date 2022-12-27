"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = void 0;
const express_validator_1 = require("express-validator");
const validateResults = (req, res, next) => {
    try {
        // Valida los datos que se estan enviando y si no cumple con las condiciones
        // el .throw() forza que se vaya todo al catch
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (error) {
        const errors = (0, express_validator_1.validationResult)(req);
        const extractedErrors = [];
        const arrErrors = errors.array({ onlyFirstError: true })
            .map(err => extractedErrors.push({ [err.param]: err.msg }));
        res.status(403).send({ errors: arrErrors });
    }
};
exports.validateResults = validateResults;
//# sourceMappingURL=validatorExpressHandler.js.map