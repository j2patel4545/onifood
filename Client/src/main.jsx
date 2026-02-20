import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FcontextProvider from './Context/FcontextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FcontextProvider>    <App />
    </FcontextProvider>
  </StrictMode>,
)
