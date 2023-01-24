import config from 'config'
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import fs from 'fs'
import path from 'path'
import schema from './swaggerComponents/schemas'
import schemaDto from './swaggerComponents/schemasDto'
import { type } from 'os';

/* Obtener la url de los index de cada service */
const pathRoutes = path.join(__dirname, '../services')
const arrApiUrl: string[] = []
fs.readdirSync(pathRoutes).filter(folder => {
    //Temporal 
    if (folder === 'NOTA.txt') {
        return
    }
    arrApiUrl.push(`${pathRoutes}\\${folder}\\index.ts`)
})
/* Obtener la url de los index de cada service */

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API",
        version: "1.0.0",
        description: "Esta es la descripcion de mi Swagger"
    },
    servers: [{
        url: `${config.get('server.public_url')}${config.get('server.port')}`,
        description: "LALAA"
    }],
    components: {
        securitySchemes: {
            bearerAuth: {
                description: 'Enviar el token obtenido al loguear sesion',
                type: "apiKey",
                name: 'authorization',
                in: 'header',
            },
            idSecurity: {
                description: 'Enviar el id del usuario logueado',
                type: 'apiKey',
                name: 'userid',
                in: 'header'
            }
        },
        schemas: {
            user: schema.user,
            rol: schema.rol
        },
        schemasDto: {
            // Login
            loginData: schemaDto.login.data,
            loginSuccess: schemaDto.login.success,
            loginError: schemaDto.login.error,

            // Regoster
            registerData: schemaDto.register.data,
            registerSuccess: schemaDto.register.success,
            registerError: schemaDto.register.error,

            // Crear Album
            createAlbumData: schemaDto.createAlbum.data,
            createAlbumSuccess: schemaDto.createAlbum.success,
            createAlbumError: schemaDto.createAlbum.error,

        }
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    // le especificamos en un arr, las rutas donde tenemos los index de los routers
    // con el fin de que busque los comentarios que tenemos escrito y los tome 
    // apis: ["./src/routes/*.ts"],
    apis: arrApiUrl,
};

export default swaggerJSDoc(swaggerOptions);

// Definimos la estructura del metodo para que aparezca en el Swagger
/// La manera de definir todo esta en: https://editor.swagger.io