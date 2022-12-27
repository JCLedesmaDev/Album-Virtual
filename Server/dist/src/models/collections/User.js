"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordSalt: {
        type: String,
        required: true,
        // default: "Soy la descripcion", 
    },
    roles: [{ type: mongoose_1.Types.ObjectId, ref: "Roles" }],
    albumList: [{ type: mongoose_1.Types.ObjectId, ref: "UserAlbumes" }]
}, {
    timestamps: true,
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
});
/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
UserSchema.plugin(mongoose_delete_1.default, { overrideMethods: 'all' });
// Le indicamos a nuestro modelo, que va a poder paginar
UserSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)('Users', UserSchema);
//# sourceMappingURL=User.js.map