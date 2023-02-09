import create from 'zustand'

interface IStore {
    state: {
        user: string;
        hola: string;
    },
    actions: {
        setUser: (user: any) => any;
        getUser: () => string
    }
}

export const useAuthUserStore = create<IStore>((set, get) => ({
    state: {
        user: 'LALA', // ToDO: probar si es readOnly y q no pueda hacer store.state.user = 'ASD'
        hola: '',
    },
    actions: {
        setUser: (user: any) => {
            console.log("🚀 ~ file: store.ts:22 ~ useAuthUserStore ~ user", user)
            set(store => ({ state: { ...store.state, user: user } }))
        },
        getUser: () => {
            const { user } = get().state
            return user
        }
    }
}))