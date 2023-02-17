import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { IUserModels } from "../../interface/models/IUser.models";
import { apiSrv } from "../../utils/apiSrv";


interface IStore {
    readonly state: {
        collection: any;
        albumes: any;
        figurites: any;
    },
    actions: {
        //Collection
        getAllAlbumCollections: ({ page, filterText }: any) => Promise<any>,
        // createCollection: () => Promise<any>,
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

const store = create<IStore>((set, get) => {
    return {
        state: {
            collection: undefined,
            albumes: undefined,
            figurites: undefined
        },
        actions: {
            getAllAlbumCollections: async ({ page, filterText }: any) => {

                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: `/albumCollections/getAllCollections`,
                        data: { page, filterText }
                    })
                }, { loader: true })

                if (res.info.type === 'error') return

                // const userAdapted: IUserModels = userMapper(res.info.data);
                // appStore.getState().actions.setUser(userAdapted)

                // apiSrv.setHeaders({
                //     usrid: userAdapted.id,
                //     authorization: userAdapted.tokenAuth
                // })
                // return flagIsLogin
            },
            // register: async (formData: IFormRegister) => {
            //     let flagIsRegister = false

            //     const res = await apiSrv.callBackend(async () => {
            //         return await apiSrv.callSrv({
            //             method: 'POST',
            //             path: '/users/register',
            //             data: {
            //                 email: formData.emailRegister,
            //                 fullName: formData.fullName,
            //                 password: formData.passwordRegister,
            //                 confirmPassword: formData.confirmPassword,
            //             } as IRegisterDto
            //         })
            //     }, { loader: true, status: true })

            //     if (res.info.type === 'error') return flagIsRegister
            //     flagIsRegister = true

            //     return flagIsRegister
            // }
        }
    }
})

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAdministrationStore = () => ({ ...store((state) => (state), shallow) })
export default store
