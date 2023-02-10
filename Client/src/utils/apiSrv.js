import axios from 'redaxios'

let srv
let functionAuthenticationExpire /// Es una funcion

export const apiSrv = {

    init: async (config) => {
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

    async setHeaders(headers) {
        srv.defaults.headers = { ...srv.defaults.headers, ...headers }
    },

    setMockFlag: (flag) => {
        delete srv.defaults.headers.mockmode
        srv.defaults.headers.mockmode = flag
    },

    async sendFile(path, params) {
        formData.append("data", params.data)

        const ctype = srv.defaults.headers['Content-Type']
        delete srv.defaults.headers['Content-Type']
        srv.defaults.headers['Content-Type'] = 'multipart/form-data'

        const res = await srv.post(path, formData)
        srv.defaults.headers['Content-Type'] = ctype
        return res
    },

    async callSrv(method, path, params, saf = false) {
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
        } catch (error) {
            console.log('callSrv error:', error)
            if (error.status === 401) functionAuthenticationExpire()
            return
        }
        return res.data
    },

    setFunctionAuthenticationExpire(fn) {
        authExpFn = fn
    },

    async callBackend(preCallback, ops) {
        let res
        let options = {
            noLoader: false,
            type: 'spinner', //'progressBar'
            color: 'white',
            timeout: -1
        }

        if (ops) {
            options = { ...options, ...ops }
        }
        try {
            if (!options.noLoader) ui.actions.showLoading(options) // Mostrar login en pantalla por medio del appStore
            res = await preCallback()

            if (res?.info?.msg) {
                console.log("🚀 ~ file: apiSrv.js:98 ~ callBackend ~ msg", msg)
            }
        } catch (error) {
            console.log("🚀 ~ file: apiSrv.js:101 ~ callBackend ~ error", error)
        } finally {
            if (!options.noLoader) ui.actions.hideLoading() // Ocultar loader por medio del appStore
            return res
        }
    }

}