import { IAlbumModels } from "../../interface/models/IAlbum.models";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { IFigurineModels } from "../../interface/models/IFigurine.models";
import { IGetAllAlbumCollectionResponseDto } from "./interface/backToFront/IGetAllAlbumCollectionResponse.dto";
import { IGetAllAlbumesResponseDto } from "./interface/backToFront/IGetAllAlbumesResponse.dto";
import { IGetAllFiguritesResponseDto } from "./interface/backToFront/IGetAllFiguritesResponse.dto";


/// Collections
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
        albumList: multipleAlbumes(albumCollection.albumList as IGetAllAlbumesResponseDto[])
    };
    return formattedAlbumsCollection;
};


/// Albumes
export const multipleAlbumes = (albumList: IGetAllAlbumesResponseDto[]): IAlbumModels[] => {
    const albumesMapper: IAlbumModels[] = albumList.map(album => {
        return singleAlbumesMapper(album)
    })
    return albumesMapper
}

const singleAlbumesMapper = (album: IGetAllAlbumesResponseDto): IAlbumModels => {
    const formattedAlbums: IAlbumModels = {
        id: album.id,
        image: album.image,
        title: album.title,
        idCollection: album.idCollection,
        figurites: multipleFiguritas(album.figurites as IGetAllFiguritesResponseDto[])
    }
    return formattedAlbums;
};



/// Figuras
export const multipleFiguritas = (figuritas: IGetAllFiguritesResponseDto[]): IFigurineModels[] => {
    const figurineMapper: IFigurineModels[] = figuritas.map(figurine => {
        return singleFiguritasMapper(figurine)
    })
    return figurineMapper
}

const singleFiguritasMapper = (figurine: IGetAllFiguritesResponseDto): IFigurineModels => {
    const formattedAlbums: IFigurineModels = {
        id: figurine.id,
        image: figurine.image,
        title: figurine.title,
        idAlbum: figurine.idAlbum,
    }
    return formattedAlbums;
};




