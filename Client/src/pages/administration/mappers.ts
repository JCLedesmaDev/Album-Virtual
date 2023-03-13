import { IAlbumModels } from "../../interface/models/IAlbum.models";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { IAlbumResponseDto, IGetAllAlbumCollectionResponseDto } from "./interface/backToFront/IGetAllAlbumCollectionResponse.dto";



export const multipleAlbumCollectionMapper = (albumCollections: IGetAllAlbumCollectionResponseDto[]): IAlbumCollectionModels[] => {
    const albumsCollectionsMapper: IAlbumCollectionModels[] = albumCollections.map(albumCollection => {
        return singleAlbumCollectionMapper(albumCollection)
    })
    return albumsCollectionsMapper
}


const singleAlbumCollectionMapper = (albumCollection: IGetAllAlbumCollectionResponseDto): IAlbumCollectionModels => {
    const formattedAlbumsCollection: IAlbumCollectionModels = {
        title: albumCollection.title,
        id: albumCollection.id,
        albumList: multipleAlbumes(albumCollection.albumList as IAlbumResponseDto[])
    };
    return formattedAlbumsCollection;
};

const multipleAlbumes = (albumList: IAlbumResponseDto[]): IAlbumModels[] => {
    const albumesMapper: IAlbumModels[] = albumList.map(album => {
        return {
            id: album.id,
            image: album.image,
            title: album.title,
        }
    })
    return albumesMapper
} 