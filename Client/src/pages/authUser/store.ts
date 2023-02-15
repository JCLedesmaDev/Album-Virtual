import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { userMapper } from "./mappers";
import { IUserModels } from "../../interface/models/IUser.models";
import { apiSrv } from "../../utils/apiSrv";
import appStore from "../appStore";
import { ILoginDto } from "./interface/frontToBack/ILogin.dto";
import { IRegisterDto } from "./interface/frontToBack/IRegister.dto";


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
                set(store => ({ state: { ...store.state, styleForm: style } }))
            },
            login: async (formData: ILoginDto) => {
                let flagIsLogin = true
                // const appStore = useAppStore()
                // console.log("🚀 ~ file: store.ts:51 ~ login: ~ appStore", appStore)

                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/login',
                        data: formData
                    })
                }, { loader: true, status: true })
                console.log("🚀 ~ file: store.ts:58 ~ res ~ res", res)

                // if (res.info.type === 'error') return flagIsLogin = false

                // const userAdapted: IUserModels = userMapper(res.info.data);

                // // appStore.getState().actions.setUser(userAdapted)

                // executeSetUser(userAdapted)

                // apiSrv.setHeaders({
                //     usrid: userAdapted.id,
                //     authorization: userAdapted.tokenAuth
                // })
                // return flagIsLogin
                return false
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
export default store
