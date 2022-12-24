const response = (type: string, message: string, data: any) => {
    const res = {
        info: {
            type: type,
            msg: message,
            // ...
            ...(data && {
                data: data
            })
        },
    }
    // if (data) res.info.data = data
    return res
}

const warning = (message: string, data = undefined) => {
    return response('warning', message, data)
}

const info = (message: string, data = undefined) => {
    return response('info', message, data)
}

const success = (message: string, data = undefined) => {
    return response('success', message, data)
}

const error = (message: string, data = undefined) => {
    return response('error', message, data)
}

export default {
    success,
    info,
    warning,
    error
}
