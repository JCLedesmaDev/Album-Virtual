import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <GlobalProvider>
        <Navigate />

        <Routes>
          <Route path="/" element={
            <AuthProvider>
              <Authentication />
            </AuthProvider>
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

          <Route path="/Album" element={
            <RoutePrivate>
              <Album />
            </RoutePrivate>
          } />

          <Route path="/AdminAlbum" element={
            <RoutePrivate>
              <AdminAlbum />
            </RoutePrivate>
          } />
          <Route path="/AdminCollection" element={
            <RoutePrivate>
              <AdminCollection />
            </RoutePrivate>
          } />

          <Route path="/AdminFigurita" element={
            <RoutePrivate>
              <AdminFiguritas />
            </RoutePrivate>
          } />

        </Routes>

        <ModalLoader />

        <ModalStatus />

      </GlobalProvider>
    </>
  )
}

const AppWrapper = () => (
  // Englobamos Redux al proyecto
  // <Provider store={store}>
  <App />
  /* </Provider> */
);
export default AppWrapper
