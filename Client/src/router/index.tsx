import { createBrowserRouter } from "react-router-dom";
import { AlbumUsuario } from '../pages/AlbumUsuario/Index';
import { AlbumUsuarioImagen } from '../pages/AlbumUsuarioImagen/Index';
import { AlbumImagenes } from '../pages/AlbumImagenes/Index';
import { AdminAlbum } from '../pages/AdminAlbum/Index';
import { AdminCollection } from '../pages/AdminCollection/Index';
import { AdminFiguritas } from '../pages/AdminFiguritas/Index';

import { RoutePrivate } from '../components/RoutePrivate/RoutePrivate';
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";

import { AuthUser } from '../pages/authUser';
import { NotFound } from "../pages/NotFound";
import { AdminLayout } from "../layouts/AdminLayout";

const router = createBrowserRouter([
  {
    // path: '/',
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    // shouldRevalidate: (lala) => { // Posible solucion de las rutas privadas
    //   console.log("🚀 ~ file: index.tsx:44 ~ lala", lala)
    //   return true
    // },
    children: [
      {
        path: 'admin/',
        element: <AdminLayout />,
        errorElement: <NotFound />,
        children: [
          {
            path: 'collection',
            element: (
              <RoutePrivate>
                <AdminCollection />
              </RoutePrivate>
            )
          },
          // {
          //   path: 'albumes',
          //   element: (
          //     <RoutePrivate>
          //       <AdminCollection />
          //     </RoutePrivate>
          //   )
          // },
          // {
          //   path: 'figurines',
          //   element: (
          //     <RoutePrivate>
          //       <AdminCollection />
          //     </RoutePrivate>
          //   )
          // }
        ]
      }
      // {
      //   index: true, // Definimos que dentro de los componentes hijos, este es el principal
      //   element: (
      //     <RoutePrivate>
      //       <Home />
      //     </RoutePrivate>
      //   ),
      //   // action: (args) => args.context // Investigar si puede funcionar con ruta privada
      // },
    ]
  },
  {
    path: '/authUser',
    element: <AuthUser />
  }
])

export default router

{/* <Routes>

        <Route path="/AdminCollection" element={
          <RoutePrivate>
            <AdminCollection />
          </RoutePrivate>
        } />

        <Route path="/AdminAlbum" element={
          <RoutePrivate>
            <AdminAlbum />
          </RoutePrivate>
        } />

        <Route path="/AdminFigurita" element={
          <RoutePrivate>
            <AdminFiguritas />
          </RoutePrivate>
        } />

        <Route path="/" element={
          <AuthProvider>
            <Authentication />
          </AuthProvider>
        } />


        <Route path="/home" element={
          <RoutePrivate>
            <Home />
          </RoutePrivate>
        } />


        <Route path="/AlbumUsuario" element={
          <RoutePrivate>
            <AlbumUsuario />
          </RoutePrivate>
        } />

        <Route path="/AlbumUsuarioImagen/:nombreAlbum/:id" element={
          <RoutePrivate>
            <AlbumUsuarioImagen />
          </RoutePrivate>
        } />

        <Route path="/AlbumImagenes" element={
          <RoutePrivate>
            <AlbumImagenes />
          </RoutePrivate>
        } />

</Routes> */}