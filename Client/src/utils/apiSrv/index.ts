import axios from 'redaxios'
import appStore from '../../pages/appStore';
import { ICallBackendOptions } from './interface/ICallBackendOptions';
import { ICallSrv } from './interface/ICallSrv';
import { ICallSrvResponse } from './interface/ICallSrvResponse';
import { IConfigInit } from './interface/IConfigInit';


let srv: any

export const apiSrv = {

    /**
     * Inicializacion de config del ApiSrv
     * @param {*} config 
     */
    init: (config: IConfigInit) => {
        const headersDef = {
            // 'Access-Control-Allow-Credentials':'true',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Content-Type': 'application/json;charset=UTF-8'
        }
        const headers = { ...headersDef, ...config.info }
        srv = axios.create({
            baseURL: config.url,
            headers: headers,
        })

        /// NO ANDA.
        srv?.interceptors?.request.use(
            (request: any) => request,
            (error: any) => {
                console.log("🚀 ~ file: index.ts:53 ~ err", error)
                return Promise.reject(error);
            }
        )
        srv?.interceptors?.response.use(
            (response: any) => response,
            (error: any) => {
                console.log('Error ApiSrv!!!! :' + error)
                if (error.response?.status === 401) { // Hice que el 401 sea especifico de token
                    localStorage.removeItem("User");
                    window.location.href = `${window.location.origin}/login`;
                }
                // TODO: Ver si tengo que hacer un end-point para volver a obtener un token 
                // functionAuthenticationExpire()
                return Promise.reject(error);
            }
        )
        /// NO ANDA.
    },

    setHeaders: (headers: any) => {
        srv.defaults.headers = { ...srv.defaults.headers, ...headers }
    },

    setMockFlag: (flag: boolean) => {
        delete srv.defaults.headers.mockmode
        srv.defaults.headers.mockmode = flag
    },

    /**
     * 
     * @param preCallback Function exceute end-point to back 
     * @param options Declare if this function has loader or status
     * @returns Return data with these attributes: info: {type: string; msg: string; data: any}
     */
    callBackend: async (preCallback: Function, options: ICallBackendOptions): Promise<ICallSrvResponse> => {
        let res: ICallSrvResponse = {} as ICallSrvResponse

        try {
            if (options.loader) settingsSpinnerModal(true, false, '')

            res = await preCallback() as ICallSrvResponse

            if (res.info.type === 'error') throw new Error(res.info.msg)

            if (options.loader || (options.status && res.info.msg)) {
                settingsSpinnerModal(false, options.status, res.info.msg as string)
            }
        } catch (error: any) {
            settingsSpinnerModal(false, true, error.message)
        } finally {
            if (options.loader || options.status) {
                setTimeout(() => {
                    settingsSpinnerModal(false, false, '')
                }, 5000);
            }
            return res
        }
    },

    callSrv: async ({ method, path, data }: ICallSrv): Promise<ICallSrvResponse> => {
        let res: ICallSrvResponse = {} as ICallSrvResponse
        try {
            if (method === "GET") res = await srv.get(path)
            if (method === "POST") res = await srv.post(path, data)
            if (method === "PUT") res = await srv.put(path, data)
            if (method === "DELETE") res = await srv.delete(path)
            if (method === "FORM") res = await srv.post(path, data)
        } catch (error: any) {
            console.log('callSrv error:', error)
            error.data.info
                ? res = error.data
                : res = { info: { type: 'error', msg: error.message } }
        } finally {
            return res
        }
    },
}

const settingsSpinnerModal = (spinner: boolean = false, status: boolean = false, message: string = '') => {
    appStore.getState().actions.setSpinnerModal({
        showSpinner: spinner,
        showStatus: status,
        message: message
    })
}