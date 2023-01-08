import { responseSwagger } from "./responseSwagger"

const login = {
    data: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                example: "lalala@gmail.com"
            },
            password: {
                type: "string",
                example: "pepe"
            },
        },
    },
    success: responseSwagger('Success', 'Ha iniciado sesion', {
        type: "object",
        properties: {
            token: { type: "string" },
            user: { $ref: "#/components/schemas/user" }
        }
    }),
    error: responseSwagger('Error', 'Ha ocurrido un error al iniciar sesion')
}

const register = {
    data: {
        type: "object",
        required: ["email", "fullName", "password"],
        properties: {
            email: {
                type: "string",
                example: "lalala@gmail.com"
            },
            fullName: {
                type: "string",
                example: "Pepe Quito"
            },
            password: {
                type: "string",
                example: "pepe"
            },
        },
    },
    success: responseSwagger('Success', 'Se ha registrado!'),
    error: responseSwagger('Error', 'Ha ocurrido un error al registrarse')
}

export default {
    login, register
}