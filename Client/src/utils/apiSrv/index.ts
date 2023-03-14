// import axios from 'redaxios'
import axios, { AxiosInstance, RawAxiosRequestHeaders, HeadersDefaults, AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import appStore from '../../pages/appStore';
import { getStorage, setStorage, deleteStorage } from '../magnamentStorage';
import { ICallBackendOptions } from './interface/ICallBackendOptions';
import { ICallSrv } from './interface/ICallSrv';
import { ICallSrvResponse } from './interface/ICallSrvResponse';
import { IConfigInit } from './interface/IConfigInit';
import { IHeaders } from './interface/IHeaders';

let srv: AxiosInstance
// const headersList: IHeaders = getStorage('Headers') || {}

export const apiSrv = {

    /**
     * Inicializacion de config del ApiSrv
     * @param {*} config 
     */
    init: (config: IConfigInit) => {
        apiSrv.setHeaders(config.info)
        const headersDef: RawAxiosRequestHeaders = {
            // 'Access-Control-Allow-Credentials':'true',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Content-Type': 'application/json;charset=UTF-8',
        }

        srv = axios.create({
            baseURL: config.url,
            headers: headersDef,
        })
        srv.interceptors.request.use(
            (request: InternalAxiosRequestConfig<any>) => {
                /// Setear los headers que actualice por aca....
                const headersList = getStorage<IHeaders>('Headers')
                for (const headerKey in headersList) {
                    request.headers.set(headerKey, headersList[headerKey])
                }
                return request
            },
            (error: any) => {
                console.log("🚀 ~ file: index.ts:53 ~ err", error)
                return Promise.reject(error);
            }
        )
        srv.interceptors.response.use(
            (response: AxiosResponse<any, any>) => response,
            (error: any) => {
                console.log('Error ApiSrv!!!! :' + error)
                if (error.response?.status === 401) { // Hice que el 401 sea especifico de token
                    deleteStorage("User");
                    deleteStorage('Headers')

                    window.location.href = `${window.location.origin}/authUser`;
                }
                return Promise.reject(error.response);
            }
        )
    },

    setHeaders: (headers: IHeaders) => {
        // let newHeaders = { ...headersList, ...headers }
        // let newHeaders : IHeaders = {}
        let headersList = getStorage<IHeaders>('Headers') || {}
        
        for (const key in headers) {
            if (headers[key]) {
                headersList = {...headersList, [key]: headers[key], }
            }
        }
        setStorage<IHeaders>('Headers', headersList)
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

            if (options.status && res.info.msg) {
                settingsSpinnerModal(false, options.status, res.info.msg as string)
            }
        } catch (error: any) {
            settingsSpinnerModal(false, true, error.message)
        } finally {
            if (options.loader || options.status) {
                // setTimeout(() => {
                    settingsSpinnerModal(false, false, '')
                // }, 2000);
            }
            return res
        }
    },

    callSrv: async ({ method, path, data }: ICallSrv): Promise<ICallSrvResponse> => {
        let res: ICallSrvResponse = {} as ICallSrvResponse
        try {
            if (method === "GET") {
                const params = { ...(data && data) }
                res = await (await srv.get(path, { 
                    params: params || {}
                })).data
            }
            if (method === "POST") res = await (await srv.post(path, data)).data
            if (method === "PUT") res = await (await srv.put(path, data)).data
            if (method === "DELETE") res = await (await srv.delete(path)).data
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