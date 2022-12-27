"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const RegisterDbSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    user: { type: String, required: true },
    feacture: { type: String, required: true },
    date: { type: Date, required: true },
    request: { type: String, required: true },
    response: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
});
// Le indicamos a nuestro modelo, que va a poder paginar
RegisterDbSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)('RegisterDb', RegisterDbSchema);
//# sourceMappingURL=RegisterBD.js.map