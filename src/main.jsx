import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* ✅ AG Grid CSS 반드시 import */
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import { provideGlobalGridOptions } from 'ag-grid-community';

provideGlobalGridOptions({
  theme: "legacy",
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
