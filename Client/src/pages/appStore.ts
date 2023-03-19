import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { ISpinnerModels } from "../models/ISpinner.models";
import { IUserModels } from "../models/IUser.models";
import { getStorage, setStorage } from "../utils/magnamentStorage";
import { IAlbumCollectionModels } from "../models/IAlbumCollection.models";
import { IAlbumModels } from "../models/IAlbum.models";
import { apiSrv } from "../utils/apiSrv";
import { multipleAlbumCollectionMapper, multipleAlbumes } from "./administration/mappers";

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
        user: IUserModels;
        collection: IAlbumCollectionModels[];
        albumes: IAlbumModels[];
        // figurites: any[];

        // extras
        spinnerModal: ISpinnerModels;
        showPopup: boolean;
        pagination: IPagination
    },
    actions: {
        setUser: (user: IUserModels) => void

        getAllAlbumCollections: ({ page, filterText }: IFilterSearch) => Promise<any>,
        getAllAlbumes: ({ page, filterText }: IFilterSearch) => Promise<any>,

        // extras
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void
        setShowPopup: (newStatus: boolean) => void
        // setPagination: (data: IPagination) => void
    }
}

const appStore = create<IStore>((set, get) => ({
    state: {
        user: getStorage<IUserModels>("User") ?? {} as IUserModels,
       
        collection: [],
        albumes: [],
       
        //extras
        spinnerModal: {} as ISpinnerModels, 
        showPopup: false,
        pagination: { totalPages: 0, currentPage: 0 }
    },
    actions: {
        setUser: (user: IUserModels) => {
            console.log("🚀 ~ setUser", user)
            setStorage("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        },
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
            }))
        },
        setShowPopup: (newStatus: boolean) => {
            set(produce((store: IStore) => {
                store.state.showPopup = newStatus
            }))
        },


        // Collections 
        getAllAlbumCollections: async (payload: IFilterSearch) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumCollections/getAllCollections`,
                    data: payload
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            setPagination({
                currentPage: res.info.data.currentPage,
                totalPages: res.info.data.totalPages
            })

            const albumCollectionsAdapted: IAlbumCollectionModels[] = multipleAlbumCollectionMapper(res.info.data?.docs);

            set(produce((store: IStore) => {
                store.state.collection = albumCollectionsAdapted
            }))
        },

        getAllAlbumes: async (payload: IFilterSearch) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumes/getAllAlbumes`,
                    data: payload
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            setPagination({
                currentPage: res.info.data.currentPage,
                totalPages: res.info.data.totalPages
            })

            const albumAdapted: IAlbumModels[] = multipleAlbumes(res.info.data?.docs);

            set(produce((store: IStore) => {
                store.state.albumes = albumAdapted
            }))
        },

    }
}))

const setPagination =  (data: IPagination) => {
    appStore.setState((produce((store: IStore) => {
        store.state.pagination = {
            totalPages: data.totalPages,
            currentPage: data.currentPage -1
        }
    })))
}

export const useAppStore = () => ({ ...appStore((state) => (state), shallow) })
export default appStore