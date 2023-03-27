---------------------------------------------

# CRUD con ReactJS + TypeScript + Zustand y Vite. 

CRUD en ReactJS v18 con manejo de reac-router-dom y sus hooks (useState, useEffect, useContext, useProvider, etc...) implementando una arquitectura orientada al Clean Architecture desarrollada con TypeScript, utilizando Zustand como gestor de estados y Vite como herramienta de compilación.

## Dependencias utilizadas:
 * [TypeScript](https://www.npmjs.com/package/typescript).
 * [React](https://react.dev/) | [@types/react](https://www.npmjs.com/package/@types/react) - Framework de JavaScript.
 * [React-router-dom](https://reactrouter.com/en/main) - Libreria para definir las rutas de navegación.
 * [React-paginate](https://www.npmjs.com/package/react-paginate) - Libreria para representar una paginación.
 * [Zustand](https://zustand-demo.pmnd.rs) - Gestor de estados.
 * [Vite](https://www.npmjs.com/package/vite) - Compilador Front-End.
 * [Axios](https://axios-http.com/docs/intro) - Cliente HTTP.

## Requerimientos:
Instalar el entorno de NodeJS en tu Sistema Operativo - https://nodejs.org/es/.

## Instalación de configuración del proyecto:

Instale las depedencias del proyecto, ejecutando en la terminal, desde la ruta raiz del proyecto:

```bash
  npm install
```

## Variables de entorno:

Para ejecutar este proyecto Front-End, deberá agregar las siguientes variables de entorno al archivo `.env`:

```bash
VITE_URL_API=urlBackEnd
```
El archivo `.env` debe estar en la ruta raíz del proyecto.


## Despliegue:

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

