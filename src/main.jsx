// src/main.jsx - FIXED VERSION
import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="249410583325-ft1tsp74qojlpu715e00hmea10bojk6q.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)