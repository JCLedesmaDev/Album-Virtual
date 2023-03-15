import { ObjectId } from "mongoose";

export interface IAlbum {
    id: string;
    title: string;
    image: string;
    idCollection: ObjectId
    // figurites: 
}