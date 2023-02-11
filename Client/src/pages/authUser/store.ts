import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { createMapperUser } from "../../Mappers/User.mappers";
import { IUserModels } from "../../Models/User.models";
import { apiSrv } from "../../utils/apiSrv";
import appStore from '../appStore'


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
        loginUser: (formData: any) => Promise<boolean>
    }
}

const useAuthUserStore = create<IStore>((set, get) => ({
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
        loginUser: async (formData: any) => {
            let flagIsLogin = true

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: '/Usuario/Login',
                    params: formData
                })
            })

            if (res.info.type === 'error') return flagIsLogin = false

            const userAdapted: IUserModels = createMapperUser(res.info.data);
            appStore.actions.setUser(userAdapted)

            return flagIsLogin
        }
    }
}))

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export default useAuthUserStore((state) => (state), shallow)