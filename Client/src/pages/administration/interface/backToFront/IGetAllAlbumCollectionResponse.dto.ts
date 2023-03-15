export interface IGetAllAlbumCollectionResponseDto {
    id: string;
    title: string;
    albumList: IAlbumResponseDto[]
}

export interface IAlbumResponseDto {
    id: string;
    title: string;
    image: string;
    idCollection: string;
    figurites: any
}