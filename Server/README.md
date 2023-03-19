
# API CRUD con NodeJS + ExpressJS + TypeScript y MongoDB. 


API CRUD en NodeJS implemenatndo una arquitectura orientada a Microservicios desarrollada con TypeScript utilizando ExpressJS como framework y Mongoose como ODM de MongoDB.

Dependencias utilizadas:
* [ExpressJS](https://expressjs.com/) - Web del Framework de NodeJS.
* [Mongoose](https://mongoosejs.com/) - ODM de MongoDB.
* [Nodemon](https://nodemon.io/) - Utilizado para la recarga automatica.


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

<!-- ------------------------------------ -->

## Deployment

**Development**

To run project in development mode execute in terminal:

```bash
  npm run dev
```

**Production**

To generate the project files for production, run the command:

```bash
  npm run build
```
The production folder will be generated in the root path of the project. The name of the folder will be **dist**.