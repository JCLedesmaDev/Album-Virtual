import { create } from "zustand";

interface IStore {
    readonly state: {
        loginFormActive: boolean;
        registerFormActive: boolean;
        styleForm: string;
    },
    actions: {
        setLoginFormActive: (newState: boolean) => void;
        setRegisterFormActive: (newState: boolean) => void;
        changeStyleForm: () => void
    }
}

export const useAuthUserStore = create<IStore>((set, get) => ({
    state: {
        loginFormActive: true,
        registerFormActive: false,
        styleForm: ''
    },
    actions: {
        setLoginFormActive: (newState: boolean) => set(store => ({
            state: { ...store.state, loginFormActive: newState }
        })),
        setRegisterFormActive: (newState: boolean) => set(store => ({
            state: { ...store.state, registerFormActive: newState }
        })),
        changeStyleForm: () => {
            let style = (get().state.loginFormActive && !get().state.registerFormActive)
                ? 'containerPage__Auth--loginActive'
                : 'containerPage__Auth--registerActive'
            set(store => ({
                state: { ...store.state, styleForm: style }
            }))
        },
    }
}))