import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { apiSrv } from "../../utils/apiSrv";
import { IAlbumModels } from "../../interface/models/IAlbum.models";
import { IAlbumCollectionModels } from "../../interface/models/IAlbumCollection.models";
import { ICreateCollectionDto } from "./interface/frontToBack/ICreateCollection.dto";
import { multipleAlbumCollectionMapper } from "./mappers";
import produce from "immer";


export interface IFilterSearch {
    page: number;
    filterText?: string
}

interface IPagination {
    totalPages: number;
    currentPage: number;
}


interface IStore {
    readonly state: {
        collection: IAlbumCollectionModels[];
        albumes: IAlbumModels[];
        figurites: any[];
        pagination: IPagination
    },
    actions: {
        //Collection
        getAllAlbumCollections: ({ page, filterText }: IFilterSearch) => Promise<any>,
        createCollection: (data: ICreateCollectionDto) => Promise<boolean>,
        deleteCollection: (idCollection: number) => Promise<boolean>,
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


        setPagination: (data: IPagination) => void
    }
}

const store = create<IStore>((set, get) => ({
    state: {
        collection: [],
        albumes: [],
        figurites: [],
        pagination: { totalPages: 0, currentPage: 0 }
    },
    actions: {
        getAllAlbumCollections: async ({ page, filterText }: IFilterSearch) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumCollections/getAllCollections`,
                    data: { page, filterText }
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            get().actions.setPagination({
                currentPage: res.info.data.currentPage,
                totalPages: res.info.data.totalPages
            })

            const albumCollectionsAdapted: IAlbumCollectionModels[] = multipleAlbumCollectionMapper(res.info.data?.docs);

            set(produce((store: IStore) => {
                store.state.collection = albumCollectionsAdapted
            }))
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
        },

        deleteCollection: async (idCollection: number) => {
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

        setPagination: (data: IPagination) => {
            set(produce((store: IStore) => {
                store.state.pagination = {
                    totalPages: data.totalPages,
                    currentPage: data.currentPage
                }
            }))
        }
    }

}))

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAdministrationStore = () => ({ ...store((state) => (state), shallow) })
export default store
