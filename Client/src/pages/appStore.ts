import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { ISpinnerModels } from "../interface/models/ISpinner.models";
import { IUserModels } from "../interface/models/IUser.models";
import { getStorage, setStorage } from "../utils/magnamentStorage";
import { IAlbumCollectionModels } from "../interface/models/IAlbumCollection.models";
import { IAlbumModels } from "../interface/models/IAlbum.models";
import { ICreateCollectionDto } from "./administration/interface/frontToBack/ICreateCollection.dto";
import { apiSrv } from "../utils/apiSrv";
import { multipleAlbumCollectionMapper } from "./administration/mappers";

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
        figurites: any[];

        // extras
        spinnerModal: ISpinnerModels;
        showPopup: boolean;
        pagination: IPagination
    },
    actions: {
        setUser: (user: IUserModels) => void

        //Collection
        getAllAlbumCollections: ({ page, filterText }: IFilterSearch) => Promise<any>,

        // extras
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void
        setShowPopup: (newStatus: boolean) => void
        // setPagination: (data: IPagination) => void
    }
}

const appStore = create<IStore>((set, get) => ({
    state: {
        user: getStorage<IUserModels>("User") ?? {} as IUserModels,
       
        // colelctions
        collection: [],
        albumes: [],
        figurites: [],
       
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

        // Collections 
        getAllAlbumCollections: async ({ page, filterText }: IFilterSearch) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumCollections/getAllCollections`,
                    data: { page, filterText }
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            // get().actions.setPagination({
            setPagination({
                currentPage: res.info.data.currentPage,
                totalPages: res.info.data.totalPages
            })

            const albumCollectionsAdapted: IAlbumCollectionModels[] = multipleAlbumCollectionMapper(res.info.data?.docs);

            set(produce((store: IStore) => {
                store.state.collection = albumCollectionsAdapted
            }))
        },
        getAllAlbumes: () => {

        },

        // extras
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
            }))
        },
        setShowPopup: (newStatus: boolean) => {
            set(produce((store: IStore) => {
                store.state.showPopup = newStatus
            }))
        }
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