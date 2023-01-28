
import { IAlbum } from "../../interface/IAlbum";
import { IAlbumCollection } from "../../models/collections/Albumes";

const singleAlbum = (resource: IAlbumCollection): IAlbum => {
    const mapper: IAlbum = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        // figurites: resource.figurites // TODO: mapear las figuras - genera problema de asincronismo
    }
    return mapper
};

const multipleAlbums = (Albums: IAlbumCollection[]): IAlbum[] => (
    Albums.map(album => singleAlbum(album))
)

export default {
    multipleAlbums
};