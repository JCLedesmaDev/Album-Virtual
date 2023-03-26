import produce from "immer";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { IAlbumModels } from "../../models/IAlbum.models";

import { apiSrv } from "../../utils/apiSrv";
import { singleAlbumesMapper } from "../administration/mappers";
import { IGetAlbumDto } from "./interface/frontToBack/IGetAlbum.dto";



interface IStore {
    state: {
        album: IAlbumModels
    }
    actions: {
        getAlbum: (payload: IGetAlbumDto) => Promise<any>
    }
}

const store = create<IStore>((set, get) => ({
    state: {
        album: {} as IAlbumModels
    },
    actions: {
        getAlbum: async (payload: IGetAlbumDto) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'GET',
                    path: `/albumes/getAlbum`,
                    data: payload
                })
            }, { loader: true })

            if (res.info.type === 'error') return

            const albumAdapted: IAlbumModels = singleAlbumesMapper(res.info.data);
            
            set(produce((store: IStore) => {
                store.state.album = albumAdapted
            }))
        }

    }
}))

export const usePurchasedAlbumStore = () => ({ ...store((state) => (state), shallow) })
export default store