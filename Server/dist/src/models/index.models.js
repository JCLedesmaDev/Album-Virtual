"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Album_1 = __importDefault(require("./collections/Album"));
const UserAlbumImage_1 = __importDefault(require("./collections/UserAlbumImage"));
const AlbumImage_1 = __importDefault(require("./collections/AlbumImage"));
const CollectionAlbum_1 = __importDefault(require("./collections/CollectionAlbum"));
const User_1 = __importDefault(require("./collections/User"));
const UserAlbum_1 = __importDefault(require("./collections/UserAlbum"));
const Rol_1 = __importDefault(require("./collections/Rol"));
const RegisterBD_1 = __importDefault(require("./collections/RegisterBD"));
const collections = {
    Albumes: Album_1.default,
    UserAlbumImages: UserAlbumImage_1.default,
    AlbumImages: AlbumImage_1.default,
    CollectionAlbumes: CollectionAlbum_1.default,
    Users: User_1.default,
    Roles: Rol_1.default,
    UserAlbumes: UserAlbum_1.default,
    RegisterDb: RegisterBD_1.default
};
exports.default = collections;
//# sourceMappingURL=index.models.js.map