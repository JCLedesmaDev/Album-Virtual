import { IPurchasedAlbumModels } from "../../models/IPurchasedAlbum.models";
import { IPurchasedFigurineModels } from "../../models/IPurchasedFigurine.models";
import { multipleFiguritas, singleAlbumesMapper, singleFiguritasMapper } from "../administration/mappers";
import { IGetAllPurchasedAlbumesResponseDto, purchasedFigurites } from "./interface/backToFront/IGetAllPurchasedAlbumesResponse.dto";

export const multiplePurchasedAlbumes = (purchasedAlbumes: IGetAllPurchasedAlbumesResponseDto[]): IPurchasedAlbumModels[] => {
    const albumesMapper: IPurchasedAlbumModels[] = purchasedAlbumes.map(purchasedAlbum => {
        return singlePurchasedAlbumesMapper(purchasedAlbum)
    })
    return albumesMapper
}

const singlePurchasedAlbumesMapper = (purchasedAlbum: IGetAllPurchasedAlbumesResponseDto): IPurchasedAlbumModels => {
    const formattedAlbums: IPurchasedAlbumModels = {
        id: purchasedAlbum.id,
        albumRef: singleAlbumesMapper(purchasedAlbum.albumRef),
        idUser: purchasedAlbum.idUser,
        purchasedFigurites: multiplePurchasedFigurites(purchasedAlbum.purchasedFigurites)
    }
    return formattedAlbums;
};

const multiplePurchasedFigurites = (purchasedAlbumes: purchasedFigurites[]): IPurchasedFigurineModels[] => {
    const albumesMapper: IPurchasedFigurineModels[] = purchasedAlbumes.map(purchasedAlbum => {
        return singlePurchasedFigurineMapper(purchasedAlbum)
    })
    return albumesMapper
}


const singlePurchasedFigurineMapper = (purchasedFigurine: purchasedFigurites): IPurchasedFigurineModels => {
    const formattedAlbums: IPurchasedFigurineModels = {
        id: purchasedFigurine.id,
        figurineRef: singleFiguritasMapper(purchasedFigurine.figurineRef),
        idPurchasedAlbum: purchasedFigurine.idPurchasedAlbum
    }
    return formattedAlbums;
};

