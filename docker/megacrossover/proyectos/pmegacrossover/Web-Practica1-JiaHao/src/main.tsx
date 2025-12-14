import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ¡Importante!
import App from './App.tsx'
import './index.css' 
import './App.css' 
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvemos la App aquí */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)