import './App.css'
import { RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalProvider';
import router from './router';
import { useEffect, useState } from 'react';

function App() {


  useEffect(() => {

    let info = {
      usrToken: '',
      mockmode: false,
      usrId: ''
    }

    
  }, [])

  return (
    <GlobalProvider>

      <RouterProvider router={router} />

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
