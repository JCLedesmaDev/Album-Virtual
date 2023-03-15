import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { apiSrv } from "../../utils/apiSrv";
import { ICreateAlbumDto } from "./interface/frontToBack/ICreateAlbum.dto";
import { ICreateCollectionDto } from "./interface/frontToBack/ICreateCollection.dto";
import { IUpdateAlbumDto } from "./interface/frontToBack/IUpdateAlbum.dto";
import { IUpdateCollectionDto } from "./interface/frontToBack/IUpdateCollection.dto";


interface IStore {
    actions: {
        //Collection
        createCollection: (data: ICreateCollectionDto) => Promise<boolean>,
        deleteCollection: (idCollection: string) => Promise<boolean>,
        updateCollection: (dataUpdate: IUpdateCollectionDto) => Promise<boolean>,
        // updateCollection: () => Promise<any>,
        // deleteCollection: () => Promise<any>,
        // //Albumes
        // getAllAlbumes: (page: number) => Promise<any>,
        createAlbum: (data: ICreateAlbumDto) => Promise<boolean>,
        deleteAlbum: (idCollection: string) => Promise<boolean>,
        updateAlbum: (dataUpdate: IUpdateAlbumDto) => Promise<boolean>,

        // //Figurites
        // // getAllFigurites: (page: number) => Promise<any>,
        // createFigurine: () => Promise<any>,
        // updateFigurine: () => Promise<any>,
        // deleteFigurine: (id) => Promise<any>,

    }
}

const store = create<IStore>((set, get) => ({
    actions: {
        createCollection: async (data: ICreateCollectionDto) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumCollections/createCollection`,
                    data
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },

        deleteCollection: async (idCollection: string) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'DELETE',
                    path: `/albumCollections/deleteCollection/${idCollection}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        // updateCollection: async (data: ICreateCollectionDto, id: string) => {
        updateCollection: async (dataUpdate: IUpdateCollectionDto) => {

            const { title, id } = dataUpdate
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



        createAlbum: async (data: ICreateAlbumDto) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumes/creatAlbum`,
                    data
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },

        deleteAlbum: async (idCollection: string) => {
            let flagIsCreate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'DELETE',
                    path: `/albumes/deleteAlbum/${idCollection}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        // updateCollection: async (data: ICreateCollectionDto, id: string) => {
        updateAlbum: async (dataUpdate: IUpdateAlbumDto) => {

            const { title, idCollection, image, id } = dataUpdate
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
    }

}))


// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAdministrationStore = () => ({ ...store((state) => (state), shallow) })
export default store
