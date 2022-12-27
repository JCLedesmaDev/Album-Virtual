"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorLogin = exports.validatorRegister = void 0;
const express_validator_1 = require("express-validator");
const validatorExpressHandler_1 = require("../../../middlewares/validatorExpressHandler");
const validatorRegister = [
    // check("name").exists().notEmpty().isLength({ max: 99, min: 3 }),
    // check("age").exists().notEmpty().isNumeric(),
    // check("password").exists().notEmpty().isLength({ max: 15, min: 3 }),
    // check("email").exists().notEmpty().isEmail(),
    // check("role").exists().notEmpty(),
    (req, res, next) => (0, validatorExpressHandler_1.validateResults)(req, res, next)
];
exports.validatorRegister = validatorRegister;
const validatorLogin = [
    (0, express_validator_1.check)("email").exists().notEmpty().isEmail(),
    (0, express_validator_1.check)("password").exists().notEmpty().isLength({ max: 15, min: 3 }),
    (req, res, next) => (0, validatorExpressHandler_1.validateResults)(req, res, next)
];
exports.validatorLogin = validatorLogin;
//# sourceMappingURL=auth.js.map