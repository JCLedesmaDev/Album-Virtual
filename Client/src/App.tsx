import './App.css'
import { RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalProvider';
import { Navigate } from './components/Navigate/Navigate';
import { ModalLoader } from './components/ModalLoader/ModalLoader';
import router from './router';
import { ModalStatus } from './components/ModalStatus/ModalStatus';

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
