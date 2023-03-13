import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { apiSrv } from "../../utils/apiSrv";
import { IAlbumModels } from "../../interface/models/IAlbum.models";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { ICreateCollectionDto } from "./interface/frontToBack/ICreateCollection.dto";


interface IStore {
    readonly state: {
        collection: IAlbumCollectionModels[];
        albumes: IAlbumModels[];
        figurites: any[];
    },
    actions: {
        //Collection
        getAllAlbumCollections: ({ page, filterText }: any) => Promise<any>,
        createCollection: (data: ICreateCollectionDto) => Promise<boolean>,
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


        // changePage: ({ selected }: any) => void
    }
}

const store = create<IStore>((set, get) => ({
    state: {
        collection: [],
        albumes: [],
        figurites: []
    },
    actions: {
        getAllAlbumCollections: async ({ page = '', filterText = '' }: any) => {

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumCollections/getAllCollections`,
                    data: { page, filterText }
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            console.log('PASA XA CA')
            //Agregar paginacion global
            // const userAdapted: IUserModels = userMapper(res.info.data);
            // appStore.getState().actions.setUser(userAdapted)
        },

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
        }

    }

}))

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAdministrationStore = () => ({ ...store((state) => (state), shallow) })
export default store
