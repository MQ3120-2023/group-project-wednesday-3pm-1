import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="418998554981-tcd1uq58g72okc5bh6tc0jcamknihjhm.apps.googleusercontent.com">
      <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);