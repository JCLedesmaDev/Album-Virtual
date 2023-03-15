
import { ObjectId } from "mongoose";
import { IAlbum } from "../../interface/IAlbum";
import { IAlbumCollectionSchema } from "../../models/collections/AlbumCollections";
import { IAlbumSchema } from "../../models/collections/Albumes";

const singleAlbum = (resource: IAlbumSchema): IAlbum => {
    const mapper: IAlbum = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        idCollection: resource.albumCollections as ObjectId
        // figurites: resource.figurites // TODO: mapear las figuras - genera problema de asincronismo
    }
    return mapper
};

const multipleAlbums = (Albums: IAlbumSchema[]): IAlbum[] => (
    Albums.map(album => singleAlbum(album))
)

export default {
    multipleAlbums
};