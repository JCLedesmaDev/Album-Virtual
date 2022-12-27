"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RolSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
});
exports.default = (0, mongoose_1.model)('Roles', RolSchema);
//# sourceMappingURL=Rol.js.map