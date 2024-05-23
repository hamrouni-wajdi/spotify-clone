import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import GlobalStyles from "./styles/globalStyles.js";
import "./styles.scss";

const isMaintenance = import.meta.env.VITE_MAINTENANCE;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {isMaintenance ? (
      <Maintenance />
    ) : (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    )}

    <GlobalStyles />
  </React.StrictMode>,
);
