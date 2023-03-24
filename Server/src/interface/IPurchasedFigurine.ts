import { ObjectId } from "mongoose";
import { IFigurine } from "./IFigurine";

export interface IPurchasedFigurine {
    figurineRef: IFigurine;
    idPurchasedAlbum: ObjectId;
}
