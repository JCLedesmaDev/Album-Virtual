import { createBrowserRouter } from "react-router-dom";
import { RoutePrivate } from '../components/RoutePrivate';
import { MainLayout } from "../layouts/MainLayout";
import { AuthUser } from '../pages/authUser';
import { NotFound } from "../pages/NotFound";
import { Administration } from "../pages/administration";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RoutePrivate>
        <MainLayout />
      </RoutePrivate >
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: 'administration',
        element: (<Administration />),
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