import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { apiSrv } from "../../utils/apiSrv";
import { IBuyFigurineDto } from "./interface/IBuyFigurine.dto";



interface IStore {
    actions: {
        buyFigurine: (payload: IBuyFigurineDto) => Promise<any>
    }
}

const store = create<IStore>((set, get) => ({
    actions: {
        buyFigurine: async (payload: IBuyFigurineDto) => {
            const res = await apiSrv.callBackend(async () => {
                return await apiSrv.callSrv({
                    method: 'POST',
                    path: `/figurites/buyFigurine`,
                    data: payload
                })
            }, { loader: true, status: true })

            if (res.info.type === 'error') return
        }

    }
}))

export const useFigurineStore = () => ({ ...store((state) => (state), shallow) })
export default store