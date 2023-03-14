import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { apiSrv } from "../../utils/apiSrv";
import { ICreateCollectionDto } from "./interface/frontToBack/ICreateCollection.dto";


interface IStore {
    actions: {
        //Collection
        createCollection: (data: ICreateCollectionDto) => Promise<boolean>,
        deleteCollection: (idCollection: string) => Promise<boolean>,
        // updateCollection: () => Promise<any>,
        // deleteCollection: () => Promise<any>,
        // //Albumes
        // getAllAlbumes: (page: number) => Promise<any>,
        // createAlbum: () => Promise<any>,
        // updateAlbum: () => Promise<any>,
        // deleteAlbum: () => Promise<any>,
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
                    method: 'POST',
                    path: `/albumCollections/deleteCollection/${idCollection}`,
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsCreate
            flagIsCreate = true

            return flagIsCreate
        },
        updateCollection: async (data: IAlbumCollectionModels, id: string) => {
            let flagIsUpdate = false

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumCollections/updateCollection/${id}`,
                    data
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
