import axios from 'redaxios'
import { shallow } from 'zustand/shallow'
import { useStore } from '../pages/appStore'

let srv: any
let functionAuthenticationExpire: any /// Es una funcion

const appStore = useStore((state) => (state), shallow)


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

    async setHeaders(headers: any) {
        srv.defaults.headers = { ...srv.defaults.headers, ...headers }
    },

    setMockFlag: (flag: boolean) => {
        delete srv.defaults.headers.mockmode
        srv.defaults.headers.mockmode = flag
    },

    async callSrv({ method, path, params }: any) {
        let fecha = new Date().getTime().toString()
        if (params?.fecha) {
            fecha = params.fecha.toString()
            delete params.fecha
        }
        this.setHeaders({ fecha })
        let res
        try {
            if (method === "GET") res = await srv.get(path)
            if (method === "POST") res = await srv.post(path, JSON.stringify(params))
            if (method === "FORM") res = await srv.post(path, params)
        } catch (error: any) {
            console.log('callSrv error:', error)
            // if (error.status === 401) functionAuthenticationExpire()
            return
        }
        return res.data
    },

    setFunctionAuthenticationExpire(fn: any) {
        functionAuthenticationExpire = fn
    },

    async callBackend(preCallback: Function, ops: any) {
        let res
        let options = {
            loader: false,
            status: false
        }

        if (ops) {
            options = { ...options, ...ops }
        }
        try {
            if (options.loader) {
                appStore.actions.setSpinnerModal({ showSpinner: options.loader })
            }

            res = await preCallback()

            if (options.status && res.info.msg) {
                appStore.actions.setSpinnerModal({
                    showSpinner: false,
                    showStatus: options.status,
                    message: res?.info?.msg
                })
            }
        } catch (error) {
            console.log("🚀 ~ file: apiSrv.js:101 ~ callBackend ~ error", error)
        } finally {
            if (options.loader || options.status) {
                appStore.actions.setSpinnerModal({
                    showSpinner: false,
                    showStatus: false,
                    message: ''
                })
            }
            return res
        }
    }

}