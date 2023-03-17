
import { ObjectId } from "mongoose";
import { IAlbum } from "../../interface/IAlbum";
import { IFigurine } from "../../interface/IFigurine";
import { IAlbumCollectionSchema } from "../../models/collections/AlbumCollections";
import { IAlbumSchema } from "../../models/collections/Albumes";
import { IFigurineSchema } from "../../models/collections/Figurites";

const singleAlbum = (resource: IAlbumSchema): IAlbum => {
    const mapper: IAlbum = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        idCollection: resource.albumCollections as ObjectId,
        figurites: multlipeFigures(resource.figurites as IFigurineSchema[])
    }
    return mapper
};


const multlipeFigures = (figurites: IFigurineSchema[]): IFigurine[] => {
    const mapper = figurites.map((figurine: IFigurineSchema) => {
        const mapper: IFigurine = {
            album: figurine.album as ObjectId,
            image: figurine.image,
            title: figurine.title
        }
        return mapper
    })
    return mapper
}

const multipleAlbums = (Albums: IAlbumSchema[]): IAlbum[] => (
    Albums.map(album => singleAlbum(album))
)

export default {
    multipleAlbums
};