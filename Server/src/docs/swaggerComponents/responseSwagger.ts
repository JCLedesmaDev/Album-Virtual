type typeError = 'Success' | 'Error'

/* Creamos de manera dinamica la respuesta que brindara el Swagger */
const responseSwagger = (type: typeError, msg: string, data?: any) => {
    return {
        type: "object",
        properties: {
            info: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        example: type
                    },
                    msg: {
                        type: "string",
                        example: msg
                    },
                    ...(data && {
                        data: data
                    })
                }
            }
        }
    }
}
export {
    responseSwagger
}