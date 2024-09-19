import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Home from './Home.tsx'
import {  RouterProvider } from 'react-router-dom'
// import ErrorPage from './ErrorPage.tsx'
import router from './routes/router.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Home /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
