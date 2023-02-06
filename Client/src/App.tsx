import './App.css'
import { RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalProvider';
import { Navigate } from './components/Navigate/Navigate';
import { AuthProvider } from './pages/Authentication/Context/AuthProvider';
import { Authentication } from './pages/Authentication/Index';
import { RoutePrivate } from './components/RoutePrivate/RoutePrivate';
import { AlbumUsuario } from './pages/AlbumUsuario/Index';
import { AlbumUsuarioImagen } from './pages/AlbumUsuarioImagen/Index';
import { AlbumImagenes } from './pages/AlbumImagenes/Index';
import { AdminAlbum } from './pages/AdminAlbum/Index';
import { AdminCollection } from './pages/AdminCollection/Index';
import { AdminFiguritas } from './pages/AdminFiguritas/Index';
import { ModalStatus } from './components/ModalStatus/ModalStatus';
import { ModalLoader } from './components/ModalLoader/ModalLoader';
import { Home } from './pages/home';

function App() {




  return (
    <GlobalProvider>
      
      <Navigate />

      <RouterProvider router={router} />

      <ModalLoader />
      <ModalStatus />

    </GlobalProvider>
  )
}

const AppWrapper = () => (
  // Englobamos Redux al proyecto
  // <Provider store={store}>
  <App />
  /* </Provider> */
);
export default AppWrapper
