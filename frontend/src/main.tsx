import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="786219355099-pvj2uapkvmc7hsdbehl0j7an8ah9lc4a.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
)
