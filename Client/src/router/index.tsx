import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from '../pages/Authentication/Context/AuthProvider';
import { Authentication } from '../pages/Authentication/Index';
import { AlbumUsuario } from '../pages/AlbumUsuario/Index';
import { AlbumUsuarioImagen } from '../pages/AlbumUsuarioImagen/Index';
import { AlbumImagenes } from '../pages/AlbumImagenes/Index';
import { AdminAlbum } from '../pages/AdminAlbum/Index';
import { AdminCollection } from '../pages/AdminCollection/Index';
import { AdminFiguritas } from '../pages/AdminFiguritas/Index';

import { RoutePrivate } from '../components/RoutePrivate/RoutePrivate';
import { NotFound } from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutePrivate>
      <AdminCollection />
    </RoutePrivate>,
    errorElement: <NotFound />
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