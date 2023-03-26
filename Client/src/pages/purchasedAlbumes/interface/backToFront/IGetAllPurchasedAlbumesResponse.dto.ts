import { IAlbumModels } from "../../../../models/IAlbum.models";
import { IGetAllFiguritesResponseDto } from "../../../administration/interface/backToFront/IGetAllFiguritesResponse.dto";

export interface IGetAllPurchasedAlbumesResponseDto {
    id: string;
    albumRef: IAlbumModels;
    idUser: string;
    purchasedFigurites: purchasedFigurites[];
}


export interface purchasedFigurites {
    id: string;
    figurineRef: IGetAllFiguritesResponseDto
    idPurchasedAlbum: string
}