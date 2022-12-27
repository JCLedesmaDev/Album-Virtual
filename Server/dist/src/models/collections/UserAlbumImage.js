"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserAlbumImageSchema = new mongoose_1.Schema({
    albumImage: { type: mongoose_1.Types.ObjectId, ref: "AlbumImages" },
    user: { type: mongoose_1.Types.ObjectId, ref: "Users" },
    albumId: { type: mongoose_1.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
});
/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
UserAlbumImageSchema.plugin(mongoose_delete_1.default, { overrideMethods: 'all' });
// Le indicamos a nuestro modelo, que va a poder paginar
UserAlbumImageSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)('UserAlbumImages', UserAlbumImageSchema);
//# sourceMappingURL=UserAlbumImage.js.map