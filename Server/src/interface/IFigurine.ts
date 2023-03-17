import { ObjectId } from "mongoose";
import { IAlbum } from "./IAlbum";

export interface IFigurine {
    title: string;
    image: string;
    album: ObjectId
}