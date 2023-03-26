import { create } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'

import { apiSrv } from "../../utils/apiSrv";
import { IBuyAlbumDto } from "./interface/IBuyAlbum.dto";



interface IStore {
    actions: {
        buyAlbum: (payload: IBuyAlbumDto) => Promise<any>
    }
}

const store = create<IStore>((set, get) => ({
    actions: {
        buyAlbum: async (payload: IBuyAlbumDto) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/albumes/buyAlbum`,
                    data: payload
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return
        }

    }
}))

export const useAlbumStore = () => ({ ...store((state) => (state), shallow) })
export default store