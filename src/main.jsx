import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router.jsx'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
