import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { apiSrv } from "../../utils/apiSrv";
import { ICreateAlbumDto } from "./interface/frontToBack/ICreateAlbum.dto";
import { ICreateCollectionDto } from "./interface/frontToBack/ICreateCollection.dto";
import { ICreateFigurineDto } from "./interface/frontToBack/ICreateFigurine.dto";
import { IUpdateAlbumDto } from "./interface/frontToBack/IUpdateAlbum.dto";
import { IUpdateCollectionDto } from "./interface/frontToBack/IUpdateCollection.dto";
import { IUpdateFigurineDto } from "./interface/frontToBack/IUpdateFigurine.dto";


interface IStore {
    actions: {
        //Collection
        createCollection: (payload: ICreateCollectionDto) => Promise<boolean>,
        deleteCollection: (idCollection: string) => Promise<boolean>,
        updateCollection: (payload: IUpdateCollectionDto) => Promise<boolean>,

        // //Albumes
        createAlbum: (payload: ICreateAlbumDto) => Promise<boolean>,
        deleteAlbum: (idCollection: string) => Promise<boolean>,
        updateAlbum: (payload: IUpdateAlbumDto) => Promise<boolean>,

        // //Figurites
        createFigurine: (payload: ICreateFigurineDto) => Promise<boolean>,
        deleteFigurine: (idAlbum: string) => Promise<boolean>,
        updateFigurine: (payload: IUpdateFigurineDto) => Promise<boolean>,
    }
}

const store = create<IStore>((set, get) => ({
    actions: {
        createCollection: async (payload: ICreateCollectionDto) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumCollections/createCollection`,
                    data: payload
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        deleteCollection: async (idCollection: string) => {
            let flagIsDelete = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'DELETE',
                    path: `/albumCollections/deleteCollection/${idCollection}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsDelete
            flagIsDelete = true

            return flagIsDelete
        },
        updateCollection: async (payload: IUpdateCollectionDto) => {

            const { title, id } = payload
            let flagIsUpdate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'PUT',
                    path: `/albumCollections/updateCollection/${id}`,
                    data: { title }
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsUpdate
            flagIsUpdate = true

            return flagIsUpdate
        },


        createAlbum: async (payload: ICreateAlbumDto) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumes/createAlbum`,
                    data: payload
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        deleteAlbum: async (idAlbum: string) => {
            let flagIsDelete = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'DELETE',
                    path: `/albumes/deleteAlbum/${idAlbum}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsDelete
            flagIsDelete = true

            return flagIsDelete
        },
        updateAlbum: async (payload: IUpdateAlbumDto) => {

            const { title, idCollection, image, id } = payload
            let flagIsUpdate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'PUT',
                    path: `/albumes/updateAlbum/${id}`,
                    data: { title, idCollection, image }
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsUpdate
            flagIsUpdate = true

            return flagIsUpdate
        },


        createFigurine: async (payload: ICreateFigurineDto) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/figurites/createFigurine`,
                    data: payload
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        deleteFigurine: async (idFigurine: string) => {
            let flagIsDelete = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'DELETE',
                    path: `/figurites/deleteFigurine/${idFigurine}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsDelete
            flagIsDelete = true

            return flagIsDelete
        },
        updateFigurine: async (payload: IUpdateFigurineDto) => {

            const { title, idAlbum, image, id } = payload
            let flagIsUpdate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'PUT',
                    path: `/figurites/updateFigurine/${id}`,
                    data: { title, idAlbum, image }
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsUpdate
            flagIsUpdate = true

            return flagIsUpdate
        }
    }

}))


// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAdministrationStore = () => ({ ...store((state) => (state), shallow) })
export default store
