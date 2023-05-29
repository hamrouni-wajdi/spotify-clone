import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';
import './index.scss';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  </React.StrictMode>
);
