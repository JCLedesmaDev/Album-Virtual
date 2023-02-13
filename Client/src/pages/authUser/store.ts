import { create } from "zustand";
import { userMapper } from "./mappers";
import { IUserModels } from "../../interface/models/IUser.models";
import { apiSrv } from "../../utils/apiSrv";
import { useAppStore } from "../appStore";
import { shallow } from "zustand/shallow";
import { ILoginDto } from "./interface/frontToBack/ILogin.dto";
import { IRegisterDto } from "./interface/frontToBack/IRegister.dto";
import { ILoginResponseDto } from "./interface/backToFront/ILoginResponse.dto";
import { ICallSrv } from "../../utils/apiSrv/interface/ICallSrv";


interface IStore {
    state: {
        loginFormActive: boolean;
        registerFormActive: boolean;
        styleForm: string;
    },
    actions: {
        setLoginFormActive: (newState: boolean) => void;
        setRegisterFormActive: (newState: boolean) => void;
        changeStyleForm: () => void
        login: (formData: ILoginDto) => Promise<boolean>
        register: (formData: IRegisterDto) => Promise<boolean>
    }
}


const store = create<IStore>((set, get) => {
    return {
        state: {
            loginFormActive: true,
            registerFormActive: false,
            styleForm: '',
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
            login: async (formData: ILoginDto) => {
                let flagIsLogin = true
                const appStore = useAppStore()

                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/login',
                        data: formData
                    })
                }, { loader: true })

                if (res.info.type === 'error') return flagIsLogin = false

                const userAdapted: IUserModels = userMapper(res.info.data);
                appStore.actions.setUser(userAdapted)

                return flagIsLogin
            },
            register: async (formData: IRegisterDto) => {
                let flagIsRegister = true

                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/register',
                        data: formData
                    })
                }, { loader: true, status: true })

                if (res.info.type === 'error') return flagIsRegister = false

                return flagIsRegister
            }
        }
    }
})

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export const useAuthUserStore = () => ({ ...store((state) => (state), shallow) })