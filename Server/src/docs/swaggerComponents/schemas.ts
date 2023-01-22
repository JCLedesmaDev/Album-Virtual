
const user = {
    type: "object",
    required: ['fullName', 'email'],
    properties: {
        fullName: { type: "string" },
        id: { type: "string" },
        email: { type: "string" },
        roles: {
            type: "array",
            items: { $ref: "#/components/schemas/rol" }
        }
    }
}
const rol = {
    type: "object",
    properties: {
        name: { type: "string" },
        id: { type: "string" },
    }
}

export default {
    user, rol
}