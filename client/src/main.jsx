import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import GlobalStyles from './styles/globalStyles.js';
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>

    <GlobalStyles />
  </React.StrictMode>,
);
