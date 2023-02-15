import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { ISpinnerModels } from "../interface/models/ISpinner.models";
import { IUserModels } from "../interface/models/IUser.models";
import { getStorage, updateStorage } from "../utils/updateStorage";

interface IStore {
    readonly state: {
        spinnerModal: ISpinnerModels;
        user: IUserModels;
    },
    actions: {
        setUser: (user: IUserModels) => void
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void
    }
}

const appStore = create<IStore>((set, get) => ({
    state: {
        spinnerModal: {} as ISpinnerModels,
        user: getStorage<IUserModels>("User") ?? {} as IUserModels
    },
    actions: {
        setUser: (user: IUserModels) => {
            console.log("🚀 ~ setUser", user)
            updateStorage("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        },
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
            }))
        },
    }
}))

export const useAppStore = () => ({ ...appStore((state) => (state), shallow) })
export default appStore