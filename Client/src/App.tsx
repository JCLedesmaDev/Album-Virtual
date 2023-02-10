import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { useEffect, useState } from 'react';

export default function App() {


  useEffect(() => {

    let info = {
      usrToken: '',
      mockmode: false,
      usrId: ''
    }


  }, [])

  return (
    <RouterProvider router={router} />
  )
}

