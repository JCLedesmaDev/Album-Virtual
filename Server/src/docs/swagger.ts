import config from 'config'
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API",
        version: "1.0.0",
    },
    servers: [
        {
            url: `${config.get('server.public_url')}${config.get('server.port')}`,
        },
    ],
    components: {
        // securitySchemes: {
        //     bearerAuth: {
        //         type: "http",
        //         scheme: "bearer",
        //     },
        // },
        // schemas: {
        //     user: {
        //         type: "object",
        //         required: ["name", "album", "cover", "artist", "duration", "mediaId"],
        //         properties: {
        //             name: {
        //                 type: "string",
        //             },
        //             email: {
        //                 type: "string",
        //             },
        //         },
        //     },
        //     item: {
        //         type: "object",
        //         required: ["price", "qty"],
        //         properties: {
        //             price: {
        //                 type: "string",
        //             },
        //             qty: {
        //                 type: "string",
        //             },
        //         },
        //     },
        // },
    },
};

const swaggerOptions: OAS3Options = { // TODO: Ver como adaptar esta parte.
    swaggerDefinition,
    // le especificamos en un arr, las rutas donde tenemos los index de los routers
    // con el fin de que busque los comentarios que tenemos escrito y los tome 
    apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);