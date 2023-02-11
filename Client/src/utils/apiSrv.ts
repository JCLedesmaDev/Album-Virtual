import axios from 'redaxios'
import appStore from '../pages/appStore'

let srv: any
let functionAuthenticationExpire: any /// Es una funcion

interface ICallSrv {
    method: string;
    path: string;
    data?: any
}
interface ICallSrvResponse {
    info: {
        type: string;
        msg?: string;
        data?: any
    }
}
interface ICallBackendOptions {
    loader?: boolean;
    status?: boolean;
}


export const apiSrv = {

    init: async (config: any) => {
        console.log('api cfg: ', JSON.stringify(config))
        const headersDef = {
            // 'Access-Control-Allow-Credentials':'true',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Content-Type': 'application/json;charset=UTF-8'
        }
        const headers = { ...headersDef, ...config.headers }
        srv = axios.create({
            baseURL: config.url,
            headers: headers
        })
        //srv.interceptors.request.use(req => {
        //    console.log('interceptor request:' + req)
        //    return req
        //})
        //srv.interceptors.response.use(res => {
        //    console.log('interceptor response: ' + res)
        //    return res.data
        //},
        //    error => {
        //        const { config } = error
        //        console.log('Error FWK-API!!!! :' + error)
        //    }
        //)
    },

    setHeaders: (headers: any) => {
        srv.defaults.headers = { ...srv.defaults.headers, ...headers }
    },

    setMockFlag: (flag: boolean) => {
        delete srv.defaults.headers.mockmode
        srv.defaults.headers.mockmode = flag
    },

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
            if (options.loader || options.status) {
                settingsSpinnerModal(false, options.status, error)
            }
        } finally {
            if (options.loader || options.status) {
                setTimeout(() => {
                    settingsSpinnerModal(false, false, '')
                }, 2000);
            }
            return res
        }
    },

    callSrv: async ({ method, path, data }: ICallSrv): Promise<ICallSrvResponse> => {
        let res: ICallSrvResponse = {} as ICallSrvResponse
        try {
            if (method === "GET") res = await srv.get(path)
            if (method === "POST") res = await srv.post(path, JSON.stringify(data))
            if (method === "PUT") res = await srv.put(path, JSON.stringify(data))
            if (method === "DELETE") res = await srv.delete(path)
            if (method === "FORM") res = await srv.post(path, data)
        } catch (error: any) {
            console.log('callSrv error:', error)
            // if (error.status === 401) functionAuthenticationExpire()
            res = { info: { type: 'error', msg: error.message } }
        } finally {
            return res
        }
    },

    setFunctionAuthenticationExpire(fn: any) {
        functionAuthenticationExpire = fn
    },
}

const settingsSpinnerModal = (spinner: boolean = false, status: boolean = false, message: string = '') => {
    appStore.actions.setSpinnerModal({
        showSpinner: spinner,
        showStatus: status,
        message: message
    })
}