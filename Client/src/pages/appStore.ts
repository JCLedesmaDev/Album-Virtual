import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { ISpinnerModal } from "../models/Spinner.models";
import { IUserModels } from "../Models/User.models";
import { getStorage, updateStorage } from "../Utils/updateStorage";

interface IStore {
    readonly state: {
        spinnerModal: ISpinnerModal;
        user: IUserModels;
    },
    actions: {
        setUser: (user: IUserModels) => void
        setSpinnerModal: (newObjStatus: any) => void
    }
}

const store = create<IStore>((set, get) => ({
    state: {
        spinnerModal: {} as ISpinnerModal,
        user: getStorage<IUserModels>("User") ?? {} as IUserModels
    },
    actions: {
        setUser: (user: IUserModels) => {
            set(store => ({
                state: { ...store.state, user }
            }))
            updateStorage("User", user)
        },
        setSpinnerModal: (newObjStatus: ISpinnerModal) => set(store => ({
            state: {
                ...store.state, modalStatus: {
                    ...store.state.spinnerModal, ...newObjStatus
                }
            }
        })),
    }
}))

export const useAppStore = () => ({ ...store((state) => (state), shallow) })
