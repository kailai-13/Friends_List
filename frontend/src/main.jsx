import * as React from "react";


import * as ReactDOM from "react-dom/client";
import App from "./App";

// Create a theme (optional but helps avoid config issues)


const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
 
      <App />

  </React.StrictMode>
);
