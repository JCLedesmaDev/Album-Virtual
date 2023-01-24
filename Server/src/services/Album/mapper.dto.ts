
import { IAlbumCollection } from "../../models/collections/Album";
// import { IAuthDto } from "./dto/backToFront/";


const singleAlbum = async (resource: IAlbumCollection) => {
    const mapper = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        figurites: resource.figurites // TODO: mapear las figuras
    }
    return mapper
};

const multipleAlbums = (Albums: IAlbumCollection[]) => {
    const albumsMapper = Albums.map(album => singleAlbum(album))
    return albumsMapper
}

export default {
    multipleAlbums
};