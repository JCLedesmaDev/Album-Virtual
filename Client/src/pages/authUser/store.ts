import create from 'zustand'

interface IStore {
    user: any,
    isLogin: boolean
}

export const useAuthUserStore = create<IStore>((set, get) => ({
    user: 'LALA',
    isLogin: false
}))