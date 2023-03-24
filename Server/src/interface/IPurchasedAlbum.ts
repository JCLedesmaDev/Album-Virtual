import { ObjectId } from "mongoose";
import { IAlbum } from "./IAlbum";
import { IPurchasedFigurine } from "./IPurchasedFigurine";
import { IUser } from "./IUser";

export interface IPurchasedAlbum {
    albumRef: IAlbum; 
    idUser: ObjectId;
    purchasedFigurites: IPurchasedFigurine[];
}
