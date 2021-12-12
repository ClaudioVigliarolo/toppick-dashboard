// Import deps
import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StatusProvider } from "./context/StatusContext";
import { Navigation } from "./navigation/index";
const rootElement = document.getElementById("root");
render(
  <StatusProvider>
    <AuthProvider>
      <HashRouter>
        <Navigation />
      </HashRouter>
    </AuthProvider>
  </StatusProvider>,
  rootElement
);
