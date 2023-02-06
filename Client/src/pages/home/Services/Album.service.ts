
import { IColeccionData } from "../../../Interface/DTO Back/ColeccionAlbum/IColeccionAlbumData";
import { IPagination } from "../../../Interface/DTO Back/IPagination";
import { IResponseDTO } from "../../../Interface/DTO Back/IResponseDTO";
import { IDataAlbumSend } from "../../../interface/DTO Front/Album/IDataAlbumSend";
import { axiosMethod } from "../../../Utils/axiosMethod";

const AlbumService = {

    GetAllColeccionAlbumes: async (page: number, query?: string): Promise<IResponseDTO<IPagination<IColeccionData[]>>> => {
        
        let url = `/albumCollections/GetAllPage/${page}/${query}`

        const Response = await axiosMethod<IPagination<IColeccionData[]>>({
            method: "GET",
            url: url
        });

        return {
            Result: Response.Result,
            MessageError: Response.MessageError
        };
        
    },

    buyAlbum: async (dataAlbum: IDataAlbumSend) => {
        const Response = await axiosMethod<string>({
            method: "POST",
            url: `/albumes/buyAlbum`,
            dataSend: dataAlbum
        });

        return {
            Result: Response.Result,
            MessageError: Response.MessageError
        };
    }

}

export default AlbumService; 