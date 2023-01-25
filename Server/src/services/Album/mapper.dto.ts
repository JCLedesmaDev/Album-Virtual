
import { IAlbumCollection } from "../../models/collections/Album";
// import { IAuthDto } from "./dto/backToFront/";


const singleAlbum = (resource: IAlbumCollection) => {
    const mapper = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        // figurites: resource.figurites // TODO: mapear las figuras - genera problema de asincronismo
    }
    return mapper
};

const multipleAlbums = (Albums: IAlbumCollection[]) => (
    Albums.map(album => singleAlbum(album))
)

export default {
    multipleAlbums
};