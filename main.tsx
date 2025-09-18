import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from '@/pages/Index'
import Internal from '@/pages/Internal'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Customer /> },
  { path: '/internal', element: <Internal /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
