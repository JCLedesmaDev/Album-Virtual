import { IGetAllAlbumesResponseDto } from "./IGetAllAlbumesResponse.dto";

export interface IGetAllAlbumCollectionResponseDto {
    id: string;
    title: string;
    albumList: IGetAllAlbumesResponseDto[]
}
