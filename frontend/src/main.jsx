import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/authContext.jsx"
import { SearchProvider } from "./context/searchContext.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SearchProvider>
    <App />
    <Toaster position='top-right' reverseOrder={false}/>
    </SearchProvider>
  </AuthProvider>
  </BrowserRouter>,
)
