import { create } from "zustand";
import { shallow } from "zustand/shallow";
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
        setSpinnerModal: (newObjStatus: any) => void
    }
}

const store = create<IStore>((set, get) => ({
    state: {
        spinnerModal: {} as ISpinnerModels,
        user: getStorage<IUserModels>("User") ?? {} as IUserModels
    },
    actions: {
        setUser: (user: IUserModels) => {
            set(store => ({
                state: { ...store.state, user }
            }))
            updateStorage("User", user)
        },
        setSpinnerModal: (newObjStatus: ISpinnerModels) => set(store => ({
            state: {
                ...store.state, modalStatus: {
                    ...store.state.spinnerModal, ...newObjStatus
                }
            }
        })),
    }
}))

export const useAppStore = () => ({ ...store((state) => (state), shallow) })
