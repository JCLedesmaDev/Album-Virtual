import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { createMapperUser } from "./mappers/user.mappers";
import { IUserModels } from "../../Models/User.models";
import { apiSrv } from "../../utils/apiSrv";
import appStore from '../appStore'
import { IDataRegisterForm } from "../../interface/DTO Front/Auth/IDataRegisterForm";
import { IDataLoginForm } from "../../interface/DTO Front/Auth/IDataLoginForm";
import { IResponseUseForm, useFormCustom } from "../../Hooks/useFormCustom";


interface IStore {
    readonly state: {
        loginFormActive: boolean;
        registerFormActive: boolean;
        styleForm: string;
        formLogin: IResponseUseForm<IDataLoginForm>;
        formRegister: IResponseUseForm<IDataRegisterForm>;
    },
    actions: {
        setLoginFormActive: (newState: boolean) => void;
        setRegisterFormActive: (newState: boolean) => void;
        changeStyleForm: () => void
        loginUser: (formData: IDataLoginForm) => Promise<boolean>
        registerUser: (formData: IDataRegisterForm) => Promise<boolean>
    }
}

const useAuthUserStore = create<IStore>((set, get) => ({
    state: {
        loginFormActive: true,
        registerFormActive: false,
        styleForm: '',
        formLogin: useFormCustom<IDataLoginForm>({
            Email: '', Password: ''
        }),
        formRegister: useFormCustom<IDataRegisterForm>({
            EmailRegister: '', PasswordRegister: '', ConfirmPassword: '', NombreCompleto: ''
        })
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
        loginUser: async (formData: IDataLoginForm) => {
            let flagIsLogin = true

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: '/Usuario/Login',
                    data: formData
                })
            }, { loader: true })

            if (res.info.type === 'error') return flagIsLogin = false

            const userAdapted: IUserModels = createMapperUser(res.info.data);
            appStore.actions.setUser(userAdapted)

            return flagIsLogin
        },
        registerUser: async (formData: IDataRegisterForm) => {
            let flagIsRegister = true

            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: '/Usuario/Create',
                    data: formData
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return flagIsRegister = false

            return flagIsRegister
        }
    }
}))

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
export default useAuthUserStore((state) => (state), shallow)