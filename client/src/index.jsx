import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./MainApp";
import "./index.scss";

import { Provider } from "react-redux";
import { store } from "./store";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <MainApp />
      </DevSupport>
    </Provider>
  </React.StrictMode>,
);
