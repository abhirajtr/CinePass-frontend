// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.ts'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
  // </StrictMode>
)
