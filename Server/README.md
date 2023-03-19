
# API CRUD con NodeJS + ExpressJS + TypeScript y MongoDB. 


API CRUD en NodeJS implemenatndo una arquitectura orientada a Microservicios desarrollada con TypeScript utilizando ExpressJS como framework y Mongoose como ODM de MongoDB.

Dependencias utilizadas:
* [ExpressJS](https://expressjs.com/) - Web del Framework de NodeJS.
* [Mongoose](https://mongoosejs.com/) - ODM de MongoDB.
* [Nodemon](https://nodemon.io/) - Utilizado para la recarga automatica.





----------------------

   * [TypeScript]
   * [Express] | [@types/express]
   * [Cors] | [@types/cors] - (Permite el acceso a las peticiones HTTP hacia nuestro BE)
   * [Dotenv] - (Permite el uso de las variables de entorno)
   * [Mongoose] - (ORM de MongoDB)
   * [Nodemon] - (utilidad que monitorea los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor)
   * [Mongoose-delete] | [@types/mongoose-delete] - (Este paquete nos permite indicarle a nuestros modelos (colecciones) que hagan uso de estrategias de "Soft Delete - borrado logico, permitiendonos persistir los registros eliminados
   * [Ts-node] | [@types/node] - (nos permite ejecutar Typescript en un proyecto de Nodejs)
   * [Bcrypt] | [@types/bcrypt] - (Permite hashear las claves y guardalas en la BD)
   * [Mongoose-paginate-v2] - (Para paginar todos los registro de una coleccion de mongoose)   
   * [Config] | [@types/config] - (Nos permite definir un conjunto de parámetros predeterminados y extenderlos para diferentes entornos de implementación (desarrollo, control de calidad, preparación, producción, etc.).)
   * [Node-config]: Permite pasarle valores a nuestros parametros del "Config" por medio de las variables de entorno del .ENV 
   * [Rimraf]: Eliminados de carpetas por comando
   * [Morgan] | [@types/mogan] - ()   
   * [Express-validators] (Middleware que permite validar los datos provenientes del Request)
   * [Jsonwebtokens] | [@types/jsonwebtokens] 



----------------------

* [ExpressJS](https://expressjs.com/) - Web framework for NodeJs.
* [Mongoose](https://mongoosejs.com/) - ORM Library for MongoDB.
* [Express validator](https://express-validator.github.io/docs/) - Library for validate and sanitize input data.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Library for password hashing.
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for implementation of JSON Web Tokens.
* [Dotenv](https://www.npmjs.com/package/dotenv) - Library to load environment variables.
* [Jest](https://jestjs.io/) - Library for Unit testing and Integration testing.
* [Supertest](https://www.npmjs.com/package/supertest) - Library for test API endpoints.
* [Nodemon](https://nodemon.io/) - Used for hot reload.

## Requerimientos
Instalar el entorno de NodeJS en tu Sistema Operativo - https://nodejs.org/es/

Este proyecto se conecta a una Base de Datos ubicada en Mongo Atlas, pero puede instalar MongoDB en su PC y utilizar su propia Base de Datos o sino, crear una cuenta en Mongo Atlas.

Utiliza [Mongo Atlas](https://www.mongodb.com/atlas/database/)  
Descarga [MongoDB](https://www.mongodb.com/try/download/community)

## Instalación de configuración del proyecto

Instale las depedencias del proyecto, ejecutando en la terminal, desde la ruta raiz del proyecto:

```bash
  npm install
```

## Variables de entorno

Para ejecutar este proyecto Back End, deberá agregar las siguientes variables de entorno al archivo `.env`:

```bash
NODE_ENV=nombreEntorno
jwt_secret=claveSuperSecreta

```
El archivo `.env` debe estar en la ruta raíz del proyecto.


## Despliegue

**Development**

Para ejecutar el proyecto en modo de desarrollo, ejecute en la terminal:

```bash
  npm run dev
```

**Production**

Para generar los archivos del proyecto para producción, ejecute el comando:

```bash
  npm run build
```
La carpeta de producción se generará en la ruta raíz del proyecto. El nombre de la carpeta será **dist**.